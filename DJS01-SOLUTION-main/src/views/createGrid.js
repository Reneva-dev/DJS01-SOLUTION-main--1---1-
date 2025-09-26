import { createModal } from "../components/createModal.js";

/**
 * Grid Renderer - Responsible for rendering the grid of podcast cards.
 *
 * @principle SRP - Manages layout and rendering only; delegates card creation and modal logic elsewhere.
 */
export const createGrid = () => {
  const container = document.getElementById("podcastGrid");

  return {
    /**
     * Renders a list of podcast cards into the grid.
     * @param {Object[]} podcastList - Array of podcast objects.
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

