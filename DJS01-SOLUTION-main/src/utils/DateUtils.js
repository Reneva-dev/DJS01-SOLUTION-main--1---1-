/**
 * @fileoverview Utility for formatting dates into human-readable strings.
 *
 * Wraps JavaScript's native Date API to standardize how update timestamps
 * are displayed throughout the application.
 *
 * @principle SRP - Single Responsibility Principle: Only formats dates,
 * without handling unrelated logic.
 */

/**
 * DateUtils — collection of date formatting utilities.
 *
 * @namespace DateUtils
 */
export const DateUtils = {
  /**
   * Formats an ISO date string into a localized human-readable string.
   *
   * @function format
   * @memberof DateUtils
   * @param {string} dateStr - ISO 8601 date string (e.g., "2025-09-26").
   * @returns {string} Formatted date string (e.g., "Updated September 26, 2025").
   *
   * @example
   * // returns "Updated September 26, 2025"
   * DateUtils.format("2025-09-26");
   */
  format(dateStr) {
    const date = new Date(dateStr);
    return `Updated ${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  },
};
