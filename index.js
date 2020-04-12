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
let carga3 = document.getElementById("Positiva3")

let px = document.getElementById("posicionPuntox");
let py = document.getElementById("posicionPuntoy")

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
    {x:parseFloat(vpx), y:parseFloat(vpy), z:(0.8*Math.min(vvalor1,vvalor2,vvalor3)), name: 'Punto', color:'green'}
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

  let unitarioi21 = unitarioi(vx2,vy2,vx1,vy1,vcarga2,vcarga1);
  let unitarioj21 = unitarioj(vx2,vy2,vx1,vy1,vcarga2,vcarga1);

  let unitarioi32 = unitarioi(vx3,vy3,vx2,vy2,vcarga3,vcarga2);
  let unitarioj32 = unitarioj(vx3,vy3,vx2,vy2,vcarga3,vcarga2);

  let unitarioi31 = unitarioi(vx3,vy3,vx1,vy1,vcarga3,vcarga1);
  let unitarioj31 = unitarioj(vx3,vy3,vx1,vy1,vcarga3,vcarga1);


  let fuerza12 = Math.abs((k * vvalor1 * vvalor2) / Math.pow(distancia(vx1, vy1, vx2, vy2),2));
  let fuerza23 = Math.abs((k * vvalor2 * vvalor3) / Math.pow(distancia(vx2, vy2, vx3, vy3),2));
  let fuerza13 = Math.abs((k * vvalor1 * vvalor3) / Math.pow(distancia(vx1, vy1, vx3, vy3),2));

  let fuerza21 = Math.abs((k * vvalor2 * vvalor1) / Math.pow(distancia(vx2, vy2, vx1, vy1),2));
  let fuerza32 = Math.abs((k * vvalor3 * vvalor2) / Math.pow(distancia(vx3, vy3, vx2, vy2),2));
  let fuerza31 = Math.abs((k * vvalor3 * vvalor1) / Math.pow(distancia(vx3, vy3, vx1, vy1),2));

  let fuerzatotal1x = Math.abs((fuerza21*unitarioi21)+(fuerza31*unitarioi31));
  let fuerzatotal2x = Math.abs((fuerza12*unitarioi12)+(fuerza32*unitarioi32));
  let fuerzatotal3x = Math.abs((fuerza13*unitarioi13)+(fuerza23*unitarioi23));

  let fuerzatotal1y = Math.abs((fuerza21*unitarioi21)+(fuerza31*unitarioj31));
  let fuerzatotal2y = Math.abs((fuerza12*unitarioi12)+(fuerza32*unitarioj32));
  let fuerzatotal3y = Math.abs((fuerza13*unitarioi13)+(fuerza23*unitarioj23));

  let fuerzatotal1 = Math.abs(Math.sqrt(Math.pow(fuerzatotal1x,2)+Math.pow(fuerzatotal1y,2)));
  let fuerzatotal2 = Math.abs(Math.sqrt(Math.pow(fuerzatotal2x,2)+Math.pow(fuerzatotal2y,2)));
  let fuerzatotal3 = Math.abs(Math.sqrt(Math.pow(fuerzatotal3x,2)+Math.pow(fuerzatotal3y,2)));

  let campo1 = (k*vvalor1)/Math.pow(distancia(vx1,vy1,vpx,vpy),2);
  let campo2 = (k*vvalor2)/Math.pow(distancia(vx2,vy2,vpx,vpy),2);
  let campo3 = (k*vvalor3)/Math.pow(distancia(vx3,vy3,vpx,vpy),2);
  
  let potencial1 =(k*vvalor1)/distancia(vx1,vy1,vpx,vpy);
  let potencial2 =(k*vvalor2)/distancia(vx2,vy2,vpx,vpy);
  let potencial3 =(k*vvalor3)/distancia(vx3,vy3,vpx,vpy);
  // let energia12 = calcularEnergia(vvalor1, vvalor2, distancia(vx1,vy1,vx2,vy2));
  // let energia23 = calcularEnergia(vvalor2, vvalor3, distancia(vx2,vy2,vx3,vy3));
  // let energia13 = calcularEnergia(vvalor1, vvalor3, distancia(vx1,vy1,vx3,vy3));

  document.getElementById("1-2").innerHTML = fuerza12.toExponential(2) + "";
  document.getElementById("1-2x").innerHTML = "x: " + (fuerza12*unitarioi12).toExponential(2) + "N";
  document.getElementById("1-2y").innerHTML = "y: " + (fuerza12*unitarioj12).toExponential(2) + "N";

  document.getElementById("2-3").innerHTML = fuerza23.toExponential(2) + "";
  document.getElementById("2-3x").innerHTML = "x: " + (fuerza23*unitarioi23).toExponential(2) + "N";
  document.getElementById("2-3y").innerHTML = "y: " + (fuerza23*unitarioj23).toExponential(2) + "N";

  document.getElementById("1-3").innerHTML = fuerza13.toExponential(2) + "";
  document.getElementById("1-3x").innerHTML = "x: " + (fuerza13*unitarioi13).toExponential(2) + "N";
  document.getElementById("1-3y").innerHTML = "y: " + (fuerza13*unitarioj13).toExponential(2) + "N";

  document.getElementById("2-1").innerHTML = fuerza21.toExponential(2) + "";
  document.getElementById("2-1x").innerHTML = "x: " + (fuerza21*unitarioi21).toExponential(2) + "N";
  document.getElementById("2-1y").innerHTML = "y: " + (fuerza21*unitarioj21).toExponential(2) + "N";

  document.getElementById("3-2").innerHTML = fuerza32.toExponential(2) + "";
  document.getElementById("3-2x").innerHTML = "x: " + (fuerza32*unitarioi32).toExponential(2) + "N";
  document.getElementById("3-2y").innerHTML = "y: " + (fuerza32*unitarioj32).toExponential(2) + "N";

  document.getElementById("3-1").innerHTML = fuerza31.toExponential(2) + "";
  document.getElementById("3-1x").innerHTML = "x: " + (fuerza31*unitarioi31).toExponential(2) + "N";
  document.getElementById("3-1y").innerHTML = "y: " + (fuerza31*unitarioj31).toExponential(2) + "N";

  document.getElementById("total1").innerHTML = fuerzatotal1.toExponential(2) + "";
  document.getElementById("total1x").innerHTML = "x: " + (fuerzatotal1).toExponential(2) + "N";
  document.getElementById("total1y").innerHTML = "y: " + (fuerzatotal1).toExponential(2) + "N";

  document.getElementById("total2").innerHTML = fuerzatotal2.toExponential(2) + "";
  document.getElementById("total2x").innerHTML = "x: " + (fuerzatotal2).toExponential(2) + "N";
  document.getElementById("total2y").innerHTML = "y: " + (fuerzatotal2).toExponential(2) + "N";

  document.getElementById("total3").innerHTML = fuerzatotal3.toExponential(2) + "";
  document.getElementById("total3x").innerHTML = "x: " + (fuerzatotal3).toExponential(2) + "N";
  document.getElementById("total3y").innerHTML = "y: " + (fuerzatotal3).toExponential(2) + "N";

  document.getElementById("campo").innerHTML =   sumatoriaCampos(campo1,campo2,campo3).toExponential(2) + "N/C";
  
  // document.getElementById("Energia12").innerHTML = energia12.toExponential(2);
  // document.getElementById("Energia23").innerHTML = energia23.toExponential(2);
  // document.getElementById("Energia13").innerHTML = energia13.toExponential(2);
  // document.getElementById("EnergiaTotal").innerHTML = (energia12 + energia23 + energia13).toExponential(2);

  document.getElementById("potencial1").innerHTML = potencial1.toExponential(2) + "V";
  document.getElementById("potencial2").innerHTML = potencial2.toExponential(2) + "V";
  document.getElementById("potencial3").innerHTML = potencial3.toExponential(2) + "V";

  loadGraphic();
};

