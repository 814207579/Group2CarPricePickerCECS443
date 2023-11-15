document.addEventListener('DOMContentLoaded', function() {
    let allCars = [];

    // Fetch and display cars
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        allCars = data;
        displayCars(allCars);
    })
    .catch(error => console.error('Error:', error));

    // Search functionality
    document.querySelector('.search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const searchTerm = document.getElementById('carInput').value.toLowerCase();
        const filteredCars = allCars.filter(car => car.title.toLowerCase().includes(searchTerm));
        displayCars(filteredCars);
    });
});

function displayCars(cars) {
    const carListings = document.getElementById('car-listings');
    carListings.innerHTML = ''; // Clear previous listings
    cars.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.className = 'car';
        carDiv.innerHTML = `
            <img src="${car.image}" alt="${car.title}">
            <h3>${car.title}</h3>
            <p>${car.description}</p>
        `;
        carListings.appendChild(carDiv);
    });
}