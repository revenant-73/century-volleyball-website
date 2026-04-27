# Repository Guidelines

## Project Structure & Module Organization
This is a static website for the Century High School Volleyball program. The architecture is straightforward:
- **Root**: Contains the main HTML pages (`index.html`, `boys-volleyball.html`, `girls-volleyball.html`, `contact.html`).
- **css/**: Contains the global stylesheet `style.css` and its minified version.
- **js/**: Contains `script.js` for client-side functionality and its minified version.
- **images/**: Assets directory organized by team (boys/girls) and general site images.
- **netlify.toml**: Configuration for Netlify deployment, including security headers and redirects for protected routes.

## Build, Test, and Development Commands
The project does not require a build process. It uses simple Node.js and shell scripts for maintenance:
- **Update Footers**: `node update-footers.js` (Updates the footer section across all HTML files).
- **Image Optimization**: `optimize_images.bat` (Uses `ffmpeg` to generate responsive variants of team photos).
- **Deployment**: `.\push-to-github.ps1 "commit message"` (Commits changes and pushes to GitHub for Netlify deployment).

## Coding Style & Naming Conventions
- **HTML/CSS**: Follows standard semantic HTML5 and modern CSS3 practices.
- **JavaScript**: Client-side JS is located in `js/script.js`. Scripts intended for local maintenance (like `update-footers.js`) use Node.js CommonJS syntax.
- **Naming**: Generally uses kebab-case for file names and CSS classes.

## Testing Guidelines
There is currently no automated testing suite. Manual verification of HTML pages and mobile responsiveness is required before deployment.

## Commit & Pull Request Guidelines
Commit messages should be descriptive of the changes made. While no strict format is enforced, the project history shows a preference for lowercase, task-oriented descriptions (e.g., `roster updates`, `updated schedule`). Use the provided `push-to-github.ps1` script to ensure consistent deployment workflow.
