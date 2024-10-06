// Exoplanet data
const exoplanetData = {
    "WASP-12b": {
        name: "WASP-12b",
        type: "hot",
        info: "WASP-12b is a hot Jupiter orbiting very close to its host star. Discovered in 2008, it's slowly being consumed by the star due to its intense proximity."
    },
    "Kepler-452b": {
        name: "Kepler-452b",
        type: "habitable",
        info: "Kepler-452b, often called 'Earth’s cousin,' orbits a star similar to our Sun and may have conditions that could support life."
    },
    "Proxima Centauri b": {
        name: "Proxima Centauri b",
        type: "cold",
        info: "Proxima Centauri b is the closest known exoplanet to Earth, orbiting just over 4 light-years away. It lies in the habitable zone of its star and might have liquid water."
    },
    "HD 209458b": {
        name: "HD 209458b",
        type: "hot",
        info: "HD 209458b is a hot Jupiter that orbits very close to its parent star, resulting in a high surface temperature."
    },
    "LHS 1140 b": {
        name: "LHS 1140 b",
        type: "habitable",
        info: "LHS 1140 b is a super-Earth exoplanet located in the habitable zone of its star and is considered a prime candidate for the search for life."
    },
    "Gliese 581g": {
        name: "Gliese 581g",
        type: "habitable",
        info: "Gliese 581g is a potentially habitable exoplanet located in the habitable zone of the red dwarf star Gliese 581."
    }
};

// Get references to DOM elements
const planets = document.querySelectorAll('.planet');
const orbits = document.querySelectorAll('.orbit');
const alertBox = document.getElementById('alert');
const alertMessage = document.getElementById('alert-message');
const closeAlertButton = document.getElementById('close-alert');

// Drag and drop functionality
planets.forEach(planet => {
    planet.addEventListener('dragstart', dragStart);
});

orbits.forEach(orbit => {
    orbit.addEventListener('dragover', dragOver);
    orbit.addEventListener('drop', drop);
});

// Close alert button functionality
closeAlertButton.addEventListener('click', () => {
    alertBox.classList.add('hidden');
    alertBox.style.display = 'none'; // Hide the alert box
});

// Dragging event handlers
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

// Show alert message
function showAlert(message) {
    console.log("showAlert called with message:", message); // For debugging
    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');
    alertBox.style.display = 'block'; // Ensure the alert box is shown
}

function drop(event) {
    event.preventDefault();
    const planetId = event.dataTransfer.getData('text/plain');
    const planet = document.getElementById(planetId);
    const orbitType = event.target.getAttribute('data-zone');
    const planetType = exoplanetData[planetId].type;

    // Check if the exoplanet belongs to one of the recognized zones
    if (planetType === orbitType) {
        event.target.appendChild(planet); // Place the planet in the correct orbit
        showAlert(`${exoplanetData[planetId].name} is correctly placed in the ${orbitType} orbit!`);
    } else if (['hot', 'cold', 'habitable'].includes(planetType)) {
        showAlert(`Oops! ${exoplanetData[planetId].name} does not belong in the ${orbitType} orbit.`);
    } else {
        showAlert(`Notice: ${exoplanetData[planetId].name} is not classified under hot, cold, or habitable zones.`);
    }
}
