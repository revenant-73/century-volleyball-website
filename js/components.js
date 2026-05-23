/**
 * Component Loader
 * Loads shared HTML components like header and footer
 */
async function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error(`Failed to load component: ${componentPath}`);
        const html = await response.text();
        element.innerHTML = html;
        
        // Dispatch custom event when component is loaded
        const event = new CustomEvent('componentLoaded', { 
            detail: { id: elementId, path: componentPath } 
        });
        document.dispatchEvent(event);
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load all components
async function initComponents() {
    await Promise.all([
        loadComponent('main-header', 'components/header.html'),
        loadComponent('main-footer', 'components/footer.html')
    ]);
    
    // Dispatch event when all components are loaded
    document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
}

// Start loading when script is executed
initComponents();