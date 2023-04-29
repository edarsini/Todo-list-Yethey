// Get the radio buttons for the theme selection
const themeRadios = document.querySelectorAll('input[name="theme"]');

// Get the body element
const body = document.body;

// Add a change event listener to each radio button
for (const radio of themeRadios) {
  radio.addEventListener('change', function() {
    // Check if the radio button is checked
    if (this.checked) {
      // Remove any existing theme classes from the body element
      body.classList.remove('theme-light', 'theme-dark');
      
      // Add the new theme class to the body element
      body.classList.add(`theme-${this.value}`);
    }
  });
}
