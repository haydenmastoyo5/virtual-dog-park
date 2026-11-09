// ====================================================
//  Virtual Dog Park — script.js
//  Vanilla JavaScript, no libraries or frameworks.
//  Purpose: toggle the "Extra care tips" panel on each
//  breed card when the user clicks the button.
// ====================================================

// Run once the HTML has finished loading.
document.addEventListener("DOMContentLoaded", function () {

  // Grab every toggle button on the page.
  var buttons = document.querySelectorAll(".toggle-btn");

  // Loop through the buttons and attach a click listener to each.
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {

      // "this" is the button that was clicked.
      // Find the care-tips panel that sits right before this button.
      var tipsPanel = this.previousElementSibling;

      // Toggle the "visible" class on the panel.
      tipsPanel.classList.toggle("visible");

      // Update the button text and aria-expanded attribute
      // so the label matches the current state.
      if (tipsPanel.classList.contains("visible")) {
        this.textContent = "Hide care tips";
        this.setAttribute("aria-expanded", "true");
      } else {
        this.textContent = "Show care tips";
        this.setAttribute("aria-expanded", "false");
      }
    });
  }

});