const magnitud = (x, y) => {
  return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
};

// const calcularEnergia = (carga1, carga2, distancia) =>{
//   return ((k*carga1*carga2)/distancia)
// }

const sumatoriaCampos = (campo1, campo2, campo3) => {
  let ai = campo1 * unitarioi(vx1, vy1, vpx, vpy, '', '.');
  let aj = campo1 * unitarioj(vx1, vy1, vpx, vpy, '', '.');
  let bi = campo2 * unitarioi(vx2, vy2, vpx, vpy, '', '.');
  let bj = campo2 * unitarioj(vx2, vy2, vpx, vpy, '', '.');
  let ci = campo3 * unitarioi(vx3, vy3, vpx, vpy, '', '.');
  let cj = campo3 * unitarioj(vx3, vy3, vpx, vpy, '', '.');
  let x = ai + bi;
  let y = aj + bj;
  if(ci!=null && cj!=null){
	  x+=ci;
	  y+=cj;
  }
  
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

  let temp = (x1-x2) / magnitud((x1-x2), (y1-y2));
  console.log(temp);
  return (temp*bandera);
};

const unitarioj = (x1,y1, x2,y2, signo1,signo2) => {
  let bandera = 1;
  if(signo1 == signo2){
    bandera = -1;
  }
  let temp = (y1-y2) / magnitud((x1-x2), (y1-y2));
  return (temp*bandera);
};

