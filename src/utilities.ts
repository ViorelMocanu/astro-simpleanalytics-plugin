// @ts-expect-error astro:content is not generated
import { z } from "astro:content";

// sanitization functions

/**
 * Checks if the input value is a boolean and returns it if it is `true`. Otherwise, returns `false`.
 *
 * @param {unknown} wannabeBoolean - The value to be checked if it is a boolean.
 * @returns {boolean} A boolean value. If the input is a boolean and equal to `true`, the function returns `true`. Otherwise, it returns `false`.
 *
 * @example
 * const input1 = true;
 * const output1 = sanitizeBoolean(input1);
 * // output1: true
 *
 * const input2 = false;
 * const output2 = sanitizeBoolean(input2);
 * // output2: false
 *
 * const input3 = "true";
 * const output3 = sanitizeBoolean(input3);
 * // output3: false
 */
export function sanitizeBoolean(wannabeBoolean: unknown) {
  return typeof wannabeBoolean === "boolean" ? wannabeBoolean : false;
}

/**
 * Checks if the input value is a string and has a length greater than 1.
 *
 * @param {unknown} wannabeString - The value to be checked if it is a string.
 * @returns {string | boolean} If the input is a string with a length greater than 1, the function returns the input string. Otherwise, it returns `false`.
 *
 * @example
 * const input = "hello";
 * const output = sanitizeString(input);
 * // output: "hello"
 */
export function sanitizeString(wannabeString: unknown) {
  return typeof wannabeString === "string" && wannabeString.length > 1
    ? wannabeString
    : false;
}

/**
 * Checks if the input value is a valid comma-separated value (CSV) string.
 *
 * @param {unknown} wannabeSlugs - The value to be checked if it is a string representing a CSV string.
 * @returns {string | boolean} The input string if it is a valid CSV string, otherwise returns false.
 *
 * @example
 * const input1 = "slug1,slug2,slug3";
 * const output1 = sanitizeCSV(input1);
 * // output1: "slug1,slug2,slug3"
 *
 * const input2 = "slug1";
 * const output2 = sanitizeCSV(input2);
 * // output2: "slug1"
 *
 * const input3 = "slug1,";
 * const output3 = sanitizeCSV(input3);
 * // output3: false
 */
export function sanitizeCSV(wannabeSlugs: unknown) {
  return typeof wannabeSlugs === "string" &&
    z.string().safeParse(wannabeSlugs) &&
    (wannabeSlugs.indexOf(",") >= 0 ? wannabeSlugs.split(",").length > 1 : true)
    ? wannabeSlugs
    : false;
}

/**
 * Checks if the input value is a valid slug.
 *
 * @param {unknown} wannabeSlug - A string representing a slug.
 * @returns {string | boolean} If the input is a valid slug (a string without a comma), the function returns the input string. Otherwise, it returns `false`.
 *
 * @example
 * const input = "my-slug";
 * const output = sanitizeSlug(input);
 * // output: "my-slug"
 */
export function sanitizeSlug(wannabeSlug: unknown) {
  return typeof wannabeSlug === "string" &&
    z.string().safeParse(wannabeSlug).success &&
    wannabeSlug.indexOf(",") < 0
    ? wannabeSlug
    : false;
}

/**
 * Sanitizes a URL by checking if it is valid.
 *
 * @param {unknown} wannabeURL - The URL to be sanitized.
 * @returns {string | unknown} The sanitized URL if it is valid; otherwise, false.
 * @throws {Error} If the URL is invalid.
 *
 * @example
 * const input = "https://example.com";
 * const output = sanitizeURL(input);
 * console.log(output); // "https://example.com"
 */
export function sanitizeURL(wannabeURL: unknown) {
  let urlString = "";
  try {
    const url =
      wannabeURL && typeof wannabeURL === "string" ? new URL(wannabeURL) : "";
    urlString = url.toString();
  } catch (err) {
    throw new Error("Invalid URL");
  }
  return typeof wannabeURL === "string" &&
    z.string().url().safeParse(urlString) &&
    wannabeURL.split(".").length > 1 &&
    !!new URL(wannabeURL).hostname
    ? wannabeURL
    : false;
}

/**
 * Checks if the input value is a valid date string and returns the date in ISO format (YYYY-MM-DD) if it is valid. Otherwise, it returns `false`.
 *
 * @param {unknown} wannabeDate - The value to be checked if it is a valid date string.
 * @returns {string | boolean} If the input is a valid date string, the function returns the date in ISO format (YYYY-MM-DD). If the input is not a valid date string, the function returns `false`.
 *
 * @example
 * const input = "2022-01-01";
 * const output = sanitizeDate(input);
 * // output: "2022-01-01"
 */
