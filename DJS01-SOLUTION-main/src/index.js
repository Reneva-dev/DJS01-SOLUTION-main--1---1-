import { podcasts } from "./data.js";
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";
import "./components/podcast-card.js";

/**
 * @fileoverview Entry point for the Podcast App.
 *
 * Imports application data, UI components, and views.
 * Responsible for initializing the grid of podcasts and binding
 * the modal close event.
 *
 * Dependencies:
 * - data.js (podcast dataset)
 * - createModal.js (modal rendering and control)
 * - createGrid.js (grid view controller)
 * - podcast-card.js (custom element definition)
 */

/**
 * Initializes the podcast application.
 *
 * @function init
 * @description Sets up event listeners and renders the initial podcast grid.
 * @principle SRP - Only responsible for application startup logic like event binding and rendering initial grid.
 *
 * @returns {void}
 */
function init() {
  document
    .getElementById("closeModal")
    .addEventListener("click", createModal.close);
  const grid = createGrid();
  grid.render(podcasts);
}

init();

