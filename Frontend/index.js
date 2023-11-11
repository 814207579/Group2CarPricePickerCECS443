// Function to display cars
function displayCars(cars) {
    const carList = document.getElementById('car-list');
    // Clear the list before adding new items
    carList.innerHTML = '';

    cars.forEach(car => {
        const carItem = document.createElement('div');
        carItem.classList.add('car-item');
        carItem.innerHTML = `
            <img src="${car.image}" alt="${car.make} ${car.model}">
            <h2>${car.make} ${car.model}</h2>
            <p><strong>Specs:</strong> ${car.specs}</p>
            <button onclick="checkAvailability('${car.model}')">Check Availability</button>
        `;
        carList.appendChild(carItem);
    });
}

// Function to handle availability check
function checkAvailability(model) {
    // Placeholder for functionality to check availability
    // Here you would probably want to make another API call
    alert('Checking availability for model: ' + model);
}

// Async function to fetch cars from the API
async function fetchCars() {
    try {
        const response = await fetch('https://your-api-endpoint/cars');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayCars(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch and display cars on page load
fetchCars();