const fs = require('fs');
const path = require('path');

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html') && 
    file !== 'coaches.html' && file !== 'coaches-portal.html');

// Update each file
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the footer links section
    const oldFooterLinks = /<div class="footer-links">\s*<a href="privacy\.html">Privacy Policy<\/a>\s*<a href="contact\.html">Contact Us<\/a>\s*<\/div>/;
    const newFooterLinks = '<div class="footer-links">\n                    <a href="privacy.html">Privacy Policy</a>\n                    <a href="contact.html">Contact Us</a>\n                    <a href="coaches.html">Coaches Portal</a>\n                </div>';
    
    content = content.replace(oldFooterLinks, newFooterLinks);
    
    // Write the updated content back to the file
    fs.writeFileSync(file, content, 'utf8');
    
    console.log(`Updated footer in ${file}`);
});

console.log('All footers updated successfully!');