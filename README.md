# Pharma City in Hyderabad: Essay Website

A clean, responsive website designed to showcase the essay "Why Some Cities Fail Upwards (And My Case for a Pharma City in Hyderabad)" - an analysis of urban economic dynamics and the potential for pharmaceutical sector development in Hyderabad, India.

## Features

- Responsive design that works on desktop and mobile devices
- Table of contents with smooth scrolling navigation
- Clean typography focused on readability
- Dark/light mode toggle that remembers user preference
- Estimated reading time display
- Progress bar as you scroll through the essay
- Section navigation buttons

## Project Structure

```
pharma-city-website/
├── index.html               # Main HTML file with essay content
├── css/
│   └── styles.css           # Main stylesheet
├── js/
│   └── script.js            # JavaScript for interactivity
└── assets/                  # (Optional) Images, icons, etc.
    └── ...
```

## Getting Started

1. Clone this repository or download the files
2. Open `index.html` in your browser to view the website locally
3. Modify content in index.html if needed
4. Customize styles in css/styles.css to match your preferences

## Customization

### Changing Colors

The color scheme can be modified in the `styles.css` file. Look for the `:root` section at the top of the file where all color variables are defined:

```css
:root {
    /* Light theme variables */
    --background-color: #ffffff;
    --text-color: #333333;
    --heading-color: #222222;
    --link-color: #0366d6;
    --progress-bar-color: #4caf50;
    /* etc. */
}
```

You can create a pharmaceutical theme by changing key colors:
- For a medical/pharma blue theme: `--link-color: #0066cc; --progress-bar-color: #0066cc;`
- For a green biotech theme: `--link-color: #00796b; --progress-bar-color: #00796b;`

### Adding Images

Place any images in the `assets` folder and reference them in the HTML using relative paths:

```html
<img src="assets/hyderabad-skyline.jpg" alt="Hyderabad Skyline">
```

### SEO

Update the meta tags in the `<head>` section of index.html to improve search engine visibility:

```html
<meta name="description" content="An analysis of urban economic development and the potential of a pharmaceutical hub in Hyderabad">
<meta name="keywords" content="Hyderabad, Pharma City, pharmaceutical industry, urban economics, India development">
<meta name="author" content="Your Name">
```

## Deployment

This is a static website that can be deployed on any web hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any traditional web hosting

No build process is required - simply upload the files to your hosting provider.

## Browser Compatibility

This website is compatible with:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 16+
- Opera 50+

## Future Enhancement Ideas

### Interactive Map of Pharma City
Add an interactive map showing the planned layout of Pharma City with different zones and infrastructure.

### Comparative Visualization
Create data visualizations comparing Hyderabad with other global pharmaceutical hubs like Basel, Singapore, and Boston.

### Expanded Case Studies
Add detailed case studies of successful pharmaceutical clusters around the world with lessons for Hyderabad.

## Credits

- Fonts: [Google Fonts](https://fonts.google.com/) - Merriweather and Open Sans
- Icons: [Font Awesome](https://fontawesome.com/)

## License

You may use this project for personal or commercial purposes. Attribution is appreciated but not required.