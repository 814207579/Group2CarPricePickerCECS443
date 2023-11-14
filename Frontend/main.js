
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const carListings = document.getElementById('car-listings');
        data.forEach(car => {
            const carDiv = document.createElement('div');
            carDiv.className = 'car';
            carDiv.innerHTML = `
                <img src="${car.image}" alt="${car.title}">
                <h3>${car.title}</h3>
                <p>${car.description}</p>
            `;
            carListings.appendChild(carDiv);
        });
    })
    .catch(error => console.error('Error:', error));
});