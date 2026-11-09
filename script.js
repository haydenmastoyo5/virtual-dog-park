// ====================================================
//  Virtual Dog Park — script.js
//  Vanilla JavaScript, no libraries or frameworks.
//
//  Features:
//   1. Encyclopedia care-tips toggle (original)
//   2. "My Virtual Dog" adoption and care
//   3. Next Day growth + localStorage save/restore
//   4. Start Over (with confirmation)
// ====================================================


// --------------------------------------------------
//  Part A — "My Virtual Dog" data and helpers
// --------------------------------------------------

// The storage key used for localStorage.
// All saved dog data is stored under this single key.
var STORAGE_KEY = "virtualDogParkPetV1";

// This variable holds the visitor's adopted dog.
// It is null until they adopt one (or restore from storage).
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

// Return the growth stage NAME based on the day number.
//   Day 1        = "Puppy"
//   Days 2 and 3 = "Young Dog"
//   Day 4+       = "Adult Dog"
function getGrowthStage(day) {
  if (day === 1) {
    return "Puppy";
  } else if (day <= 3) {
    return "Young Dog";
  } else {
    return "Adult Dog";
  }
}

// Return a CSS class name that controls the illustration size.
//   Puppy     -> "growth-puppy"   (smallest image)
//   Young Dog -> "growth-young"   (medium image)
//   Adult Dog -> "growth-adult"   (largest image)
function getGrowthClass(day) {
  if (day === 1) {
    return "growth-puppy";
  } else if (day <= 3) {
    return "growth-young";
  } else {
    return "growth-adult";
  }
}

// Return a percentage (0-100) for the growth bar.
//   Day 1   -> 33%
//   Day 2   -> 50%
//   Day 3   -> 66%
//   Day 4+  -> 100%
function getGrowthPercent(day) {
  if (day === 1) {
    return 33;
  } else if (day === 2) {
    return 50;
  } else if (day === 3) {
    return 66;
  } else {
    return 100;
  }
}


// --------------------------------------------------
//  Part B — localStorage save and restore
// --------------------------------------------------

// Save the current dog to the browser's localStorage.
// The data is stored as a JSON string under STORAGE_KEY.
// This runs after adoption and after every Feed, Play,
// or Next Day action so progress is never lost.
function saveDog() {
  // Only save if a dog has actually been adopted.
  if (myDog !== null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myDog));
  }
}

// Try to load a previously saved dog from localStorage.
// If found, restore it into the myDog variable and update
// the page. This runs once when the page loads so the dog
// survives a refresh.
function loadDog() {
  var saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    // Parse the JSON string back into a JavaScript object.
    myDog = JSON.parse(saved);
    // Show the restored dog on the page.
    updateDogDisplay();
  }
}


// --------------------------------------------------
//  Part C — Display update
// --------------------------------------------------

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

  // Update the illustration SIZE based on growth stage.
  // Remove old growth classes, then add the current one.
  img.classList.remove("growth-puppy", "growth-young", "growth-adult");
  img.classList.add(getGrowthClass(myDog.day));

  // Fill in each stat using textContent — safe text insertion.
  document.getElementById("stat-name").textContent = myDog.name;
  document.getElementById("stat-breed").textContent = myDog.breed;
  document.getElementById("stat-day").textContent = myDog.day;
  // Growth stage is shown as TEXT here, not only by color or size.
  document.getElementById("stat-stage").textContent = getGrowthStage(myDog.day);
  document.getElementById("stat-happiness").textContent = myDog.happiness;

  // Update the visual happiness bar width to match happiness.
  document.getElementById("happiness-fill").style.width =
    myDog.happiness + "%";

  // Update the visual growth bar width.
  document.getElementById("growth-fill").style.width =
    getGrowthPercent(myDog.day) + "%";
}


// --------------------------------------------------
//  Part D — Adoption and care actions
// --------------------------------------------------

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

  // Save immediately so progress survives a refresh.
  saveDog();

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
  saveDog();
}

// Play with the dog: happiness goes up by 10, but never above 100.
function playWithDog() {
  myDog.happiness = myDog.happiness + 10;
  if (myDog.happiness > 100) {
    myDog.happiness = 100;
  }
  updateDogDisplay();
  saveDog();
}

// Advance to the next day.
// Day increases by 1. Happiness drops by 5 but never below 0.
// The growth stage may change (Puppy -> Young Dog -> Adult Dog).
function nextDay() {
  myDog.day = myDog.day + 1;

  myDog.happiness = myDog.happiness - 5;
  if (myDog.happiness < 0) {
    myDog.happiness = 0;
  }

  updateDogDisplay();
  saveDog();
}

// Start Over: ask for confirmation, then delete saved progress
// and return to the adoption form. If the visitor cancels the
// confirmation, the dog is kept and nothing changes.
function startOver() {
  // confirm() opens a browser dialog with OK and Cancel buttons.
  // It returns true for OK, false for Cancel.
  var confirmed = confirm(
    "Are you sure you want to start over? This will permanently " +
    "delete your current dog and all progress."
  );

  // If the visitor clicked Cancel, do nothing — keep the dog.
  if (confirmed === false) {
    return;
  }

  // The visitor confirmed — delete the saved dog from storage.
  localStorage.removeItem(STORAGE_KEY);

  // Clear the in-memory dog variable.
  myDog = null;

  // Hide the status panel and show the adoption form again.
  document.getElementById("dog-status").hidden = true;

  // Clear any leftover error message.
  document.getElementById("name-error").textContent = "";
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

  // Adoption form: run adoptDog when submitted.
  document.getElementById("adopt-form")
    .addEventListener("submit", adoptDog);

  // Feed, Play, and Next Day buttons.
  document.getElementById("feed-btn")
    .addEventListener("click", feedDog);

  document.getElementById("play-btn")
    .addEventListener("click", playWithDog);

  document.getElementById("next-day-btn")
    .addEventListener("click", nextDay);

  // Start Over button.
  document.getElementById("start-over-btn")
    .addEventListener("click", startOver);

  // --- Restore saved dog on page load ---
  // This runs immediately after the page is ready. If a dog
  // was saved in localStorage (from a previous visit), it
  // is loaded and displayed automatically.
  loadDog();

});
