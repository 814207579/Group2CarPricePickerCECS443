let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
$(document).ready(function() {
    // Initialize the CarQuery object
    var carquery = new CarQuery();

    // Specify the base URL of the CarQuery API
    carquery.base_url = 'https://www.carqueryapi.com/api/0.3'; // Replace with the actual URL

    // Initialize the CarQuery API
    carquery.init();

    // Optionally, set to show only US models
    carquery.setFilters({ sold_in_us: true });

    // Initialize the year, make, model dropdowns
    carquery.initYearMakeModelTrim('car-years', 'car-makes', 'car-models', 'car-model-trims');

    // Function to update makes when a year is selected
    $('#car-years').change(function() {
        var selectedYear = $(this).val();
        $.getJSON(carquery.base_url + "?callback=?", { cmd: "getMakes", year: selectedYear }, function(data) {
            var makes = data.Makes;
            $('#car-makes').empty();
            $.each(makes, function(index, make) {
                $('#car-makes').append($('<option>', {
                    value: make.make_id,
                    text: make.make_display
                }));
            });
        });
    });

    // Additional functions to update models and display car details
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
});
