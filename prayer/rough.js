let currentPrayer = "श्रीब्रह्मसंहिता"; 
let currentIndex = 0;
let baseFontSize = 5; 
let currentSegment = "श्रीमद्भागवतम्"; 





function displayVerse(prayer, index) {
    const verseElement = document.getElementById("verse");
    if (verses[currentSegment] && verses[currentSegment][prayer]) {
        verseElement.innerHTML = verses[currentSegment][prayer][index];
    } else {
    }
    adjustFontSize();
}

function showNextVerse() {
    if (verses[currentSegment] && verses[currentSegment][currentPrayer] && currentIndex < verses[currentSegment][currentPrayer].length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first verse
    }
    displayVerse(currentPrayer, currentIndex);
}

function showPreviousVerse() {
    if (verses[currentSegment] && verses[currentSegment][currentPrayer] && currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = verses[currentSegment][currentPrayer].length - 1; // Loop back to the last verse
    }
    displayVerse(currentPrayer, currentIndex);
}

function toggleDropdown() {
    const dropdown = document.getElementById("optionDropdown");
    dropdown.classList.toggle("active");
}

function closeDropdowns() {
    const dropdown = document.getElementById("optionDropdown");
    const subDropdown = document.getElementById("subOptionDropdown");

    if (dropdown.classList.contains("active") || subDropdown.classList.contains("active")) {
        dropdown.classList.remove("active");
        subDropdown.classList.remove("active");
        return false; // Return false if any dropdown was open and got closed
    }

    return true; // Return true if no dropdown was open
}


function showSubDropdown(segment) {
    const subDropdown = document.getElementById("subOptionDropdown");
    subDropdown.innerHTML = ''; // Clear existing items
    currentSegment = segment;
    
    for (let prayer in verses[segment]) {
        const dropdownItem = document.createElement('div');
        dropdownItem.className = 'dropdown-item';
        dropdownItem.textContent = prayer;
        dropdownItem.onclick = () => displayPrayer(prayer);
        subDropdown.appendChild(dropdownItem);
    }
    subDropdown.classList.add('active');
}

function displayPrayer(prayerName) {
    currentPrayer = prayerName;
    currentIndex = 0;
    displayVerse(currentPrayer, currentIndex);

    // Close dropdown after selection
    const dropdown = document.getElementById("optionDropdown");
    dropdown.classList.remove("active");
    const subDropdown = document.getElementById("subOptionDropdown");
    subDropdown.classList.remove("active");

    const headerText = document.getElementById("prayerHeading");
    headerText.textContent = prayerName; // Update heading text
}

function populateDropdown() {
    const dropdown = document.getElementById("optionDropdown");
    dropdown.innerHTML = ''; // Clear existing items

    // Add main categories dynamically
    for (let segment in verses) {
        const dropdownItem = document.createElement('div');
        dropdownItem.className = 'dropdown-item';
        dropdownItem.textContent = segment;
        dropdownItem.onclick = () => showSubDropdown(segment);
        dropdown.appendChild(dropdownItem);
    }
}

// Call populateDropdown on page load
document.addEventListener("DOMContentLoaded", function() {
    populateDropdown();
    displayVerse(currentPrayer, currentIndex); // Display the first verse of the initial prayer
    adjustFontSize(); // Adjust the font size initially
});

// Event listeners for navigating verses
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        showNextVerse();
    } else if (event.key === "ArrowLeft") {
        showPreviousVerse();
    }
});

// Adjust font size based on baseFontSize
function adjustFontSize() {
    const verseElement = document.getElementById("verse");
    verseElement.style.fontSize = `${baseFontSize}vh`;
}

// Increase font size
function increaseFontSize() {
    baseFontSize += 1; // Adjust the increment value as needed
    adjustFontSize();
}

// Decrease font size
function decreaseFontSize() {
    if (baseFontSize > 1) { // Ensure the font size does not go below a certain threshold
        baseFontSize -= 1; // Adjust the decrement value as needed
        adjustFontSize();
    }
}

