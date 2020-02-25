let valor1 = document.getElementById("valorCarga1");
let x1 = document.getElementById("posicionCarga1x");
let y1 = document.getElementById("posicionCarga1y");
let carga1 = document.getElementById("Positiva1");

let valor2 = document.getElementById("valorCarga2");
let x2 = document.getElementById("posicionCarga2x");
let y2 = document.getElementById("posicionCarga2y");
let carga2 = document.getElementById("Positiva2");

let valor3 = document.getElementById("valorCarga3");
let x3 = document.getElementById("posicionCarga3x");
let y3 = document.getElementById("posicionCarga3y");
let carga3 = document.getElementById("Positiva3");

let px = document.getElementById("posicionPuntox");
let py = document.getElementById("posicionPuntoy");

let vvalor1;
let vx1;
let vy1;
let vvalor2;
let vx2;
let vy2;
let vvalor3;
let vx3;
let vy3;
let vpy;
let vpx;
let vcarga1;
let vcarga2;
let vcarga3;
let cargasP = [];
let cargasN = [];
let punto;

const k = 9000000000;

const leerValores = () => {
  cargasP = [];
  cargasN = [];
  vvalor1 = valor1.value;
  vx1 = x1.value;
  vy1 = y1.value;
  vvalor2 = valor2.value;
  vx2 = x2.value;
  vy2 = y2.value;
  vvalor3 = valor3.value;
  vx3 = x3.value;
  vy3 = y3.value;
  vpx = px.value;
  vpy = py.value;
  vcarga1 = carga1.checked ? 'Positiva': 'Negativa';
  vcarga2 = carga2.checked ? 'Positiva': 'Negativa';
  vcarga3 = carga3.checked ? 'Positiva': 'Negativa';

  cargas = [
    {x:parseFloat(vx1), y:parseFloat(vy1), z:parseFloat(vvalor1), polaridad:vcarga1, name:"Carga 1", color:(vcarga1=='Negativa'?'blue':'red')},
    {x:parseFloat(vx2), y:parseFloat(vy2), z:parseFloat(vvalor2), polaridad:vcarga2, name:"Carga 2", color:(vcarga2=='Negativa'?'blue':'red')},
    {x:parseFloat(vx3), y:parseFloat(vy3), z:parseFloat(vvalor3), polaridad:vcarga3, name:"Carga 3", color:(vcarga3=='Negativa'?'blue':'red')},
  ];
  for(let i =0; i<cargas.length;i++){
    if(cargas[i].polaridad=='Positiva'){
      cargasP.push(cargas[i]);
    } else{
      cargasN.push(cargas[i]);
    }
  }
  punto = [
    {x:parseFloat(vpx), y:parseFloat(vpy), z:5, name: 'Punto', color:'green'}
  ];
};

const calcular = () => {
  if(chart!=null) chart.destroy();

  console.log("Click");
  leerValores();

  let unitarioi12 = unitarioi(vx1,vy1,vx2,vy2,vcarga1,vcarga2);
  let unitarioj12 = unitarioj(vx1,vy1,vx2,vy2,vcarga1,vcarga2);

  let unitarioi23 = unitarioi(vx2,vy2,vx3,vy3,vcarga2,vcarga3);
  let unitarioj23 = unitarioj(vx2,vy2,vx3,vy3,vcarga2,vcarga3);

  let unitarioi13 = unitarioi(vx1,vy1,vx3,vy3,vcarga1,vcarga3);
  let unitarioj13 = unitarioj(vx1,vy1,vx3,vy3,vcarga1,vcarga3);
  
  let fuerza12 = Math.abs((k * vvalor1 * vvalor2) / Math.pow(distancia(vx1, vy1, vx2, vy2),2));
  let fuerza23 = Math.abs((k * vvalor2 * vvalor3) / Math.pow(distancia(vx2, vy2, vx3, vy3),2));
  let fuerza13 = Math.abs((k * vvalor1 * vvalor3) / Math.pow(distancia(vx1, vy1, vx3, vy3),2));

  let campo1 = (k*vvalor1)/Math.pow(distancia(vx1,vy1,vpx,vpy),2);
  let campo2 = (k*vvalor2)/Math.pow(distancia(vx2,vy2,vpx,vpy),2);
  let campo3 = (k*vvalor3)/Math.pow(distancia(vx3,vy3,vpx,vpy),2);


  document.getElementById("1-2").innerHTML = fuerza12.toExponential(2) + "N";
  document.getElementById("1-2x").innerHTML = "x: " + (fuerza12*unitarioi12).toExponential(2) + "N";
  document.getElementById("1-2y").innerHTML = "y: " + (fuerza12*unitarioj12).toExponential(2) + "N";

  document.getElementById("2-3").innerHTML = fuerza23.toExponential(2) + "N";
  document.getElementById("2-3x").innerHTML = "x: " + (fuerza23*unitarioi23).toExponential(2) + "N";
  document.getElementById("2-3y").innerHTML = "y: " + (fuerza23*unitarioj23).toExponential(2) + "N";

  document.getElementById("1-3").innerHTML = fuerza13.toExponential(2) + "N";
  document.getElementById("1-3x").innerHTML = "x: " + (fuerza13*unitarioi13).toExponential(2) + "N";
  document.getElementById("1-3y").innerHTML = "y: " + (fuerza13*unitarioj13).toExponential(2) + "N";

  document.getElementById("campo").innerHTML =   sumatoriaCampos(campo1,campo2,campo3).toExponential(2) + "N/C";
  loadGraphic();
};

