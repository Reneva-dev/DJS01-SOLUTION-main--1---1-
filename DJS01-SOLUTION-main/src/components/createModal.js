import { GenreService } from "../utils/GenreService.js";
import { DateUtils } from "../utils/DateUtils.js";
import { seasons } from "../data.js";

/**
 * @fileoverview Controls the podcast details modal.
 *
 * Provides methods to open and close the modal, and handles updating its
 * contents with podcast data. Delegates genre name resolution to GenreService
 * and date formatting to DateUtils.
 *
 * @principle SRP - Handles modal logic only (open, close, update content).
 * @principle OCP - Open/Closed Principle: New fields (e.g., ratings) could be
 * added to modal without modifying external usage.
 */

/**
 * Modal controller singleton.
 *
 * @namespace createModal
 * @property {Function} open - Opens the modal with a given podcast object.
 * @property {Function} close - Closes the modal.
 */
export const createModal = (() => {
  const el = (id) => document.getElementById(id);
  const modal = el("modal");

  /**
   * Updates the modal content with podcast details.
   *
   * @private
   * @param {Object} podcast - Podcast data object.
   * @param {string} podcast.id - Unique podcast identifier.
   * @param {string} podcast.title - Title of the podcast.
   * @param {string} podcast.image - Cover image URL.
   * @param {string} podcast.description - Description of the podcast.
   * @param {number[]} podcast.genres - Array of genre IDs.
   * @param {string} podcast.updated - ISO date string of last update.
   * @returns {void}
   */
  function updateContent(podcast) {
    el("modalImage").src = podcast.image;
    el("modalTitle").textContent = podcast.title;
    el("modalDesc").textContent = podcast.description;

    el("modalGenres").innerHTML = GenreService.getNames(podcast.genres)
      .map((g) => `<span class="tag">${g}</span>`)
      .join("");

    el("modalUpdated").textContent = DateUtils.format(podcast.updated);

    const seasonData =
      seasons.find((s) => s.id === podcast.id)?.seasonDetails || [];
    el("seasonList").innerHTML = seasonData
      .map(
        (s, index) => `
          <li class="season-item">
            <strong class="season-title">Season ${index + 1}: ${s.title}</strong>
            <span class="episodes">${s.episodes} episodes</span>
          </li>`
      )
      .join("");
  }

  return {
    /**
     * Opens the modal with podcast details.
     *
     * @param {Object} podcast - Podcast data object.
     * @param {string} podcast.id - Unique podcast identifier.
     * @param {string} podcast.title - Title of the podcast.
     * @param {string} podcast.image - Cover image URL.
     * @param {string} podcast.description - Description of the podcast.
     * @param {number[]} podcast.genres - Array of genre IDs.
     * @param {string} podcast.updated - ISO date string of last update.
     * @returns {void}
     */
    open(podcast) {
      updateContent(podcast);
      modal.classList.remove("hidden");
    },

    /**
     * Closes the modal.
     * @returns {void}
     */
    close() {
      modal.classList.add("hidden");
    },
  };
})();
