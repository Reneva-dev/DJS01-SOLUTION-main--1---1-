import { GenreService } from "../utils/GenreService.js";
import { DateUtils } from "../utils/DateUtils.js";

/**
 * @fileoverview Defines the <podcast-card> custom element.
 *
 * Displays a podcast preview with cover image, title, seasons, genres, and
 * last updated date. Can be populated either via attributes or by assigning
 * a `podcast` object property.
 *
 * Dependencies:
 * - GenreService (maps genre IDs to human-readable names)
 * - DateUtils (formats ISO date strings)
 */

/**
 * PodcastCard component — custom HTML element.
 *
 * @element podcast-card
 *
 * @property {Object} podcast - Full podcast data object.
 * @property {string} podcast.title - The podcast title.
 * @property {string} podcast.image - URL for the cover image.
 * @property {number} podcast.seasons - Number of seasons.
 * @property {number[]} podcast.genres - Array of genre IDs.
 * @property {string} podcast.updated - ISO date string of the last update.
 *
 * @fires podcast-selected - Emitted when the card is clicked. The event detail
 * contains the full podcast object if available, otherwise the podcast title string.
 */
class PodcastCard extends HTMLElement {
  /**
   * Attributes observed for changes.
   * @returns {string[]} List of attribute names to observe.
   */
  static get observedAttributes() {
    return ["title", "image", "seasons", "genres", "updated"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Sets the podcast data and triggers a re-render.
   * @param {Object} data - Podcast object.
   * @param {string} data.title
   * @param {string} data.image
   * @param {number} data.seasons
   * @param {number[]} data.genres
   * @param {string} data.updated
   */
  set podcast(data) {
    this._podcast = data;
    this.render();
  }

  /** @returns {Object} Podcast data object */
  get podcast() {
    return this._podcast;
  }

  /**
   * Reacts to observed attribute changes by re-rendering.
   * @param {string} name - Attribute name.
   * @param {string|null} oldValue - Previous value.
   * @param {string|null} newValue - New value.
   * @returns {void}
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  /**
   * Lifecycle hook called when the element is inserted into the DOM.
   * Attaches a click listener that dispatches `podcast-selected`.
   * @returns {void}
   */
  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("podcast-selected", {
          detail: this._podcast || this.getAttribute("title"),
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  /**
   * Renders the podcast card into the shadow DOM.
   * Pulls data from either the `podcast` property or element attributes.
   * @returns {void}
   */
  render() {
    const title = this._podcast?.title || this.getAttribute("title") || "";
    const image = this._podcast?.image || this.getAttribute("image") || "";
    const seasons =
      this._podcast?.seasons || parseInt(this.getAttribute("seasons")) || 0;
    const genres =
      this._podcast?.genres ||
      (this.getAttribute("genres") || "")
        .split(",")
        .map((id) => parseInt(id, 10));
    const updated = this._podcast?.updated || this.getAttribute("updated");

    const genreNames = Array.isArray(genres)
      ? GenreService.getNames(genres)
      : [];
    const formattedDate = updated ? DateUtils.format(updated) : "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        :host(:hover) {
          transform: scale(1.02);
        }
        img {
          max-width: 100%;
          border-radius: 8px;
        }
        h3 {
          margin: 0.5rem 0;
          font-size: 1.2rem;
        }
        .tags {
          margin: 0.5rem 0;
        }
        .tag {
          display: inline-block;
          background: #eee;
          padding: 0.25rem 0.5rem;
          margin: 0 0.25rem 0.25rem 0;
          border-radius: 6px;
          font-size: 0.8rem;
        }
        .updated {
          font-size: 0.8rem;
          color: #666;
        }
      </style>
      <img src="${image}" alt="${title} cover">
      <h3>${title}</h3>
      <p>${seasons} season${seasons > 1 ? "s" : ""}</p>
      <div class="tags">
        ${genreNames.map((g) => `<span class="tag">${g}</span>`).join("")}
      </div>
      <p class="updated">${formattedDate}</p>
    `;
  }
}

// Register the custom element
customElements.define("podcast-card", PodcastCard);
