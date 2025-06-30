// Utility for managing event listeners to prevent duplicates and memory leaks
window.EventManager = {
    listeners: new Map(),
    
    // Add event listener with automatic cleanup of previous listeners
    addListener(element, eventType, handler, options) {
        if (!element) return;
        
        // Create unique key for this element+event combination
        const key = `${element}:${eventType}`;
        
        // Remove any existing listener for this element+event
        if (this.listeners.has(key)) {
            const oldHandler = this.listeners.get(key);
            element.removeEventListener(eventType, oldHandler, options);
        }
        
        // Add new listener and store reference
        element.addEventListener(eventType, handler, options);
        this.listeners.set(key, handler);
        
        return handler; // Return handler in case it's needed elsewhere
    },
    
    // Remove a specific listener
    removeListener(element, eventType, options) {
        if (!element) return;
        
        const key = `${element}:${eventType}`;
        if (this.listeners.has(key)) {
            const handler = this.listeners.get(key);
            element.removeEventListener(eventType, handler, options);
            this.listeners.delete(key);
        }
    },
    
    // Utility for adding a safe DOMContentLoaded listener
    // This ensures only one listener runs for each callback ID
    onDOMReady(callbackId, callback) {
        // Use a special prefix for document:DOMContentLoaded
        const key = `document:DOMContentLoaded:${callbackId}`;
        
        // Check if DOM is already loaded
        if (document.readyState === 'loading') {
            // If not loaded yet, add the listener
            const handler = () => {
                callback();
                this.listeners.delete(key);
            };
            
            // Remove existing listener if any
            if (this.listeners.has(key)) {
                document.removeEventListener('DOMContentLoaded', this.listeners.get(key));
            }
            
            // Add new listener
            document.addEventListener('DOMContentLoaded', handler);
            this.listeners.set(key, handler);
        } else {
            // If already loaded, run immediately
            setTimeout(callback, 0);
        }
    }
};