var chart;

const loadGraphic = () => {
  chart = new CanvasJS.Chart("chartContainer", {
    backgroundColor: "#D6CECE",
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

  let arrowsIn = document.getElementById("arrowsIn");
  let arrowsOut = document.getElementById("arrowsOut");

  let ctx = chart.ctx.canvas.getContext('2d');


  let xmax = 0;
  let ymax = 0;

  let tamX = ctx.canvas.width;
  let tamY = ctx.canvas.height;
  console.log(tamX);
  console.log(tamY);

  for(let i=0; i<cargasP.length; i++){
    xCarga = cargasP[i].x;
    yCarga = cargasP[i].y;
    xmax = (xCarga>xmax)?xCarga:xmax;
    ymax = (yCarga>ymax)?yCarga:ymax;
  }
  for(let i=0; i<cargasN.length; i++){
    xCarga = cargasP[i].x;
    yCarga = cargasP[i].y;
    xmax = (xCarga>xmax)?xCarga:xmax;
    ymax = (yCarga>ymax)?yCarga:ymax;
  }
  for(let i=0; i<punto.length; i++){
    xCarga = cargasP[i].x;
    yCarga = cargasP[i].y;
    xmax = (xCarga>xmax)?xCarga:xmax;
    ymax = (yCarga>ymax)?yCarga:ymax;
  }

  console.log(xmax);
  console.log(ymax);

  for(let i=0; i<cargasP.length; i++){
    xCarga = cargasP[i].x;
    yCarga = cargasP[i].y;
    zCarga = cargasP[i].z;
    xGrafica = tamX-(xCarga * tamX / xmax)
    yGrafica = (yCarga * tamY / ymax)
    tamCx = 20*zCarga
    tamCy = 20*zCarga

    ctx.drawImage(arrowsOut, chart.axisX[0].convertValueToPixel(xCarga)-(tamCx/2),chart.axisY[0].convertValueToPixel(yCarga)-(tamCy/2), tamCx,tamCy)
  }
  for(let i=0; i<cargasN.length; i++){
    xCarga = cargasN[i].x;
    yCarga = cargasN[i].y;
    zCarga = cargasN[i].z;
    xGrafica = tamX-(xCarga * tamX / xmax)
    yGrafica = (yCarga * tamY / ymax)
    tamCx = 20*zCarga
    tamCy = 20*zCarga

    ctx.drawImage(arrowsIn, chart.axisX[0].convertValueToPixel(xCarga)-(tamCx/2),chart.axisY[0].convertValueToPixel(yCarga)-(tamCy/2), tamCx,tamCy)
  }

};

