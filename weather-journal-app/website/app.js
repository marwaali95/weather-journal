/* Global Variables */
const temp=80;
let baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "e43174f8234c7b58ed026e7cbe521945&units=imperial";
let zipCode = document.getElementById('zip').value;
document.getElementById('generate').addEventListener('click',performAction);
// TODO-Call the chained function
function performAction(e){
  const feelings = document.getElementById("feelings").value;
  console.log(feelings);
    // Create a new date instance dynamically with JS
  let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);
  //API Call
  /// #1 temperature promise is  resolved now
  getTemp(baseUrl,zipCode,apiKey)
.then(function(temp){
postData('/weather',{temperature: temp,TodayDate:newDate,feel:feelings})
updateUi()
})
}
const getTemp = async(baseUrl,zipCode,apiKey)=>{
  ////Fetch BaseURL concateneted with zipcode and API Key
  //#2 Use ApiKey Variable
  const res = await fetch("https://api.openweathermap.org/data/2.5/weather?zip="+document.getElementById('zip').value+"&appid="+apiKey);

  try{
      const tempdata = await res.json();
      const temperature=tempdata["main"].temp;
      console.log(tempdata);
      console.log(temperature);
      return temperature;
    
  }catch(error){
      console.log("Error!:",console.error());
      alert(console.error());

  }
}

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json',
    
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

// Async GET
const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData);
  return allData;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
////////////////////////// updateUi function 
/////// #3 innerHTML
  
const updateUi = async() =>{
  const request = await fetch("/allData") 
  try{
    const allData = await request.json()
    console.log(allData);
    document.getElementsByClassName("title").innerHTML = "Here is Our new Data";
    document.getElementById("date").innerHTML = allData.myDate;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = allData.feel;
  }catch(error){
    console.log("Error!", error);
  }
}