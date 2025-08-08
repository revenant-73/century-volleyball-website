# Century High School Volleyball

Static website for Century High School's volleyball program featuring both boys and girls teams.

## Features
- Team information and rosters
- Contact information
- Secure coaches portal with educational resources
- Mobile-responsive design
- Image galleries for both teams

## Tech Stack
- HTML5, CSS3, JavaScript
- Hosted on Netlify
- No build process required

## Deployment
Automatically deploys to Netlify when pushed to main branch.

Use the included PowerShell script for easy deployment:
```bash
.\push-to-github.ps1 "Your commit message"
```

## Structure
- `index.html` - Main landing page
- `boys-volleyball.html` / `girls-volleyball.html` - Team-specific pages
- `coaches.html` - Login page for secure area
- `coaches-portal.html` - Protected resources for coaches
- `css/` - Stylesheets
- `js/` - JavaScript functionality
- `images/` - Team photos and assets