export function sanitizeDate(wannabeDate: unknown) {
  let dateString = "";
  try {
    const d = new Date(wannabeDate as string);
    dateString = d.toString();
  } catch (err) {
    throw new Error("Invalid date");
  }
  const date = new Date(dateString);
  return typeof wannabeDate === "string" && !isNaN(date.getTime())
    ? date.toISOString().split("T")[0]
    : false;
}

/**
 * Checks if the input value is a valid hexadecimal color code and returns it if valid. Otherwise, returns false.
 *
 * @param {unknown} wannabeHexColor - The value to be checked if it is a hexadecimal color code.
 * @returns {string | boolean} The input value if it is a valid hexadecimal color code, otherwise false.
 *
 * @example
 * const input1 = "#ff0000";
 * const output1 = sanitizeColorHex(input1);
 * // output1: "#ff0000"
 *
 * const input2 = "#abc";
 * const output2 = sanitizeColorHex(input2);
 * // output2: "#abc"
 *
 * const input3 = "red";
 * const output3 = sanitizeColorHex(input3);
 * // output3: false
 */
export function sanitizeColorHex(wannabeHexColor: unknown) {
  return typeof wannabeHexColor === "string" &&
    wannabeHexColor.substring(0, 1) == "#" &&
    (/^#[0-9a-f]{6}$/i.test(wannabeHexColor) ||
      /^#[0-9a-f]{3}$/i.test(wannabeHexColor))
    ? wannabeHexColor
    : false;
}

/**
 * Checks if a given value is a valid number and returns it if it is greater than or equal to zero. Otherwise, it returns false.
 *
 * @param {unknown} wannabeNumber - The value to be checked if it is a number.
 * @returns {number | boolean} The sanitized number if it is valid and greater than or equal to zero. False if the input is not a valid number or less than zero.
 *
 * @example
 * const result1 = sanitizeNumber(10); // 10
 * const result2 = sanitizeNumber(-5); // false
 * const result3 = sanitizeNumber("abc"); // false
 */
export function sanitizeNumber(wannabeNumber: unknown) {
  return typeof wannabeNumber === "number" &&
    !isNaN(wannabeNumber) &&
    wannabeNumber >= 0
    ? wannabeNumber
    : false;
}

/**
 * Checks if the input is a valid URL hostname.
 *
 * @param {unknown} wannabeHostname - The input to be checked if it is a valid URL hostname.
 * @returns {string | boolean} If the input is a valid URL hostname, it returns the input itself. Otherwise, it returns false.
 *
 * @example
 * const input1 = "https://example.com";
 * const output1 = sanitizeHostname(input1);
 * // output1: "https://example.com"
 *
 * const input2 = "example.com";
 * const output2 = sanitizeHostname(input2);
 * // output2: false
 */
export function sanitizeHostname(wannabeHostname: unknown) {
  let url;
  let urlString = "";
  let host = "";
  try {
    if (wannabeHostname && typeof wannabeHostname === "string")
      url = new URL(`https://${wannabeHostname}`);
    if (url) {
      urlString = url.toString();
      host = new URL(`https://${wannabeHostname}`).hostname;
    }
  } catch (err) {
    throw new Error("Invalid URL");
  }
  return typeof wannabeHostname === "string" &&
    z.string().url().safeParse(urlString) &&
    wannabeHostname.split(".").length > 1 &&
    !!url &&
    !!new URL(url).hostname &&
    new URL(url).hostname === wannabeHostname
    ? host
    : false;
}

/**
 * Sanitizes a list of URLs.
 *
 * @param {unknown} wannabeHostnameList - The list of URLs to be sanitized.
 * @returns {string | boolean} The original `wannabeHostnameList` string if all URLs are valid, otherwise returns `false`.
 *
 * @example
 * const input = "https://example.com,https://google.com";
 * const output = sanitizeURLList(input);
 * console.log(output); // "https://example.com,https://google.com"
 *
 * const invalidInput = "https://example.com,invalid-url";
 * const invalidOutput = sanitizeURLList(invalidInput);
 * console.log(invalidOutput); // false
 */
export function sanitizeHostnameList(wannabeHostnameList: unknown) {
  if (typeof wannabeHostnameList !== "string") return false;
  const urlList = wannabeHostnameList.split(",");
  let allUrlsAreValid = true;
  urlList.forEach((url?: string) => {
    allUrlsAreValid = allUrlsAreValid && !!sanitizeURL(url);
  });
  return allUrlsAreValid ? wannabeHostnameList : false;
}
