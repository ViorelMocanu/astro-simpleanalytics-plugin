// @ts-expect-error astro:content is not generated
import { z } from "astro:content";

// sanitization functions
export function sanitizeBoolean (wannabeBoolean: boolean) {
  return typeof wannabeBoolean === "boolean" &&
    z.boolean().safeParse(wannabeBoolean) &&
    wannabeBoolean === true
    ? true
    : false;
}

export function sanitizeString(wannabeString: string) {
  return (typeof wannabeString === "string") ? wannabeString : false;
}
export function sanitizeCSV (wannabeSlugs?: string) {
  return (typeof wannabeSlugs === "string" &&
    z.string().safeParse(wannabeSlugs) &&
    (wannabeSlugs.indexOf(",") >= 0 ? wannabeSlugs.split(",").length > 1 : true))
    ? wannabeSlugs
    : false;
}
export function sanitizeSlug (wannabeSlug?: string) {
  return (typeof wannabeSlug === "string" &&
    z.string().safeParse(wannabeSlug) &&
		wannabeSlug.indexOf(",") >= 0)
    ? wannabeSlug : true;
}

export function sanitizeURL (wannabeURL?: string) {
  return (typeof wannabeURL === "string" &&
    z.string().url().safeParse(new URL(wannabeURL).toString()) &&
    wannabeURL.split(".").length > 1)
    ? wannabeURL
    : false;
}

export function sanitizeHostname (wannabeHostname?: string) {
  return (
    typeof wannabeHostname === "string" &&
      z.string().url().safeParse(new URL(wannabeHostname).toString()) &&
        new URL(wannabeHostname).hostname === wannabeHostname
  ) ? wannabeHostname : false;
}

export function sanitizeURLList (wannabeURLList?: string) {
  if (typeof wannabeURLList !== "string") return false;
  const urlList = wannabeURLList.split(",");
  let allUrlsAreValid = true;
  urlList.forEach((url?: string) => {
    allUrlsAreValid = allUrlsAreValid && !!sanitizeURL(url);
  });
  return allUrlsAreValid ? wannabeURLList : false;
}