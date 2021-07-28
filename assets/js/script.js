var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#cityname');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
var getbutton =document.querySelector('.getwther')

getbutton.addEventListener('click', formSubmitHandler);

//Validate that there's input and save to storage
function formSubmitHandler(event) {
  event.preventDefault();

  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getlonglat(cityname);
    searched.push(cityname);
  console.log(searched);
  localStorage.setItem('searched',JSON.stringify(searched));
  displaysearched()
        
  } else {
    alert('Please enter a city name');
  }
};


//Fetch API or report Error
  //get longitude and lattitude from first API
function  getlonglat(parameter) {
   var apiUrl ='https://api.openweathermap.org/data/2.5/weather?q='+parameter+'&units=imperial&appid=f95a2d7df2bebcbcf7c3fe24b75a9859'

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          
          
          console.log(data)
          currentWeather(data)
          getweather(data.coord.lon,data.coord.lat)
         });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Openweathermap');
    });
};

// Use longitude and lattitude to get weather
function  getweather(long,lat) {
  var apiUrl ='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=alerts,hourly,minutely&units=imperial&appid=f95a2d7df2bebcbcf7c3fe24b75a9859'

 fetch(apiUrl)
   .then(function (response) {
     if (response.ok) {
       response.json().then(function (data) {
        console.log(data)
        futureWeather(data);
        })
        }
})}

//pull local storage 
searched =JSON.parse(localStorage.getItem('searched')) || []


displaysearched()


//display searched
function displaysearched() { 
  //remove children 
  $('#history').empty()
  

searched =JSON.parse(localStorage.getItem('searched')) || []

  for (let i = 0; i < searched.length; i++) {
          
      //create button elements and set innerText to the searched city
      var citybutton = '<button class="btn btncity" type="button">'+searched[i]+'</button>'
         

      //append the button to the list
      $('#history').append(citybutton)
        } }
     
        $('#historycnt').on('click', '.btncity', function(){
          getlonglat(this.textContent);
      });

      // Display current weather
function currentWeather( d ) {


  var date=moment(new Date(d.dt*1000)).format("MM/DD/YYYY");
	var temperature = Math.round(((parseFloat(d.main.temp))));
  var humidity = d.main.humidity; 
  var windspeed=d.wind.speed
  var iconic='<img src=https://openweathermap.org/img/wn/'+d.weather[0].icon+'@2x.png>'
  
	
  document.getElementById('location').innerHTML = d.name+ ' ' + date+' '+iconic;
  document.getElementById('temp').innerHTML = 'Temperature: '+ temperature + 'F&deg;';
	document.getElementById('humidity').innerHTML = 'Humidity: ' +humidity+'%';
  document.getElementById('windSpeed').innerHTML ='Wind Speed: '+windspeed +' MPH';
	
} 

//Display Forecast

function futureWeather(data) {
  $('#forecast').empty()
  $('#UVindex').empty()

//UV index and background
  var uvin =data.current.uvi
  
  $('#UVindex').append('<div>UV Index:</div><div>'+' '+uvin+'</div>')
  $('#UVindex').each(function(){
    if (parseInt(uvin) < 3)
    $('#UVindex div:nth-child(2)').addClass('green')
    else if (3<=uvin &&  uvin<=7)
    $('#UVindex div:nth-child(2)').addClass('amber')
    else if (parseInt(uvin)>=7)
    $('#UVindex div:nth-child(2)').addClass('red') 
    })

  // Display forecast cards
var  fcard = $('#forecast')


for (i=1;i<6; i++){
  
  var date=moment(new Date(data.daily[i].dt*1000)).format("MM/DD/YYYY");
	var temperature ='Temp: ' +Math.round(((parseFloat(data.daily[i].temp.day))))+ 'F&deg';
  var humidity ='Humidity: '+data.daily[i].humidity+'%'; 
  var iconic='<img src=http://openweathermap.org/img/wn/'+data.daily[i].weather[0].icon+'@2x.png>'
 
    
  var card='<div class=fcast><h2>'+date+'</h2> <div>'+temperature+'</div><div>'+humidity+'</div><div>'+iconic+'</div></div>'
      
 fcard.append(card)
   
}
}
  
 
