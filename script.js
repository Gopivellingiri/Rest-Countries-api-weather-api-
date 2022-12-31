var container = document.querySelector('.container')


function gettingHTML(res, i){
  var result = res[i]
  if(!result) return '';
  
  return `
  <div class="popup col-sm-12 col-lg-4">
  <ul>
    <h3 id="name"></h3>
    <li id="obj-id">Id :00</li>
    <li id="main">main : 00</li>
    <li id="description">Description : 00</li>
    <li id="icon">Icon : 00</li>
    <button class="btn btn-primary" type="button" onclick="closePopup()">Close</button>
  </ul>
</div>


  
  <div class="col-sm-12 col-lg-4">
  <div class="card-container">
  <div class="card header">
  <img id="image" src=${res[i].flags.png} alt="">
</div>
<div class="card-body">
   <h3 id="head">${res[i].name.common}</h3>
   <p id="capital">Capital: ${res[i].capital}</p>
   <p id="region">Region: ${res[i].region}</p>
   <p id="Country-code">Country Code:${res[i].cioc}</p>
   <p id="lat">latlng: ${res[i].latlng}</p>
   <button class="btn btn-primary btn-1" value="${res[i].latlng}" onclick="clickFun(this.value)">Click For Weather</button>
  </div>
</div>
</div>
`

}


function gettingData(){
  var URL = "https://restcountries.com/v3.1/all"
fetch(URL)
      .then((res)=>{
          return res.json()
      })
          .then((res)=>{
             var result =''
             for(var i =0; i <res.length; i++){
              if(i%3 == 0 && i !==0){
                result += `<div class="row">
                ${gettingHTML(res, i)}
                ${gettingHTML(res, i + 1)}
                ${gettingHTML(res, i + 2)}
                </div>`
              }
               container.innerHTML = result;
             }  

                  })
           
}
gettingData();

function clickFun(el){
  var latt = el.split(',').map(Number)
  const apiKey = "0fc9a38b73aa750d07a48f456d344ff7"
var weather = `https://api.openweathermap.org/data/2.5/weather?lat=${latt[0]}&lon=${latt[1]}&appid=${apiKey}`
      
fetch(weather)
.then((res1)=>{
  return res1.json()
})
    .then((res1)=>{
      // console.log(res1.name)
      var data = res1.weather[0]
      var data2 = res1.name
      console.log(data2)
      return outPut(data,data2)
    
    })
}


function outPut(data,data2){
  // console.log(data)
  document.querySelector('.popup').style.visibility = "visible"
  document.querySelector('#name').innerHTML=`<h3>${data2}</h3>`
  document.querySelector('#obj-id').innerHTML=`Id : ${data.id}`
  document.querySelector('#main').innerHTML=`main : ${data.main}`
  document.querySelector('#description').innerHTML=`Description : ${data.description}`
  document.querySelector('#icon').innerHTML=`<img src="http://openweathermap.org/img/wn/${data.icon}@2x.png">`
  // document.querySelector('button').innerHTML = `Click for countries`
}

function closePopup(){
  document.querySelector('.popup').style.visibility = "hidden"
}
