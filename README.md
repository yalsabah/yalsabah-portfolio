# Yousif Alsabah — Portfolio

A personal portfolio site built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just clean, fast, and fully responsive.

## Live Features

- **Dark / Light theme** toggle with `localStorage` persistence
- **Typewriter animation** on the hero subtitle
- **Parallax hero** and fade-in scroll animations
- **Scroll progress bar** and back-to-top button
- **Active nav link** highlighting based on scroll position
- **Project detail panel** — slide-in sidebar with videos, links, and demos
- **Animated stat counters** triggered on scroll
- **Dynamic mouse-tracking gradient** background
- **Mobile responsive** with hamburger nav menu
- **Console easter egg** for curious developers

## Project Structure

```
yalsabah-portfolio/
├── index.html      # Main markup — all sections in one file
├── styles.css      # All styles, theming (CSS variables), and animations
├── script.js       # All interactivity — no dependencies
└── resume.pdf      # Downloadable resume
```

## Sections

| Section    | Description                                      |
|------------|--------------------------------------------------|
| Hero       | Intro, availability badge, social links          |
| About      | Animated GPA / experience stats                  |
| Experience | Intel internship roles with tech tags            |
| Projects   | Cards with a slide-in detail panel               |
| Skills     | Categorized skill grid with hover effects        |
| Education  | ASU degrees with GPA and dates                   |
| Contact    | Email, LinkedIn, GitHub, phone                   |

## Running Locally

No build step needed — just open the file in a browser:

```bash
open index.html
```

Or serve it with any static server:

```bash
npx serve .
# or
python3 -m http.server
```

## Tech Stack

- HTML5, CSS3 (custom properties, grid, flexbox, keyframe animations)
- Vanilla JavaScript (ES6+)
- Font Awesome 6 icons
- Google Fonts (Inter, JetBrains Mono)