const magnitud = (x, y) => {
  return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
};

const sumatoriaCampos = (a, b, c) => {
  let ai = vx1 / distancia(vx1, vy1, vpx, vpy);
  let aj = vy1 / distancia(vx1, vy1, vpx, vpy);
  let bi = vx2 / distancia(vx2, vy2, vpx, vpy);
  let bj = vy2 / distancia(vx2, vy2, vpx, vpy);
  let ci = vx3 / distancia(vx3, vy3, vpx, vpy);
  let cj = vy3 / distancia(vx3, vy3, vpx, vpy);
  let x = ai + bi + ci;
  let y = aj + bj + cj;
  return magnitud(x,y);
};

const distancia = (x1, y1, x2, y2) => {
  let x = x1 - x2;
  let y = y1 - y2;
  return magnitud(x, y);
};

const unitarioi = (x1,y1, x2,y2, signo1,signo2) => {
  let bandera = 1;
  if(signo1 == signo2){
    bandera = -1;
  }
  let temp = (x2-x1) / magnitud((x2-x1), (y2-y1));
  console.log(temp);
  return (temp*bandera);
};

const unitarioj = (x1,y1, x2,y2, signo1,signo2) => {
  let bandera = 1;
  if(signo1 == signo2){
    bandera = -1;
  }
  let temp = (y2-y1) / magnitud((x2-x1), (y2-y1));
  return (temp*bandera);
};

var chart;

const loadGraphic = () => {
  chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{
      text: "Ubicacion de cargas"
    },
    axisX: {
      title:"X(m)"
    },
    axisY: {
      title:"Y(m)"
    },
    legend:{
      horizontalAlign: "center"
    },
    data: [{
      type: "bubble",
      showInLegend: true,
      name: "Positiva",
      legendMarkerType: "circle",
      legendMarkerColor: "red",
      toolTipContent: "<b>{name}</b><br/>Posicion X: {x} m<br/> Posicion Y: {y} m<br/> Magnitud: {z}C <br/> Polaridad: {polaridad}",
      dataPoints: cargasP
    },
    {
      type: "bubble",
      showInLegend: true,
      name: "Negativa",
      legendMarkerType: "circle",
      legendMarkerColor: "blue",
      toolTipContent: "<b>{name}</b><br/>Posicion X: {x} m<br/> Posicion Y: {y} m<br/> Magnitud: {z}C Polaridad: {polaridad}",
      dataPoints: cargasN
    },
    {
      type: "bubble",
      showInLegend: true,
      name: "Punto",
      legendMarkerType: "circle",
      legendMarkerColor: "green",
      toolTipContent: "<b>{name}</b><br/>Posicion X: {x} m<br/> Posicion Y: {y} m",
      dataPoints: punto
    }
  ]
  });
  chart.render();
  chart.legend.set("itemWidth", 80);
  chart.legend.set("horizontalAlign", "center");
  console.log(cargas);
};

