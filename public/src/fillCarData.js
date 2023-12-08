function fillCarData() {
    const parentSlider = document.getElementById("topCarSwiper");
    const featuredSlider = document.getElementById("featuredCars");

    // Clear existing content before filling in new data
    parentSlider.innerHTML = '';
    // Replace with backendAPI when done
    fetch("/public/data/CarData.json")
        .then(response => response.json())
        .then(data => {
            if (data) {
                //Loop through the JSON data and create HTML for each car
                for(let i = 0; i < data.cars.length; i++) {
                    //update slider
                    const carSlide = document.createElement('div');
                    carSlide.classList.add('swiper-slide', 'box');

                    carSlide.innerHTML = `
                        <img src='${data.cars[i].image}' alt='car'>
                        <div class='content'>
                            <h2>${data.cars[i].make.replace("_", " ")}</h2>
                            <h3>${data.cars[i].model.replace("_", " ")}</h3>
                            <a class="btn convert-button" data-price="${data.cars[i].price}" data-target="price${i}" data-currency="USD">change price</a>
                            <div class='price' id="price${i}">
                                <span>price : </span> $${data.cars[i].price}
                            </div>
                            <p>
                                <span class='fas fa-circle'></span> used
                                <span class='fas fa-circle'></span> ${data.cars[i].model_year}
                                <span class='fas fa-circle'></span> ${data.cars[i].mileage} miles
                            </p>
                            <a target="_blank" href='https://www.cars.com/shopping/results/?stock_type=all&makes%5B%5D=${data.cars[i].make}&models%5B%5D=${data.cars[i].make + "-" + data.cars[i].model}&maximum_distance=30&zip=90804' class='btn'>check out</a>
                        </div>
                        `;

                    parentSlider.appendChild(carSlide);
                }
            }

        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error Loading Car Data');
        });






    var swiper = new Swiper(".vehicles-slider", {
        grabCursor: true,
        centeredSlides: true,
        spaceBetween: 20,
        loop:true,
        autoplay: {
            delay: 9500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable:true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Clear existing content before filling in new data
    featuredSlider.innerHTML = '';
    // Replace with backendAPI when done
    fetch("/public/data/CarData.json")
        .then(response => response.json())
        .then(data => {
            if (data) {
                //Loop through the JSON data and create HTML for each car
                for(let i = 0; i < 3; i++) {
                    //pick 3 random cars
                    let currentRandomCar = data.cars[Math.floor(Math.random() * 20)]
                    //update slider
                    const carSlide = document.createElement('div');
                    carSlide.classList.add('swiper-slide', 'box');

                    carSlide.innerHTML = `
                        <img src="${currentRandomCar.image}" alt="">
                        <div class="content">
                            <h2>${currentRandomCar.make.replace("_", " ")}</h2>
                            <h3>${currentRandomCar.model.replace("_", " ")}</h3>
                            <div class="price">$${currentRandomCar.price}</div>
                            <a target="_blank" href="https://www.cars.com/shopping/results/?stock_type=all&makes%5B%5D=${currentRandomCar.make}&models%5B%5D=${currentRandomCar.make + "-" + currentRandomCar.model}&maximum_distance=30&zip=90804" class="btn">check out</a>
                        </div>
                        `;

                    featuredSlider.appendChild(carSlide);
                }
            }

        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error Loading Car Data');
        });

    //update
    var swiper = new Swiper(".featured-slider", {
        grabCursor: true,
        centeredSlides: true,
        spaceBetween: 20,
        loop:true,
        autoplay: {
            delay: 9500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable:true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}


fillCarData()