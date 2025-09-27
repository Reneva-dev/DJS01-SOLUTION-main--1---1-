🎙️ PodcastApp (DJS02)

📝 Project Description

PodcastApp is a responsive web application for browsing and exploring podcasts.
In this second project (DJS02), the focus is on Dynamic JavaScript and the use of Web Components.

The key addition is a custom HTML element:
<podcast-card> → a reusable podcast preview component that encapsulates its structure, styles, and logic inside a Shadow DOM.

Users can view podcasts in a consistent grid, interact with each preview, and open a modal for more detailed information.

🛠️ Technologies Used

💻 JavaScript (ES6 Modules & Web Components) – dynamic rendering, encapsulated component logic, event handling

🎨 Tailwind CSS – responsive, utility-first styling

🌐 HTML5 & CSS3 – page structure and base styles

🚀 Live Server – local development & testing

✨ Features
📄 Landing Page

Displays a grid of <podcast-card> components.

Each card shows:

🖼️ Cover image

🎧 Podcast title

🏷️ Genres

📅 Last updated date (human-readable)

🎬 Number of seasons

Layout adapts for mobile and desktop.

🔍 Modal View

Clicking a podcast card opens a modal with:

🎯 Title & enlarged cover image

📖 Description

🏷️ Genres

📅 Last updated date

🎬 Season details & episode counts

❌ Close modal with the X button or backdrop.

🧩 Code Architecture

Custom Element:

<podcast-card> defined in components/podcast-card.js

Accepts podcast data as attributes or as a property (card.podcast = data)

Encapsulates HTML, CSS, and behavior inside Shadow DOM

Dispatches a custom "podcast-selected" event on click

Grid Renderer (views/createGrid.js)

Dynamically creates <podcast-card> elements from data.js

Listens for "podcast-selected" events to open the modal

Modal Controller (components/createModal.js)

Updates and displays detailed podcast info

Utilities

GenreService.js – maps genre IDs to titles

DateUtils.js – formats ISO dates

Structure

src/
├── components/
│   ├── podcast-card.js
│   ├── createModal.js
│   └── createPodcastCard.js   (legacy, no longer used)
├── utils/
│   ├── DateUtils.js
│   └── GenreService.js
└── views/
    └── createGrid.js

⚙️ Setup Instructions

Clone the repository:

git clone <repository-url>


Navigate into the project folder:

cd DJS02-PodcastApp


Open the project in a live server

Right-click index.html → "Open with Live Server" (VS Code)

Or open index.html directly in your browser

✅ Ensure Tailwind CSS CDN is included in index.html.

🚀 Usage

Open the landing page → the grid of <podcast-card> components loads from data.js.

Hover or tap a card → subtle animation and shadow effects.

Click a card → "podcast-selected" event is dispatched, modal opens with details.

Read podcast description, genres, and seasons.

Close modal with X or backdrop.

🤝 Interaction Instructions

App works with mouse or touch.

<podcast-card> is stateless – data is passed in via attributes or property.

Main app handles modal logic, so the component stays decoupled.

🚧 Future Improvements

🔎 Add search/filter for genres or titles

📅 Add sorting by most recent updates

🎵 Integrate audio previews

♻️ Remove legacy createPodcastCard.js once fully stable

⚠️ Known Issues

Mobile image sizing may need slight adjustments

Season/episode info depends on dataset quality

👩‍💻 Developed by: Reneva Newman
📌 Data (data.js) provided by CodeSpace Academy
