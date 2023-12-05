let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const file= require("fs");

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
}

//login and redirect to homepage
function updateLoginLogoutButton() {
  const loginLogoutButton = document.getElementById('loginLogoutButton');

  if (localStorage.getItem('isLoggedIn')) {
    //logged in
    loginLogoutButton.textContent = 'Logout';
    loginLogoutButton.onclick = logout;
  }
  else {
    //not logged in
    loginLogoutButton.textContent = 'Login';
    loginLogoutButton.onclick = null; // Remove any old attached click
  }
}

function logout(e) {
  e.preventDefault();
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userType');
  window.location.href = 'index.html';
}

function creatAccount() {

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  //make sure the fields aren't empty
  if (username == "" || password == "") {
    alert("Please input a username and password to create your account.")
  }
  //get the json data
  fetch('data/login.json')
      .then(response => response.json())
      .then(data => {
        if (data) {
          for (let i = 0; i < data.users.length; i++) {
            //check for dupe username
            if (data.users[i].userName.toLowerCase() === username.toLowerCase()) {
              alert("Username already exists, Please pick another username.")
            }
            else {

              let userDataRaw = file.readFileSync("data/login.json", "utf-8");
              let userDataParsed = JSON.parse(userDataRaw)
              console.log("testttttttttttttttttttt");
              //create the new user object
              let user = {

                    "userName": username,
                    "password": password,
                    "type": "user"
              }
              userDataParsed.push(user);
              userDataRaw.stringify();
              file.writeFileSync("data/login.json", userDataRaw, "utf-8");
            }
          }
          // Redirect back to  homepage
          window.location.href = 'index.html';
        }
        else {
          //alert an error if data isn't loaded
          alert("Error");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error logging in');
      });



}
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace with backendAPI when done
  fetch('data/login.json')
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
          window.location.href = 'index.html';
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

function login() {

}