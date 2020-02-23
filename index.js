let valor1 = document.getElementById("valorCarga1");
let x1 = document.getElementById("posicionCarga1x");
let y1 = document.getElementById("posicionCarga1y");

let valor2 = document.getElementById("valorCarga2");
let x2 = document.getElementById("posicionCarga2x");
let y2 = document.getElementById("posicionCarga2y");

let valor3 = document.getElementById("valorCarga3");
let x3 = document.getElementById("posicionCarga3x");
let y3 = document.getElementById("posicionCarga3y");

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

const k = 9000000000;

const leerValores = () => {
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
}

const calcular = () => {
  console.log("Click");
  leerValores();
  let unitarioi1 = vx1 / magnitud(vx1, vy1);
  let unitarioj1 = vy1 / magnitud(vx1, vy1);

  let unitarioi2 = vx2 / magnitud(vx2, vy2);
  let unitarioj2 = vy2 / magnitud(vx2, vy2);

  let unitarioi3 = vx3 / magnitud(vx3, vy3);
  let unitarioj3 = vy3 / magnitud(vx3, vy3);

  let fuerza12 = (k * vvalor1 * vvalor2) / Math.pow(distancia(vx1, vy1, vx2, vy2),2);
  let fuerza23 = (k * vvalor1 * vvalor2) / Math.pow(distancia(vx2, vy2, vx3, vy3),2);
  let fuerza13 = (k * vvalor1 * vvalor2) / Math.pow(distancia(vx1, vy1, vx3, vy3),2);

  let campo1 = (k*vvalor1)/Math.pow(distancia(vx1,vy1,vpx,vpy),2);
  let campo2 = (k*vvalor2)/Math.pow(distancia(vx2,vy2,vpx,vpy),2);
  let campo3 = (k*vvalor3)/Math.pow(distancia(vx3,vy3,vpx,vpy),2);


  document.getElementById("1-2").innerHTML = fuerza12.toExponential(2) + "N";
  document.getElementById("1-2x").innerHTML = "x: " + (fuerza12*unitarioi1).toExponential(2) + "N";
  document.getElementById("1-2y").innerHTML = "y: " + (fuerza12*unitarioj1).toExponential(2) + "N";

  document.getElementById("2-3").innerHTML = fuerza23.toExponential(2) + "N";
  document.getElementById("2-3x").innerHTML = "x: " + (fuerza23*unitarioi2).toExponential(2) + "N";
  document.getElementById("2-3y").innerHTML = "y: " + (fuerza23*unitarioj2).toExponential(2) + "N";

  document.getElementById("1-3").innerHTML = fuerza13.toExponential(2) + "N";
  document.getElementById("1-3x").innerHTML = "x: " + (fuerza13*unitarioi3).toExponential(2) + "N";
  document.getElementById("1-3y").innerHTML = "y: " + (fuerza13*unitarioj3).toExponential(2) + "N";
}

const magnitud = (x, y) => {
  return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
}

const distancia = (x1, y1, x2, y2) => {
  let x = x1 - x2;
  let y = y1 - y2;
  return magnitud(x, y);
}