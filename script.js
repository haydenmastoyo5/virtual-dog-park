// ====================================================
//  Virtual Dog Park — script.js
//  Vanilla JavaScript, no libraries or frameworks.
//
//  Two features:
//   1. Encyclopedia care-tips toggle (original)
//   2. "My Virtual Dog" adoption and care (new)
// ====================================================


// --------------------------------------------------
//  PART 2 — "My Virtual Dog" adoption and care
// --------------------------------------------------

// This variable holds the visitor's adopted dog.
// It is null until they adopt one.
var myDog = null;

// Map each breed name to its illustration file and alt text.
var breedImages = {
  "Beagle": {
    src: "assets/beagle.svg",
    alt: "Illustration of a Beagle"
  },
  "Golden Retriever": {
    src: "assets/golden-retriever.svg",
    alt: "Illustration of a Golden Retriever"
  },
  "Poodle": {
    src: "assets/poodle.svg",
    alt: "Illustration of a Poodle"
  }
};

// Return the growth stage name based on the day number.
//   Day 1-3 = Puppy
//   Day 4-6 = Young
//   Day 7+  = Adult
function getGrowthStage(day) {
  if (day <= 3) {
    return "Puppy";
  } else if (day <= 6) {
    return "Young";
  } else {
    return "Adult";
  }
}

// Update the dog status panel on the page.
// Uses textContent (never innerHTML) so the dog's name is
// displayed safely as plain text — not inserted as HTML.
function updateDogDisplay() {
  // Show the status panel (it is hidden until adoption).
  var statusPanel = document.getElementById("dog-status");
  statusPanel.hidden = false;

  // Show the correct illustration for the breed.
  var img = document.getElementById("dog-status-img");
  img.src = breedImages[myDog.breed].src;
  img.alt = breedImages[myDog.breed].alt;

  // Fill in each stat using textContent — safe text insertion.
  document.getElementById("stat-name").textContent = myDog.name;
  document.getElementById("stat-breed").textContent = myDog.breed;
  document.getElementById("stat-day").textContent = myDog.day;
  document.getElementById("stat-stage").textContent = getGrowthStage(myDog.day);
  document.getElementById("stat-happiness").textContent = myDog.happiness;

  // Update the visual happiness bar width to match happiness.
  document.getElementById("happiness-fill").style.width =
    myDog.happiness + "%";
}

// Read the form, validate the name, and adopt a new dog.
function adoptDog(event) {
  // Stop the form from submitting and reloading the page.
  event.preventDefault();

  // Read the chosen breed and the typed name.
  var breed = document.getElementById("breed-select").value;
  var nameInput = document.getElementById("dog-name");
  var errorPara = document.getElementById("name-error");

  // Trim leading and trailing spaces. Spaces inside are kept.
  var name = nameInput.value.trim();

  // Validate: name must not be empty after trimming.
  if (name === "") {
    errorPara.textContent = "Please enter a name for your dog.";
    return; // stop here — do not adopt
  }

  // Validate: name must be 20 characters or fewer.
  if (name.length > 20) {
    errorPara.textContent = "Name must be 20 characters or fewer.";
    return;
  }

  // Name is valid — clear any previous error message.
  errorPara.textContent = "";

  // Create the new dog object.
  // Every dog starts on Day 1, as a Puppy, with happiness 50.
  myDog = {
    name: name,
    breed: breed,
    day: 1,
    happiness: 50
  };

  // Show the dog on the page.
  updateDogDisplay();

  // Clear the name input for next time.
  nameInput.value = "";
}

// Feed the dog: happiness goes up by 10, but never above 100.
function feedDog() {
  myDog.happiness = myDog.happiness + 10;
  if (myDog.happiness > 100) {
    myDog.happiness = 100;
  }
  updateDogDisplay();
}

// Play with the dog: happiness goes up by 10, but never above 100.
function playWithDog() {
  myDog.happiness = myDog.happiness + 10;
  if (myDog.happiness > 100) {
    myDog.happiness = 100;
  }
  updateDogDisplay();
}


// --------------------------------------------------
//  Set up all event listeners once the page is ready
// --------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

  // --- Encyclopedia care-tips toggle (original) ---
  var buttons = document.querySelectorAll(".toggle-btn");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      var tipsPanel = this.previousElementSibling;
      tipsPanel.classList.toggle("visible");

      if (tipsPanel.classList.contains("visible")) {
        this.textContent = "Hide care tips";
        this.setAttribute("aria-expanded", "true");
      } else {
        this.textContent = "Show care tips";
        this.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- My Virtual Dog listeners ---
  // When the adoption form is submitted, run adoptDog.
  document.getElementById("adopt-form")
    .addEventListener("submit", adoptDog);

  // Feed and Play buttons call their functions.
  document.getElementById("feed-btn")
    .addEventListener("click", feedDog);

  document.getElementById("play-btn")
    .addEventListener("click", playWithDog);

});
