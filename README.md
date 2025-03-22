# Essay Showcase Website

A clean, simple website designed to showcase the essay "THE AMERICAN STUDENT DEBT CRISIS: A COMPREHENSIVE HISTORICAL, ECONOMIC, AND SOCIAL ANALYSIS."

## Features

- Responsive design that works on desktop and mobile devices
- Table of contents with smooth scrolling navigation
- Clean typography focused on readability
- Dark/light mode toggle
- Estimated reading time display
- Progress bar as you scroll through the essay
- Citation tooltips for references

## Project Structure

```
essay-website/
├── index.html               # Main HTML page
├── css/
│   └── styles.css           # Main stylesheet
├── js/
│   └── script.js            # JavaScript for interactivity
├── essay.txt                # Original essay content
└── assets/                  # Images, icons, etc.
```

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser to view the website locally
3. Modify the content in index.html to update the essay
4. Customize styles in css/styles.css to match your preferences

## Customization

### Changing Colors

The color scheme can be modified in the `styles.css` file. Look for the `:root` section at the top of the file where all color variables are defined.

### Adding Images

Place any images in the `assets` folder and reference them in the HTML using relative paths.

### SEO

Update the meta tags in the `<head>` section of index.html to improve search engine visibility.

## Deployment

This is a static website that can be deployed on any web hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any traditional web hosting

No build process is required - simply upload the files to your hosting provider.

## Future Enhancements

### Interactive Historical Timeline

A planned enhancement is to add an interactive timeline visualizing the history of student loans in America:

#### Proposed Features:
- Chronological visualization spanning from 1940s to present day
- Key markers for pivotal legislation, policy changes, and economic shifts
- Ability to click/tap events to see details and jump to relevant essay sections
- Toggle overlays showing:
  - Tuition cost trends vs inflation
  - Total student debt growth
  - Average individual debt amounts
  - Default rate changes
  - College enrollment statistics

#### Visual Elements:
- Color-coded events by category (legislation, economic impacts, institutional changes)
- Split-view option showing policy changes above and economic effects below
- Zooming capability to focus on specific time periods
- Interactive data points that reveal additional context when selected

#### Technical Implementation:
- JavaScript visualization libraries (Timeline.js, vis.js, or D3.js)
- JSON data structure to store timeline events
- Responsive design for desktop and mobile viewing
- Optional filtering capability to highlight specific event types

This feature would make the complex historical narrative more accessible and help readers visualize the cause-and-effect relationships between policies and outcomes.
