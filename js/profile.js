// profile.js - Script for handling navigation on profile.html

// Function to handle scroll to specific sections based on URL hash and localStorage
function handlePageNavigation() {
    // Check if we have any section to scroll to from localStorage
    const scrollToSection = localStorage.getItem('scrollToSection');
    const openExpenseTab = localStorage.getItem('openExpenseTab');
    
    if (scrollToSection) {
        // Clear the localStorage item to prevent scrolling on page refresh
        localStorage.removeItem('scrollToSection');
        
        // Scroll to the specified section
        const sectionElement = document.getElementById(scrollToSection);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            
            // If this is the expense tracker and we need to open the expense tab
            if (scrollToSection === 'expense-tracker' && openExpenseTab) {
                localStorage.removeItem('openExpenseTab');
                
                // We need to find and click the "Dodaj trošak" tab
                // This assumes the tabs are using a click event to switch tabs
                setTimeout(() => {
                    const expenseTabs = document.querySelectorAll('.expense-tab');
                    // The second tab (index 1) should be the "Dodaj trošak" tab
                    if (expenseTabs && expenseTabs.length > 1) {
                        expenseTabs[1].click();
                    }
                }, 500); // Small delay to ensure the page has loaded
            }
        }
    }
    
    // Also handle direct URL hash navigation
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1); // Remove the # character
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            setTimeout(() => {
                sectionElement.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', handlePageNavigation);

// Also handle when the hash changes (e.g., when user clicks on links within the page)
window.addEventListener('hashchange', handlePageNavigation);
