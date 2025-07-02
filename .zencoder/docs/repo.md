# Century Volleyball Website Information

## Summary
A static website for Century High School's volleyball program featuring both boys and girls teams. The site includes team information, contact details, and a secure coaches portal with educational resources.

## Structure
- **HTML Files**: Core website pages (index.html, boys-volleyball.html, girls-volleyball.html, contact.html, coaches.html, coaches-portal.html)
- **CSS**: Styling files in the css directory (style.css, style.min.css)
- **JavaScript**: Functionality scripts in the js directory (script.js, script.min.js, coaches-auth.js)
- **Images**: Media assets organized in the images directory with separate folders for boys and girls teams
- **Deployment**: Configuration files for Netlify hosting and GitHub repository management

## Language & Runtime
**Language**: HTML5, CSS3, JavaScript (ES6+)
**Build System**: None (static website)
**Deployment Platform**: Netlify

## Dependencies
**External Services**:
- Netlify (hosting platform)
- GitHub (version control)
- Spond (team communication platform, linked externally)
- Snap! Manage (registration system, linked externally)

## Build & Installation
This is a static website with no build process required. Files are deployed directly to Netlify.

```bash
# No build command needed as specified in netlify.toml
# To deploy manually:
git push origin main
```

## Deployment
**Hosting**: Netlify
**Configuration**: netlify.toml defines redirects and security headers
**GitHub Integration**: Automated deployment from GitHub repository

```bash
# Deploy to GitHub using provided script
.\push-to-github.ps1 "Commit message"
```

## Main Files & Resources
**Entry Point**: index.html (main landing page)
**Key Pages**:
- boys-volleyball.html, girls-volleyball.html (team-specific pages)
- coaches.html (login page for secure area)
- coaches-portal.html (protected resources for coaches)

**Authentication**: Client-side authentication in coaches-auth.js using sessionStorage

## JavaScript Components
**Navigation**: Mobile-responsive menu toggle in script.js
**Form Validation**: Contact form validation with error handling
**Image Gallery**: Lightbox functionality for team photos
**Authentication**: Simple password protection for coaches portal

## Security Considerations
- Content Security Policy defined in netlify.toml
- Client-side authentication for coaches portal (note: uses client-side password storage which is not secure for sensitive data)
- X-XSS-Protection and other security headers configured

## Maintenance
**Update Scripts**: update-footers.js Node.js script for batch updating footer content
**Deployment Scripts**: push-to-github.ps1 PowerShell script for GitHub deployment
**Configuration**: GitHub repository settings in github-config.json