import { genres } from "../data.js";

/**
 * @fileoverview Utility service for resolving genre IDs into human-readable names.
 *
 * Delegates lookup to the `genres` dataset imported from data.js.
 *
 * @principle SRP - Single Responsibility Principle: Only responsible for mapping
 * genre IDs to genre titles.
 */

/**
 * GenreService — maps numeric genre IDs to their corresponding titles.
 *
 * @namespace GenreService
 */
export const GenreService = {
  /**
   * Resolves an array of genre IDs into an array of genre titles.
   *
   * @function getNames
   * @memberof GenreService
   * @param {number[]} genreIds - Array of genre IDs.
   * @returns {string[]} Array of resolved genre titles. Unknown IDs return `"Unknown"`.
   *
   * @example
   * // returns ["Technology", "Education"]
   * GenreService.getNames([1, 2]);
   */
  getNames(genreIds) {
    return genreIds.map(
      (id) => genres.find((g) => g.id === id)?.title || "Unknown"
    );
  },
};

