import { GenreService } from "../utils/GenreService.js";
import { DateUtils } from "../utils/DateUtils.js";

class PodcastCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "image", "seasons", "genres", "updated"];
  }

    constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Allow setting a full podcast object as a property
  set podcast(data) {
    this._podcast = data;
    this.render();
  }

  get podcast() {
    return this._podcast;
  }

   // React to attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    // Dispatch event when user clicks the card
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