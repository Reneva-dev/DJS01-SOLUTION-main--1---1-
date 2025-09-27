import { createModal } from "../components/createModal.js";

/**
 * @fileoverview Provides the grid renderer for podcast cards.
 *
 * The grid is responsible for rendering <podcast-card> elements into the
 * #podcastGrid container. It delegates modal behavior to `createModal`
 * and card rendering to the <podcast-card> custom element.
 *
 * @principle SRP - Manages layout and rendering only; delegates card creation
 * and modal logic elsewhere.
 */

/**
 * Factory function that creates a grid renderer for podcast cards.
 *
 * @function createGrid
 * @returns {Object} Grid API
 * @returns {Function} return.render - Renders a list of podcast cards into the grid.
 */
export const createGrid = () => {
  const container = document.getElementById("podcastGrid");

  return {
    /**
     * Renders a list of podcast cards into the grid container.
     *
     * @param {Object[]} podcastList - Array of podcast objects.
     * @param {string} podcastList[].title - Title of the podcast.
     * @param {string} podcastList[].image - Cover image URL.
     * @param {number} podcastList[].seasons - Number of seasons.
     * @param {number[]} podcastList[].genres - Array of genre IDs.
     * @param {string} podcastList[].updated - ISO date string of last update.
     * @returns {void}
     *
     * @listens podcast-selected
     */
    render(podcastList) {
      container.innerHTML = "";

      podcastList.forEach((p) => {
        // Create a new <podcast-card> element
        const card = document.createElement("podcast-card");

        // Pass the full podcast object into the component
        card.podcast = p;

        // Handle custom event from the card → open modal
        card.addEventListener("podcast-selected", () => createModal.open(p));

        // Add card to the grid
        container.appendChild(card);
      });
    },
  };
};


