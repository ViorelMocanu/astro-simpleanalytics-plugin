import { sanitizeHostname } from "./utilities";

// Stats API helper (https://docs.simpleanalytics.com/api/stats)
//
// Meant for server-side use: Astro frontmatter, endpoints, content loaders.
// Never pass an API key in code that ends up in the browser.

/** The version of the Stats API this helper requests by default. */
export const SIMPLE_ANALYTICS_STATS_API_VERSION = 6;

export type SimpleAnalyticsStatsField =
  | "pageviews"
  | "visitors"
  | "histogram"
  | "pages"
  | "countries"
  | "referrers"
  | "utm_sources"
  | "utm_mediums"
  | "utm_campaigns"
  | "utm_contents"
  | "utm_terms"
  | "browser_names"
  | "os_names"
  | "device_types"
  | "seconds_on_page";

/** `hour` needs version 6 of the Stats API. */
export type SimpleAnalyticsStatsInterval =
  "hour" | "day" | "week" | "month" | "year";

export interface SimpleAnalyticsStatsFilters {
  page?: string;
  pages?: string;
  country?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  browser_name?: string;
  os_name?: string;
  device_type?: "mobile" | "tablet" | "desktop" | "tv";
}

export interface SimpleAnalyticsStatsOptions {
  /** The website as it is named in your dashboard, e.g. `example.com`. */
  hostname: string;
  /** Only get the data of this path, e.g. `/contact`. */
  path?: string;
  fields?: SimpleAnalyticsStatsField[];
  /** `YYYY-MM-DD` or a placeholder like `today-30d` or `yesterday`. */
  start?: string;
  /** `YYYY-MM-DD` or a placeholder like `today` or `yesterday`. */
  end?: string;
  /** A limit for the fields (1-1000). */
  limit?: number;
  /** A valid time zone like `Europe/Amsterdam`. */
  timezone?: string;
  /** The size of the buckets in the `histogram` field. */
  interval?: SimpleAnalyticsStatsInterval;
  /** A list of event names to count, or `*` for all events. */
  events?: string[] | "*";
  filters?: SimpleAnalyticsStatsFilters;
  /** Exact metadata values to filter by (version 6 and later). */
  metadata?: Record<string, string | number | boolean>;
  /** Adds explanations of the fields to the response (defaults to `false`). */
  info?: boolean;
  /** The version of the Stats API (defaults to 6). */
  version?: number;
  /** Needed for private websites. Starts with `sa_api_key_`. */
  apiKey?: string;
  /** A custom `fetch` implementation (defaults to the global one). */
  fetch?: typeof fetch;
  signal?: AbortSignal;
}

export interface SimpleAnalyticsStatsHistogramEntry {
  /** The start date of the bucket (`YYYY-MM-DD`). */
  date: string;
  pageviews: number;
  visitors: number;
  /** Only with `interval: "hour"`. */
  hour?: number;
  /** Only with `interval: "week"`. */
  week?: number;
  /** Only with `interval: "month"`. */
  month?: number;
  /** Only with `interval: "week"`, `"month"` or `"year"`. */
  year?: number;
}

export interface SimpleAnalyticsStatsEntry {
  value: string;
  pageviews: number;
  visitors: number;
  seconds_on_page?: number;
}

export interface SimpleAnalyticsStatsEvent {
  name: string;
  total: number;
}

export interface SimpleAnalyticsStats {
  ok: boolean;
  hostname: string;
  url: string;
  path: string;
  start: string;
  end: string;
  version: number;
  timezone: string;
  pageviews?: number;
  visitors?: number;
  seconds_on_page?: number;
  histogram?: SimpleAnalyticsStatsHistogramEntry[];
  pages?: SimpleAnalyticsStatsEntry[];
  countries?: SimpleAnalyticsStatsEntry[];
  referrers?: SimpleAnalyticsStatsEntry[];
  utm_sources?: SimpleAnalyticsStatsEntry[];
  utm_mediums?: SimpleAnalyticsStatsEntry[];
  utm_campaigns?: SimpleAnalyticsStatsEntry[];
  utm_contents?: SimpleAnalyticsStatsEntry[];
  utm_terms?: SimpleAnalyticsStatsEntry[];
  browser_names?: SimpleAnalyticsStatsEntry[];
  os_names?: SimpleAnalyticsStatsEntry[];
  device_types?: SimpleAnalyticsStatsEntry[];
  events?: SimpleAnalyticsStatsEvent[];
  generated_in_ms?: number;
}

