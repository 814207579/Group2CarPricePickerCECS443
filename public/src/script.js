let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');


function fetchAndDisplayCars() {
  const apiUrl = 'https://www.carqueryapi.com/api/0.3/?cmd=getMakes'; // Replace with actual API URL

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          displayCars(data.Makes); // Assuming 'Makes' is the array of car data
      })
      .catch(error => {
          console.error('Error fetching car data:', error);
      });
}

function displayCars(cars) {
  const carsSection = document.getElementById('cars-section') || document.body; 
  carsSection.innerHTML = ''; // Clear previous content

  cars.forEach(car => {
      const carElement = document.createElement('div');
      carElement.innerHTML = `Make: ${car.make_display}, Country: ${car.make_country}`;
      carsSection.appendChild(carElement);
  });
}
menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

document.querySelector('#login-btn').onclick = () =>{
  document.querySelector('.login-form-container').classList.toggle('active');
}

document.querySelector('#close-login-form').onclick = () =>{
  document.querySelector('.login-form-container').classList.remove('active');
}

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 0){
    document.querySelector('.header').classList.add('active');
  }else{
    document.querySelector('.header').classList.remove('active');
  };

};

document.querySelector('.home').onmousemove = (e) =>{

  document.querySelectorAll('.home-parallax').forEach(elm =>{

    let speed = elm.getAttribute('data-speed');

    let x = (window.innerWidth - e.pageX * speed) / 90;
    let y = (window.innerHeight - e.pageY * speed) / 90;

    elm.style.transform = `translateX(${y}px) translateY(${x}px)`;

  });

};


document.querySelector('.home').onmouseleave = (e) =>{

  document.querySelectorAll('.home-parallax').forEach(elm =>{

    elm.style.transform = `translateX(0px) translateY(0px)`;

  });

};

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

var swiper = new Swiper(".review-slider", {
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


//Check if it's ready for login button change
document.addEventListener('readystatechange', checkDocumentReadyState);

//function for checking document state
function checkDocumentReadyState() {
  if (localStorage.getItem('isLoggedIn') === true && document.readyState === "complete" || document.readyState === "interactive") {
    updateLoginLogoutButton()
  }
  //fillCarData();
}

//login and redirect to homepage
function updateLoginLogoutButton() {
  const loginLogoutButton = document.getElementById('loginLogoutButton');
  const buttonContainer = loginLogoutButton.parentNode;

  // Remove existing 'Add Car' button if it exists
  const existingAddCarButton = document.getElementById('addCarButton');
  if (existingAddCarButton) {
      buttonContainer.removeChild(existingAddCarButton);
  }

  if (localStorage.getItem('isLoggedIn')) {
      // Logged in
      loginLogoutButton.textContent = 'Logout';
      loginLogoutButton.onclick = logout;

      // Create and add 'Add Car' button
      const addCarButton = document.createElement('button');
      addCarButton.textContent = 'Add Car';
      addCarButton.id = 'addCarButton';
      addCarButton.onclick = addCar; // Implement addCar function to handle the click event
      buttonContainer.insertBefore(addCarButton,loginLogoutButton);
  } else {
      // Not logged in
      loginLogoutButton.textContent = 'Login';
      loginLogoutButton.onclick = null; // Remove any old attached click
  }
}

function logout(e) {
  e.preventDefault();
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userType');
  window.location.href = '/';
}

function addCar(e) {
  e.stopPropagation(); // Prevents the event from bubbling up the DOM
  window.open('/public/component/input.html', 'Add Car', 'width=600,height=400');
  console.log("Add Car button clicked!");
}
document.addEventListener('DOMContentLoaded', function() {
  // Attach the event listener to the swiper-wrapper, which is static
  document.querySelector('.swiper-wrapper').addEventListener('click', function(event) {
      // Check if the clicked element is a convert-button
      if (event.target && event.target.classList.contains('convert-button')) {
          const button = event.target;
          const price = parseFloat(button.getAttribute('data-price'));
          const targetId = button.getAttribute('data-target');
          const currentCurrency = button.getAttribute('data-currency') || 'USD';

          if (currentCurrency === "USD") {
              convertToEuro(price, targetId, button);
          } else {
              convertToUSD(price, targetId, button);
          }
      }
  });
});

function convertToEuro(amount, targetId, button) {
  const usdToEuroRate = 0.88; // Sample conversion rate
  const convertedAmount = amount * usdToEuroRate;
  document.getElementById(targetId).innerHTML = `<span>price : </span> €${convertedAmount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits: 2})}/-`;
  button.setAttribute('data-currency', 'EURO');
}

function convertToUSD(amount, targetId, button) {
  document.getElementById(targetId).innerHTML = `<span>price : </span> $${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}/-`;
  button.setAttribute('data-currency', 'USD');
}



document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('public/data/login.json')
      .then(response => response.json())
      .then(data => {
        if (data) {
          //localStorage.setItem('authToken', data.token);
          let token = {};
          for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].userName.toLowerCase() === username.toLowerCase() && data.users[i].password === password) {
              //THIS IS NOT SECURE THIS SHOULD NOT BE DONE, ONLY DOING BECAUSE IT'S A PROJECT
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("userType", data.users[i].type)
              //break out if it gets logged in
              break;
            }
          }
          // Redirect back to  homepage
          window.location.href = '/';
        } else {
          // Handle login failure
          alert('Login failed!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error logging in');
      });
});

function changeValue(inputID, inputValue) {
  document.getElementById(inputID).value = inputValue;
}

