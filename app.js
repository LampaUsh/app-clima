
document.getElementById('cuerpo').style.visibility = "hidden"; // hide
let temperaturaValor = document.getElementById('temperatura-valor')
let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

let fechaActual = document.getElementById('fecha')
let iconoAnimado = document.getElementById('icono-animado')

let vientoVelocidad = document.getElementById('viento-velocidad')

let temp1 = document.getElementById('temp1')


let latitud = '-54.81';
//let url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitud + '&longitude=-68.32&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&past_days=7'
//  const url = 'https://api.open-meteo.com/v1/forecast?latitude=-38.72&longitude=-62.27&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo&past_days=7'


let ciudades=['La Plata','San Fernando del Valle de Catamarca','Resistencia','Rawson','Córdoba','Corrientes','Paraná','Formosa','San Salvador de Jujuy','Santa Rosa','La Rioja','Mendoza','Posadas','Neuquén','Viedma','Salta','San Juan','San Luis','Río Gallegos','Santa Fe','Santiago del Estero','Ushuaia','San Miguel de Tucumán'];
let latitudes=[-34.92,-28.47,-27.46,-43.30,-31.41,-27.47,-31.73,-26.18,-24.19,-36.62,-29.41,-32.89,-27.37,-38.95,-40.81,-24.79,-31.54,-33.30,-51.62,-31.65,-27.80,-54.81,-26.82];
let longitudes=[-57.95,-65.79,-58.98,-65.10,-64.18,-58.83,-60.53,-58.17,-65.30,-64.28,-66.85,-68.83,-55.90,-68.06,-63.00,-65.41,-68.54,-66.34,-69.22,-60.71,-64.26,-68.32,-65.22];
console.log(ciudades.length);
console.log(latitudes.length);
console.log(longitudes.length);
const combo = document.querySelector(".dropdown-menu"); // <div class="info"></div>

let sumado=''
for (let index = 0; index < ciudades.length; index++) {

  let gaspi='<a class="dropdown-item" onclick="verClima('+index+')">'+ciudades[index]+'</a>';

  sumado = sumado + gaspi;

 
}

combo.innerHTML = sumado;

combo.innerHTML; // "<strong>Importante</strong>"


//console.log(url)














function temporar(params) {
  console.log('gato paralitico')

  let tiempo = 'src=".//animated/day.svg"';

  if (params > 0 && params < 2) {
    tiempo = 'src=".//animated/rainy-2.svg"';
  }

  if (params >= 2 && params < 15) {
    tiempo = 'src=".//animated/rainy-7.svg"';
  }



  if (params >= 15) {
    tiempo = 'src=".//animated/thunder.svg"';
  }


  return tiempo;
}

function conversorfecha(params) {
  let fecha2 = new Date(params);
  let dia = fecha2.toString();



  let retorno = dia.substring(0, 3);

  if (dia.substring(0, 3) == 'Sat') {
    retorno = 'Sábado';
  }

  if (dia.substring(0, 3) == 'Sun') {
    retorno = 'Domingo';
  }

  if (dia.substring(0, 3) == 'Mon') {
    retorno = 'Lunes';
  }

  if (dia.substring(0, 3) == 'Tue') {
    retorno = 'Martes';
  }


  if (dia.substring(0, 3) == 'Wed') {
    retorno = 'Miércoles';
  }

  if (dia.substring(0, 3) == 'Thu') {
    retorno = 'Jueves';
  }

  if (dia.substring(0, 3) == 'Fri') {
    retorno = 'Viernes';
  }


  let retornar = retorno + ' ' + params.substring(8, 10) + '/' + params.substring(5, 7) + '/' + params.substring(0, 4);




  return retornar;
}



function verClima(index) {

  document.getElementById("cuerpo").style.visibility = "visible"; // show

  const ciuda = document.querySelector(".ciudad"); // <div class="info"></div>

let ciud='<h1>'+ciudades[index]+' </h1>';


ciuda.innerHTML = ciud;

ciuda.innerHTML;

  
  url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitudes[index] + '&longitude='+longitudes[index]+'&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&past_days=7'


  let fecha = new Date();
  let dia = fecha.toISOString();


  let hora = dia.substring(11, 13)


  let rowI;

  let th1;
  let th2;

  let th3;
  let th4;

  let th5;
  let th6;


  let rowF;

  let suma = '';
  







  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {





      let n1 = 24*7


      let numerillo= parseInt (n1)+ parseInt (hora);
      console.log(numerillo)


      let fechahoraarray = []
      let fechhsarray = data.hourly.time;

      




      //DEVUELVE ARRAY DE TEMPERATURA TERMICA
      let temperaturarray = []
      let temparray = data.hourly.temperature_2m;
      for (item of temparray) {
        temperaturarray.push(item);
      }

      // console.log(temperaturarray);


      temperaturaValor.textContent = temparray[numerillo];
      
      let velocidadvientoarray = []
      let velvienarray = data.hourly.windspeed_10m;
      for (item of velvienarray) {
        velocidadvientoarray.push(item);
      }
      //   console.log(velocidadvientoarray);
      vientovelocidad.textContent = velocidadvientoarray[numerillo];


      //DEVUELVE ARRAY DE PRECIPITACIONES
      let precipitacionarray = []
      let preciarray = data.hourly.precipitation;
      for (item of preciarray) {
        precipitacionarray.push(item);
      }
      // console.log(precipitacionarray);
      preci.textContent = precipitacionarray[numerillo];
    

      const tiempo = document.querySelector(".icono-animado"); // <div class="info"></div>


      let icon = temporar(precipitacionarray[numerillo]);
      let tempo='<img ' + icon + ' alt="" height="200px" width="200px"></img>' + '</td>';


      tiempo.innerHTML = tempo;

      tiempo.innerHTML;











      let sensaciontermicarray = []
      let sencterarray = data.hourly.apparent_temperature;
      for (item of sencterarray) {
        sensaciontermicarray.push(item);
      }
      //  console.log(sensaciontermicarray);
      termica.textContent = sensaciontermicarray[numerillo];
      
     
      fechaActual.textContent =conversorfecha( fechhsarray[numerillo]);

      const tr = document.querySelector(".info"); // <div class="info"></div>

      

      let n = parseInt (n1)+ parseInt (hora);
      for (let index = 0; index < 7; index++) {


        let icono = temporar(precipitacionarray[n]);
        
        rowI = '<tr>';

        th1 = '<td>' + conversorfecha(fechhsarray[n]) + '</td>';
        th2 = '<td>' + '<img id="icono-animado.jpg" ' + icono + ' alt="" height="50px" width="50px"></img>' + '</td>';

        th3 = '<td " >' + temparray[n] + '°C</td> ';
        th4 = '<td ">' + velocidadvientoarray[n] + '</td>';

        th5 = '<td >' + sensaciontermicarray[n] + '°C</td>';
        th6 = '<td >' + precipitacionarray[n] + 'mm/h</td>';


        rowF = '</tr>';
        suma = suma + rowI + th1 + th2 + th3 + th4 + th5 + th6 + rowF;

        n = n + 24;
      }

      tr.innerHTML = suma;

      tr.innerHTML; // "<strong>Importante</strong>"





    })
    .catch(error => {
      console.log(error)
    })



}


//}
//})