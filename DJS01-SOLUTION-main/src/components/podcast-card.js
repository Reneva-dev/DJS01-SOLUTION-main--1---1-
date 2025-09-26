import { GenreService } from "../utils/GenreService.js";
import { DateUtils } from "../utils/DateUtils.js";

class PodcastCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "image", "seasons", "genres", "updated"];
  }
