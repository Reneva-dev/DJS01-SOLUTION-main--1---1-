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