/**
 * Builds the URL of a Stats API request.
 *
 * @param {SimpleAnalyticsStatsOptions} options - The website and the data you want to get.
 * @returns {string} The URL of the Stats API request.
 * @throws {Error} If the hostname, the limit or a metadata key is invalid.
 *
 * @example
 * const url = buildSimpleAnalyticsStatsUrl({
 *   hostname: "example.com",
 *   fields: ["histogram"],
 *   interval: "week",
 * });
 * // url: "https://simpleanalytics.com/example.com.json?version=6&info=false&fields=histogram&interval=week"
 */
export function buildSimpleAnalyticsStatsUrl(
  options: SimpleAnalyticsStatsOptions,
) {
  const hostname = sanitizeHostname(options.hostname);
  if (!hostname) throw new Error("Invalid hostname for the Stats API");

  const { limit } = options;
  if (
    limit !== undefined &&
    (!Number.isInteger(limit) || limit < 1 || limit > 1000)
  ) {
    throw new Error("The Stats API limit must be a number from 1 to 1000");
  }

  const path = options.path
    ? `/${options.path.replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/")}`
    : "";
  const params = new URLSearchParams();
  params.set(
    "version",
    String(options.version ?? SIMPLE_ANALYTICS_STATS_API_VERSION),
  );
  params.set("info", String(options.info ?? false));
  if (options.fields?.length) params.set("fields", options.fields.join(","));
  if (options.start) params.set("start", options.start);
  if (options.end) params.set("end", options.end);
  if (limit !== undefined) params.set("limit", String(limit));
  if (options.timezone) params.set("timezone", options.timezone);
  if (options.interval) params.set("interval", options.interval);
  if (options.events?.length) {
    params.set(
      "events",
      typeof options.events === "string"
        ? options.events
        : options.events.join(","),
    );
  }
  for (const [filter, value] of Object.entries(options.filters ?? {})) {
    if (value) params.set(filter, value);
  }
  for (const [key, value] of Object.entries(options.metadata ?? {})) {
    if (!/^[a-zA-Z0-9_]+$/.test(key)) {
      throw new Error(`Invalid metadata key for the Stats API: ${key}`);
    }
    params.set(`metadata.${key}`, String(value));
  }

  return `https://simpleanalytics.com/${hostname}${path}.json?${params}`;
}

/**
 * Gets the aggregated statistics of a website from the Stats API.
 *
 * Public websites work without credentials, private websites need an API key.
 * Only use this on the server, so your API key never ends up in the browser.
 *
 * @param {SimpleAnalyticsStatsOptions} options - The website and the data you want to get.
 * @returns {Promise<SimpleAnalyticsStats>} The response of the Stats API.
 * @throws {Error} If the request fails or the Stats API reports an error.
 *
 * @example
 * const stats = await getSimpleAnalyticsStats({
 *   hostname: "example.com",
 *   fields: ["pageviews", "visitors", "histogram"],
 *   start: "today-30d",
 *   end: "yesterday",
 *   interval: "week",
 * });
 */
export async function getSimpleAnalyticsStats(
  options: SimpleAnalyticsStatsOptions,
): Promise<SimpleAnalyticsStats> {
  const request = options.fetch ?? fetch;
  const response = await request(buildSimpleAnalyticsStatsUrl(options), {
    headers: {
      "Content-Type": "application/json",
      ...(options.apiKey ? { "Api-Key": options.apiKey } : {}),
    },
    ...(options.signal ? { signal: options.signal } : {}),
  });

  const stats: (SimpleAnalyticsStats & { error?: string }) | undefined =
    await response.json().catch(() => undefined);
  if (!response.ok || !stats?.ok) {
    throw new Error(
      `Stats API request failed (${response.status}): ${
        stats?.error ?? response.statusText
      }`,
    );
  }
  return stats;
}
