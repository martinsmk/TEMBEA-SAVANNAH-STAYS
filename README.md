# Tembea Savannah Stays

A warm, data-driven web application for listing and reviewing short-term stays across the East African savannah and beyond.

**Problem it solves:**  
Small hospitality businesses and individuals need a lightweight way to list their properties and collect guest feedback without complex backend systems. Tembea Savannah Stays stores everything in the browser using localStorage so it works offline and requires zero server setup.

## Features

- **Add Stay** – Form for companies to list a property (name, location, price, type)
- **Browse Stays** – Beautiful card grid of all listed stays with live filters (location, max price, type)
- **Per-stay average rating** – Each stay card shows its own average from the reviews it has received
- **Reviews** – Leave a rating + comment for any stay, see overall average and the full list
- **Delete buttons** – Remove a stay (and its reviews) or delete individual reviews
- **Sample data** – On first visit the site automatically loads 4 realistic savannah stays
- Data is persisted in `localStorage` and shared across all three pages
- Fully responsive (mobile, tablet, desktop)
- Client-side form validation with clear error messages
- Semantic HTML and accessible structure
- Warm savannah-inspired design (terracotta, deep green, golden accents, sandy backgrounds)

## Pages

| Page            | File            | Purpose                              |
|-----------------|-----------------|--------------------------------------|
| Stays           | `index.html`    | View & filter all stays + delete     |
| Add Stay        | `add-stay.html` | Form to add a new stay               |
| Reviews         | `reviews.html`  | Add reviews + view averages & list   |

## Tech Stack

- HTML (semantic elements)
- CSS (Flexbox, Grid, CSS variables, media queries)
- JavaScript (DOM manipulation, event handling, localStorage)

## How to Run

1. Clone or download this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
3. That's it

## Data Storage

- Stays → `localStorage` key: `tembea_stays`
- Reviews → `localStorage` key: `tembea_reviews`

Clearing browser data will remove all saved stays and reviews.  
On the very first load the site seeds 4 sample stays so it is never empty.

## Known Limitations / Bugs

- Data is stored only in the current browser
- No user authentication
- No image upload for stays 
- Deleting a stay also deletes all reviews that belonged to it

## Project Structure

```
/
├── index.html      # Stays listing page
├── add-stay.html   # Add stay form
├── reviews.html    # Reviews page
├── styles.css      # Shared styles (savannah theme)
├── script.js       # Shared JavaScript 
└── README.md
```

## Author

Martins – Final Indipendent Project- FSD-FTH7
