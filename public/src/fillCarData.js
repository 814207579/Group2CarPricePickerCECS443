function fillCarData() {
    const parentSlider = document.getElementById("topCarSwiper");

    // Clear existing content before filling in new data
    parentSlider.innerHTML = '';
    // Replace with backendAPI when done
    fetch("public/data/CarData.json")
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Loop through the JSON data and create HTML for each car
                console.log(data.cars)
                for(let i = 0; i < data.cars.length; i++) {
                    //update slider
                    const carSlide = document.createElement('div');
                    carSlide.classList.add('swiper-slide', 'box');

                    carSlide.innerHTML = `
                        <div class='swiper-slide box'>
                            <img src='${data.cars[i].image}' alt='car'>
                            <div class='content'>
                            <h2>${data.cars[i].make.replace("_", " ")}</h2>
                            <h3>${data.cars[i].model.replace("_", " ")}</h3>
                            <div class='price'> <span>price : </span> $ ${data.cars[i].price}</div>
                            <p>
                            <span class='fas fa-circle'></span> used
                            <span class='fas fa-circle'></span> ${data.cars[i].model_year}
                            <span class='fas fa-circle'></span> ${data.cars[i].mileage} miles
                            </p>
                            <a target="_blank" href='https://www.cars.com/shopping/results/?stock_type=all&makes%5B%5D=${data.cars[i].make}&models%5B%5D=${data.cars[i].make + "-" + data.cars[i].model}&maximum_distance=30&zip=90804' class='btn'>check out</a>
                            </div>
                            </div>
                        `;

                    parentSlider.appendChild(carSlide);
                }

                //
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
}

fillCarData()