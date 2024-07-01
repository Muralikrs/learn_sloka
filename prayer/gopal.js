let currentPrayer = "कुन्त्युस्तुति"; 
let currentIndex = 0;
let baseFontSize = 5; 
let currentSegment = "श्रीमद्भागवतम्"; 

function displayVerse(prayer, index) {
    const verseElement = document.getElementById("verse");
    if (verses[currentSegment] && verses[currentSegment][prayer]) {
        verseElement.innerHTML = verses[currentSegment][prayer][index];
    } else {
        verseElement.innerHTML = ""; // Clear if no verse is found
    }
    adjustFontSize();
}

function showNextVerse() {
    if (verses[currentSegment] && verses[currentSegment][currentPrayer] && currentIndex < verses[currentSegment][currentPrayer].length - 1) {
        currentIndex++;

    } else {
        currentIndex = 0; 

    }
    stopAudio()
    displayVerse(currentPrayer, currentIndex);
}

function showPreviousVerse() {
    if (verses[currentSegment] && verses[currentSegment][currentPrayer] && currentIndex > 0) {
        currentIndex--;


    } else {
        currentIndex = verses[currentSegment][currentPrayer].length - 1;

    }
    stopAudio()
    displayVerse(currentPrayer, currentIndex);
}

function toggleDropdown() {
    const dropdown = document.getElementById("optionDropdown");
    dropdown.classList.toggle("active");
    adjustDropdownPosition();
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
    adjustDropdownPosition(); // Adjust position after showing sub-dropdown
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

function adjustDropdownPosition() {
    const headerRect = document.querySelector('.header').getBoundingClientRect();
    const dropdown = document.getElementById("optionDropdown");
    const subDropdown = document.getElementById("subOptionDropdown");

    dropdown.style.top = `${headerRect.bottom}px`;
    subDropdown.style.top = `${headerRect.bottom}px`;

    // Check if dropdown goes off screen and adjust position
    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (dropdownRect.bottom > viewportHeight) {
        dropdown.style.top = `${headerRect.top - dropdownRect.height}px`;
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



let startX = null;
let startY = null;

document.getElementById("verseContainer").addEventListener("touchstart", function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.getElementById("verseContainer").addEventListener("touchend", function(event) {
    if (!startX || !startY) {
        return;
    }

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const diffX = startX - endX;
    const diffY = startY - endY;

    // Determine swipe direction based on horizontal and vertical distance
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe detected
        if (diffX > 0) {
            // Swipe left
            showNextVerse();

        } else {
            // Swipe right
            showPreviousVerse();

        }
    }

    // Reset start coordinates
    startX = null;
    startY = null;
});

function getAudio() {
    let audioAddress = `./audio/${currentPrayer}/name.mp4`;

    try {
        const audioFileExists = true;

   
        
        if(currentIndex > 1)

        audioAddress = `./audio/${currentPrayer}/${currentIndex-1}.mp3`;

    } catch (error) {
    }

    return audioAddress;
}

document.body.addEventListener('click', function() {
    
    if(currentIndex>1)
    playAudio(getAudio())
});
let isAudioPlaying = false;
let currentAudio = null;

function playAudio(audioAddress) {
    if (isAudioPlaying && currentAudio) {
        return; // If an audio is already playing, ignore the new request
    }

    currentAudio = new Audio(audioAddress);
    
    currentAudio.addEventListener('playing', () => {
        isAudioPlaying = true;
    });

    currentAudio.addEventListener('ended', () => {
        isAudioPlaying = false;
        currentAudio = null;
    });

    currentAudio.addEventListener('pause', () => {
        isAudioPlaying = false;
    });

    currentAudio.play().catch(error => {
        isAudioPlaying = false;
        currentAudio = null;
    });
}
function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset to the beginning
        isAudioPlaying = false;
        currentAudio = null;
    }
}