document.getElementById("verseContainer").addEventListener("click", function(event) {
    const containerWidth = this.offsetWidth;
    const clickX = event.clientX - this.getBoundingClientRect().left;
    if(closeDropdowns())
    if (clickX > containerWidth / 2) {
        showNextVerse();
    } else {
        showPreviousVerse();
    }

});




/* Base styles */
body {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 1rem; /* Base font size */
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #F1D2A3;
}

/* Header styles */
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    background-color: #D39758;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#prayerHeading {
    font-size: calc(5vh - 10px); /* Adjust font size based on container height */
    font-weight: bold;
    color: #333;
    text-align: center;
    flex-grow: 1;
}

.font-buttons {
    display: flex;
    gap: 10px;
}

.font-buttons button {
    font-size: 1.5rem;
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    background: transparent;
    color: black;
    border-radius: 4px;
}

.option-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.option-dropdown {
    
    display: none;
    position: absolute;
    background: #D39758;
    border: 1px solid #f35b41;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.option-dropdown.active {
    margin-top: 3VH;

    display: block;
    right: 10px;
}

.dropdown-item {
    padding: 10px;
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: #f35b41;
    color: white;
}

/* Verse container */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 20px;
    text-align: center;
}

.verse {
    font-size: 5vh;
}

/* Responsive styles for smaller screens */
@media (max-width: 768px) {
    #prayerHeading {
        font-size: calc(4vh - 8px); /* Smaller font size for mobile */
    }

    .font-buttons {
        gap: 5px;
    }

    .font-buttons button {
        font-size: 1.2rem;
        padding: 3px 6px;
    }

    .option-button {
        font-size: 1.2rem;
    }

    .option-dropdown {
        top: calc(8% + 5px); /* Adjust position for mobile */
    }

    .dropdown-item {
        padding: 8px;
    }

    .verse {
        font-size: 4vh; /* Smaller font size for mobile */
    }
}

@media (max-width: 480px) {
    #prayerHeading {
        font-size: calc(3.5vh - 7px); /* Smaller font size for very small screens */
    }

    .font-buttons {
        gap: 3px;
    }

    .font-buttons button {
        font-size: 1rem;
        padding: 2px 4px;
    }

    .option-button {
        font-size: 1rem;
    }

    .option-dropdown {
        top: calc(8% + 3px); /* Adjust position for very small screens */
    }

    .dropdown-item {
        padding: 6px;
    }

    .verse {
        font-size: 3.5vh; /* Smaller font size for very small screens */
    }
}
/* Responsive styles for smaller screens */
@media (max-width: 768px) and (orientation: landscape) {
    #prayerHeading {
        font-size: 5vh ; /* Adjusted font size for landscape mobile */
    }

    .verse {
        font-size: 4vh; /* Adjusted font size for landscape mobile */
    }
    .option-dropdown {
        right: 0;
    }
    
}

@media (max-width: 480px) and (orientation: landscape) {
    #prayerHeading {
        font-size: calc(3.5vh - 7px); /* Adjusted font size for very small landscape screens */
    }
    .option-dropdown {
        right: 0;
    }
    .verse {
        font-size: 3.5vh; /* Adjusted font size for very small landscape screens */
    }
}





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Verses display page">
    <title>Verses Display</title>
    <link rel="stylesheet" href="gopal.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap" rel="stylesheet">
</head>
<body>
    <div class="header">
        <div class="font-buttons">
            <button onclick="increaseFontSize()">+</button>
            <button onclick="decreaseFontSize()">-</button>
           
        </div>
        <span id="prayerHeading">गोपाल सहस्त्रनाम</span>
        <button class="option-button" onclick="toggleDropdown()">&#8942;</button>
        <div class="option-dropdown" id="optionDropdown">
            <!-- Book names will be populated here -->
        </div>
        <div class="option-dropdown" id="subOptionDropdown"></div>
    </div>
    <div class="container" id="verseContainer">
        <div class="verse" id="verse"></div>
    </div>
    <script src="gopal.js"></script>
    <script src="data.js"></script>
</body>
</html>
