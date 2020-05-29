$("#formulario").submit((e)=>{
  e.preventDefault();
  calcular();
});
$("#accordion2").on("show.bs.collapse", ()=>{
  loadGraphic();
});

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

let velocidadX = document.getElementById("velocidadX");
let velocidadY = document.getElementById("velocidadY");

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
let unitarioj12;
let unitarioi12;
let unitarioi23;
let unitarioj23;
let unitarioi13;
let unitarioj13;
let unitarioi21;
let unitarioj21;
let unitarioi32;
let unitarioj32;
let unitarioi31;
let unitarioj31;
let fuerza12;
let fuerza23;
let fuerza13;
let fuerza21;
let fuerza32;
let fuerza31;
let fuerzatotal1x;
let fuerzasaliendo1x;
let fuerzatotal2x;
let fuerzasaliendo2x;
let fuerzatotal3x;
let fuerzasaliendo3x;
let fuerzatotal1y;
let fuerzasaliendo1y;
let fuerzatotal2y;
let fuerzasaliendo2y;
let fuerzatotal3y;
let fuerzasaliendo3y;
let fuerzatotal1;
let fuerzatotal2;
let fuerzatotal3;
let campo1;
let campo2;
let campo3;
let potencial1;
let potencial2;
let potencial3;
let angulo1;
let angulo2;
let angulo3;
let vvelocidadx;
let vvelocidady;
const k = 9000000000;
const u0 = 4*Math.PI * 10**-7

console.log(u0.toExponential(2))

const leerValores = () => {
  cargasP = [];
  cargasN = [];
  vvalor1 = (valor1.value)||0;
  vx1 = x1.value||0;
  vy1 = y1.value||0;
  vvalor2 = (valor2.value)||0;
  vx2 = x2.value||0;
  vy2 = y2.value||0;
  vvalor3 = (valor3.value)||0;
  vx3 = x3.value||0;
  vy3 = y3.value||0;
  vpx = px.value||0;
  vpy = py.value||0;
  vcarga1 = carga1.checked ? 'Positiva': 'Negativa';
  vcarga2 = carga2.checked ? 'Positiva': 'Negativa';
  vcarga3 = carga3.checked ? 'Positiva': 'Negativa';
  vvelocidadx = velocidadX.value||0;
  vvelocidady = velocidadY.value||0;
};

const calcular = () => {
  if(chart!=null) chart.destroy();

  console.log("Click");
  leerValores();

  unitarioi12 = unitarioi(vx1,vy1,vx2,vy2,vcarga1,vcarga2);
  unitarioj12 = unitarioj(vx1,vy1,vx2,vy2,vcarga1,vcarga2);

  unitarioi23 = unitarioi(vx2,vy2,vx3,vy3,vcarga2,vcarga3);
  unitarioj23 = unitarioj(vx2,vy2,vx3,vy3,vcarga2,vcarga3);

  unitarioi13 = unitarioi(vx1,vy1,vx3,vy3,vcarga1,vcarga3);
  unitarioj13 = unitarioj(vx1,vy1,vx3,vy3,vcarga1,vcarga3);

  unitarioi21 = unitarioi(vx2,vy2,vx1,vy1,vcarga2,vcarga1);
  unitarioj21 = unitarioj(vx2,vy2,vx1,vy1,vcarga2,vcarga1);

  unitarioi32 = unitarioi(vx3,vy3,vx2,vy2,vcarga3,vcarga2);
  unitarioj32 = unitarioj(vx3,vy3,vx2,vy2,vcarga3,vcarga2);

  unitarioi31 = unitarioi(vx3,vy3,vx1,vy1,vcarga3,vcarga1);
  unitarioj31 = unitarioj(vx3,vy3,vx1,vy1,vcarga3,vcarga1);


  fuerza12 = Math.abs((k * vvalor1 * vvalor2) / Math.pow(distancia(vx1, vy1, vx2, vy2),2))||0;
  fuerza23 = Math.abs((k * vvalor2 * vvalor3) / Math.pow(distancia(vx2, vy2, vx3, vy3),2))||0;
  fuerza13 = Math.abs((k * vvalor1 * vvalor3) / Math.pow(distancia(vx1, vy1, vx3, vy3),2))||0;

  fuerza21 = Math.abs((k * vvalor2 * vvalor1) / Math.pow(distancia(vx2, vy2, vx1, vy1),2))||0;
  fuerza32 = Math.abs((k * vvalor3 * vvalor2) / Math.pow(distancia(vx3, vy3, vx2, vy2),2))||0;
  fuerza31 = Math.abs((k * vvalor3 * vvalor1) / Math.pow(distancia(vx3, vy3, vx1, vy1),2))||0;

  fuerzatotal1x = (fuerza21*unitarioi21)+(fuerza31*unitarioi31)||0;
  fuerzatotal2x = (fuerza12*unitarioi12)+(fuerza32*unitarioi32)||0;
  fuerzatotal3x = (fuerza13*unitarioi13)+(fuerza23*unitarioi23)||0;

  fuerzatotal1y = (fuerza21*unitarioj21)+(fuerza31*unitarioj31)||0;
  fuerzatotal2y = (fuerza12*unitarioj12)+(fuerza32*unitarioj32)||0;
  fuerzatotal3y = (fuerza13*unitarioj13)+(fuerza23*unitarioj23)||0;

  fuerzatotal1 = magnitud(fuerzatotal1x, fuerzatotal1y)||0;
  fuerzatotal2 = magnitud(fuerzatotal2x, fuerzatotal2y)||0;
  fuerzatotal3 = magnitud(fuerzatotal3x, fuerzatotal3y)||0;

  campo1 = (k*vvalor1)/Math.pow(distancia(vx1,vy1,vpx,vpy),2)||0;
  campo2 = (k*vvalor2)/Math.pow(distancia(vx2,vy2,vpx,vpy),2)||0;
  campo3 = (k*vvalor3)/Math.pow(distancia(vx3,vy3,vpx,vpy),2)||0;
  
  potencial1 =(k*vvalor1)/distancia(vx1,vy1,vpx,vpy);
  potencial2 =(k*vvalor2)/distancia(vx2,vy2,vpx,vpy);
  potencial3 =(k*vvalor3)/distancia(vx3,vy3,vpx,vpy);

  // let energia12 = calcularEnergia(vvalor1, vvalor2, distancia(vx1,vy1,vx2,vy2));
  // let energia23 = calcularEnergia(vvalor2, vvalor3, distancia(vx2,vy2,vx3,vy3));
  // let energia13 = calcularEnergia(vvalor1, vvalor3, distancia(vx1,vy1,vx3,vy3));

  angulo1 = Math.abs(Math.atan(fuerzatotal1y/fuerzatotal1x));
  angulo2 = Math.abs(Math.atan(fuerzatotal2y/fuerzatotal2x));
  angulo3 = Math.abs(Math.atan(fuerzatotal3y/fuerzatotal3x));


  anguloVelocidad = Math.abs(Math.atan(vvelocidady/vvelocidadx));

  let d1px = Math.abs(vx1 - vpx)||0;
  let d1py = Math.abs(vy1 - vpy)||0;
  let d2px = Math.abs(vx2 - vpx)||0;
  let d2py = Math.abs(vy2 - vpy)||0;
  let d3px = Math.abs(vx3 - vpx)||0;
  let d3py = Math.abs(vy3 - vpy)||0;

  let campoMagnetico1 = (u0/(4*Math.PI)) *  vvalor1 * productoCruz2x2(vvelocidadx, vvelocidady, d1px, d1py) / (distancia(vx1,vy1,vpx,vpy)**3);
  let campoMagnetico2 = (u0/(4*Math.PI)) *  vvalor2 * productoCruz2x2(vvelocidadx, vvelocidady, d2px, d2py) / (distancia(vx2,vy2,vpx,vpy)**3);
  let campoMagnetico3 = (u0/(4*Math.PI)) *  vvalor3 * productoCruz2x2(vvelocidadx, vvelocidady, d3px, d3py) / (distancia(vx3,vy3,vpx,vpy)**3);

  campoMagnetico1 = vcarga1=="Negativo"?(-campoMagnetico1):campoMagnetico1
  campoMagnetico2 = vcarga2=="Negativo"?(-campoMagnetico2):campoMagnetico2
  campoMagnetico3 = vcarga3=="Negativo"?(-campoMagnetico3):campoMagnetico3

  let campoMagneticoT = campoMagnetico1 + campoMagnetico2 + campoMagnetico3;

  let fuerzaMagnetica1 = vvalor1 * distancia(0,0,vvelocidadx,vvelocidady) * campoMagnetico1;
  let fuerzaMagnetica2 = vvalor2 * distancia(0,0,vvelocidadx,vvelocidady) * campoMagnetico2;
  let fuerzaMagnetica3 = vvalor3 * distancia(0,0,vvelocidadx,vvelocidady) * campoMagnetico3;

  if(fuerzatotal1x>=0 && fuerzatotal1y>=0){
    while(angulo1.toString()!="NaN" && !(angulo1>=0 && angulo1<=(1/2)*Math.PI)){
      if(!(angulo1>=0)){
        angulo1 += Math.PI/2;
        console.log("angulo1 while1 if1")
      } else if(!(angulo1<=(1/2)*Math.PI)){
        angulo1 -= Math.PI/2;
        console.log("angulo1 while1 if1")
      }
    }
  } else if(fuerzatotal1x>=0 && fuerzatotal1y<0){

    while(angulo1.toString()!="NaN" && !(angulo1>=(3/2)*Math.PI && angulo1<=2*Math.PI)){
      if(!(angulo1>=(3/2)*Math.PI)){
        angulo1 += Math.PI/2;
        console.log("angulo1 while2 if1")
      } else if(!(angulo1<=2*Math.PI)){
        angulo1 -= Math.PI/2;
        console.log("angulo1 while2 if2")
      }
    }
  } else if(fuerzatotal1x<=0 && fuerzatotal1y>=0){
    while(angulo1.toString()!="NaN" && !(angulo1>=(1/2)*Math.PI && angulo1<=Math.PI)){
      if(angulo1<(1/2)*Math.PI){
        angulo1 += Math.PI/2;
        console.log("angulo1 while3 if1")
      } else if(angulo1>Math.PI){
        angulo1 -= Math.PI/2;
        console.log("angulo1 while3 if2")
      }
    }
  } else if(fuerzatotal1x<=0 && fuerzatotal1y<=0){
    while(angulo1.toString()!="NaN" && !(angulo1>=Math.PI && angulo1<=(3/2)*Math.PI)){
      if(angulo1<Math.PI){
        angulo1 += Math.PI/2;
        console.log("angulo1 while4 if1")
      } else if(angulo1>(3/2)*Math.PI){
        angulo1 -= Math.PI/2;
        console.log("angulo1 while4 if2")
      }
    }
  }
  angulo1 = -angulo1;




  if(fuerzatotal2x>=0 && fuerzatotal2y>=0){
    while(angulo2.toString()!="NaN" && !(angulo2>=0 && angulo2<=(1/2)*Math.PI)){
      if(!(angulo2>=0)){
        angulo2 += Math.PI/2;
        console.log("angulo2 while1 if1" + angulo2)
      } else if(!(angulo2<=(1/2)*Math.PI)){
        angulo2 -= Math.PI/2;
        console.log("angulo2 while1 if2")
      }
    }    
  } else if(fuerzatotal2x>=0 && fuerzatotal2y<0){

    while(angulo2.toString()!="NaN" && !(angulo2>=(3/2)*Math.PI && angulo2<=2*Math.PI)){
      if(!(angulo2>=(3/2)*Math.PI)){
        angulo2 += Math.PI/2;
        console.log("angulo2 while2 if1")
      } else if(!(angulo2<=2*Math.PI)){
        angulo2 -= Math.PI/2;
        console.log("angulo2 while2 if2")
      }
    }
  } else if(fuerzatotal2x<=0 && fuerzatotal2y>=0){
    while(angulo2.toString()!="NaN" && !(angulo2>=(1/2)*Math.PI && angulo2<=Math.PI)){
      if(angulo2<(1/2)*Math.PI){
        angulo2 += Math.PI/2;
        console.log("angulo2 while3 if1")
      } else if(angulo2>Math.PI){
        angulo2 -= Math.PI/2;
        console.log("angulo2 while3 if2")
      }
    }
  } else if(fuerzatotal2x<=0 && fuerzatotal2y<=0){
    while(angulo2.toString()!="NaN" && !(angulo2>=Math.PI && angulo2<=(3/2)*Math.PI)){
      if(angulo2<Math.PI){
        angulo2 += Math.PI/2;
        console.log("angulo2 while4 if1")
      } else if(angulo2>(3/2)*Math.PI){
        angulo2 -= Math.PI/2;
        console.log("angulo2 while4 if2")
      }
    }
  }
  angulo2 = -angulo2;



  if(fuerzatotal3x>=0 && fuerzatotal3y>=0){
    while(angulo3.toString()!="NaN" && !(angulo3>=0 && angulo3<=(1/2)*Math.PI)){
      if(!(angulo3>=0)){
        angulo3 += Math.PI/2;
        console.log("angulo3 while1 if1")
      } else if(!(angulo3<=(1/2)*Math.PI)){
        angulo3 -= Math.PI/2;
        console.log("angulo3 while1 if2")
      }
    }    
  } else if(fuerzatotal3x>=0 && fuerzatotal3y<0){

    while(angulo3.toString()!="NaN" && !(angulo3>=(3/2)*Math.PI && angulo3<=2*Math.PI)){
      if(!(angulo3>=(3/2)*Math.PI)){
        angulo3 += Math.PI/2;
        console.log("angulo3 while2 if1")
      } else if(!(angulo3<=2*Math.PI)){
        angulo3 -= Math.PI/2;
        console.log("angulo3 while2 if2")
      }
    }
  } else if(fuerzatotal3x<=0 && fuerzatotal3y>=0){
    while(angulo3.toString()!="NaN" && !(angulo3>=(1/2)*Math.PI && angulo3<=Math.PI)){
      if(angulo3<(1/2)*Math.PI){
        angulo3 += Math.PI/2;
        console.log("angulo3 while3 if1")
      } else if(angulo3>Math.PI){
        angulo3 -= Math.PI/2;
        console.log("angulo3 while3 if2")
      }
    }
  } else if(fuerzatotal3x<=0 && fuerzatotal3y<=0){
    while(angulo3.toString()!="NaN" && !(angulo3>=Math.PI && angulo3<=(3/2)*Math.PI)){
      if(angulo3<Math.PI){
        angulo3 += Math.PI/2;
        console.log("angulo3 while4 if1")
      } else if(angulo3>(3/2)*Math.PI){
        angulo3 -= Math.PI/2;
        console.log("angulo3 while4 if2")
      }
    }
  }
  angulo3 = -angulo3;

  document.getElementById("1-2").innerText = fuerza12.toExponential(2) + "N";
  document.getElementById("1-2x").innerText = "x: " + ((fuerza12*unitarioi12)||0).toExponential(2) + "N";
  document.getElementById("1-2y").innerText = "y: " + ((fuerza12*unitarioj12)||0).toExponential(2) + "N";

  document.getElementById("2-3").innerText = fuerza23.toExponential(2) + "N";
  document.getElementById("2-3x").innerText = "x: " + ((fuerza23*unitarioi23)||0).toExponential(2) + "N";
  document.getElementById("2-3y").innerText = "y: " + ((fuerza23*unitarioj23)||0).toExponential(2) + "N";

  document.getElementById("1-3").innerText = fuerza13.toExponential(2) + "N";
  document.getElementById("1-3x").innerText = "x: " + ((fuerza13*unitarioi13)||0).toExponential(2) + "N";
  document.getElementById("1-3y").innerText = "y: " + ((fuerza13*unitarioj13)||0).toExponential(2) + "N";

  document.getElementById("2-1").innerText = fuerza21.toExponential(2) + "N";
  document.getElementById("2-1x").innerText = "x: " + ((fuerza21*unitarioi21)||0).toExponential(2) + "N";
  document.getElementById("2-1y").innerText = "y: " + ((fuerza21*unitarioj21)||0).toExponential(2) + "N";

  document.getElementById("3-2").innerText = fuerza32.toExponential(2) + "N";
  document.getElementById("3-2x").innerText = "x: " + ((fuerza32*unitarioi32)||0).toExponential(2) + "N";
  document.getElementById("3-2y").innerText = "y: " + ((fuerza32*unitarioj32)||0).toExponential(2) + "N";

  document.getElementById("3-1").innerText = fuerza31.toExponential(2) + "N";
  document.getElementById("3-1x").innerText = "x: " + ((fuerza31*unitarioi31)||0).toExponential(2) + "N";
  document.getElementById("3-1y").innerText = "y: " + ((fuerza31*unitarioj31)||0).toExponential(2) + "N";

  document.getElementById("total1").innerText = fuerzatotal1.toExponential(2) + "N";
  document.getElementById("total1x").innerText = "x: " + (fuerzatotal1x).toExponential(2) + "N";
  document.getElementById("total1y").innerText = "y: " + (fuerzatotal1y).toExponential(2) + "N";

  document.getElementById("total2").innerText = fuerzatotal2.toExponential(2) + "N";
  document.getElementById("total2x").innerText = "x: " + (fuerzatotal2x).toExponential(2) + "N";
  document.getElementById("total2y").innerText = "y: " + (fuerzatotal2y).toExponential(2) + "N";

  document.getElementById("total3").innerText = fuerzatotal3.toExponential(2) + "N";
  document.getElementById("total3x").innerText = "x: " + (fuerzatotal3x).toExponential(2) + "N";
  document.getElementById("total3y").innerText = "y: " + (fuerzatotal3y).toExponential(2) + "N";

  document.getElementById("campo1").innerText = campo1.toExponential(2) + "N/C";
  document.getElementById("campo1x").innerText = (campo1 * unitarioi(vpx,vpy, vx1, vy1, '', '.')||0).toExponential(2)  + "N/C";
  document.getElementById("campo1y").innerText = (campo1 * unitarioj(vpx,vpy, vx1, vy1, '', '.')||0).toExponential(2) + "N/C";

  document.getElementById("campo2").innerText = campo2.toExponential(2) + "N/C";
  document.getElementById("campo2x").innerText = (campo2 * unitarioi(vpx,vpy, vx2, vy2, '', '.')||0).toExponential(2) + "N/C";
  document.getElementById("campo2y").innerText = (campo2 * unitarioj(vpx,vpy, vx2, vy2, '', '.')||0).toExponential(2) + "N/C";

  document.getElementById("campo3").innerText = campo3.toExponential(2) + "N/C";
  document.getElementById("campo3x").innerText = (campo3 * unitarioi(vpx,vpy, vx3, vy3, '', '.')||0).toExponential(2) + "N/C";
  document.getElementById("campo3y").innerText = (campo3 * unitarioj(vpx,vpy, vx3, vy3, '', '.')||0).toExponential(2) + "N/C";

  document.getElementById("campot").innerText =  sumatoriaCampos(campo1,campo2,campo3)[0].toExponential(2) + "N/C";
  document.getElementById("campotx").innerText = sumatoriaCampos(campo1,campo2,campo3)[1].toExponential(2) + "N/C";
  document.getElementById("campoty").innerText = sumatoriaCampos(campo1,campo2,campo3)[2].toExponential(2) + "N/C";

  // document.getElementById("Energia12").innerText = energia12.toExponential(2);
  // document.getElementById("Energia23").innerText = energia23.toExponential(2);
  // document.getElementById("Energia13").innerText = energia13.toExponential(2);
  // document.getElementById("EnergiaTotal").innerText = (energia12 + energia23 + energia13).toExponential(2);

  document.getElementById("potencial1").innerText = (potencial1||0).toExponential(2) + "V";
  document.getElementById("potencial2").innerText = (potencial2||0).toExponential(2) + "V";
  document.getElementById("potencial3").innerText = (potencial3||0).toExponential(2) + "V";
  document.getElementById("potencialt").innerText = (((potencial1)||0)+((potencial2)||0)+((potencial3)||0)).toExponential(2) + "V";

  document.getElementById("campoMagnetico1").innerText = (campoMagnetico1||0).toExponential(2) + "T";
  document.getElementById("campoMagnetico2").innerText = (campoMagnetico2||0).toExponential(2) + "T";
  document.getElementById("campoMagnetico3").innerText = (campoMagnetico3||0).toExponential(2) + "T";
  document.getElementById("campoMagneticoT").innerText = (campoMagneticoT||0).toExponential(2) + "T";

  document.getElementById("fuerzaMagnetica1").innerText = (fuerzaMagnetica1||0).toExponential(2) + "T";
  document.getElementById("fuerzaMagnetica2").innerText = (fuerzaMagnetica2||0).toExponential(2) + "T";
  document.getElementById("fuerzaMagnetica3").innerText = (fuerzaMagnetica3||0).toExponential(2) + "T";


  cargas = [
    {x:parseFloat(vx1), y:parseFloat(vy1), z:parseFloat(vvalor1), polaridad:vcarga1, name:"Carga 1", color:(vcarga1=='Negativa'?'blue':'red'), angulo:angulo1||0, fuerza: fuerzatotal1.toExponential(2)},
    {x:parseFloat(vx2), y:parseFloat(vy2), z:parseFloat(vvalor2), polaridad:vcarga2, name:"Carga 2", color:(vcarga2=='Negativa'?'blue':'red'), angulo:angulo2||0, fuerza: fuerzatotal2.toExponential(2)},
    {x:parseFloat(vx3), y:parseFloat(vy3), z:parseFloat(vvalor3), polaridad:vcarga3, name:"Carga 3", color:(vcarga3=='Negativa'?'blue':'red'), angulo:angulo3||0, fuerza: fuerzatotal3.toExponential(2)},
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

  loadGraphic();
};

const magnitud = (x, y) => {
  return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
};

// const calcularEnergia = (carga1, carga2, distancia) =>{
//   return ((k*carga1*carga2)/distancia)
// }

function productoCruz2x2(vec1X=0, vec1Y=0, vec2X=0, vec2Y=0) {
  return (vec1X*vec2Y)-(vec1Y*vec2X);
}

const sumatoriaCampos = (campo1, campo2, campo3) => {
  let ai = (campo1 * unitarioi(vpx, vpy, vx1, vy1, '', '.'))||0;
  let aj = (campo1 * unitarioj(vpx, vpy, vx1, vy1, '', '.'))||0;
  let bi = (campo2 * unitarioi(vpx, vpy, vx2, vy2, '', '.'))||0;
  let bj = (campo2 * unitarioj(vpx, vpy, vx2, vy2, '', '.'))||0;
  let ci = (campo3 * unitarioi(vpx, vpy, vx3, vy3, '', '.'))||0;
  let cj = (campo3 * unitarioj(vpx, vpy, vx3, vy3, '', '.'))||0;
  let x = ai + bi + ci;
  let y = aj + bj + cj;
  
  return [magnitud(x,y), x, y];
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
    backgroundColor: "bisque",
    animationEnabled: true,
    height: 420,
    width: 400,
    title:{
      text: "Ubicacion de cargas",
      padding: 10,
      horizontalAlign: 'left'
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
      toolTipContent: "<b>{name}</b><br/>Posicion X: {x} m<br/> Posicion Y: {y} m<br/> Magnitud: {z}C <br/> Polaridad: {polaridad} <br/> Fuerza que siente: {fuerza} <br/> Direccion de la fuerza: {angulo} rad",
      dataPoints: cargasP
    },
    {
      type: "bubble",
      showInLegend: true,
      name: "Negativa",
      legendMarkerType: "circle",
      legendMarkerColor: "blue",
      toolTipContent: "<b>{name}</b><br/>Posicion X: {x} m<br/> Posicion Y: {y} m<br/> Magnitud: {z}C <br/>Polaridad: {polaridad} <br/> Fuerza que siente: {fuerza} <br/> Direccion de la fuerza: {angulo} rad",
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
  chart.legend.set("margin", "20");

  let arrow = document.getElementById("arrowToDraw");
  let arrowVel = document.getElementById("greenArrow");
  let ctx = chart.ctx.canvas.getContext('2d');


  let xmax = 0;
  let ymax = 0;

  let tamX = ctx.canvas.width;
  let tamY = ctx.canvas.height;

  xmax = Math.max(Math.abs(cargas[0].x)||0, Math.abs(cargas[1].x)||0, Math.abs(cargas[2].x)||0, punto[0].x||0 );
  ymax = Math.max(Math.abs(cargas[0].y)||0, Math.abs(cargas[1].y)||0, Math.abs(cargas[2].y)||0, punto[0].y||0 );

  angulos = [angulo1, angulo2, angulo3];
  console.log(angulos);
  let p = 0;

  for(let i=0; i<cargas.length; i++){
    xCarga = cargas[i].x;
    yCarga = cargas[i].y;
    zCarga = cargas[i].z;
    xGrafica = tamX-(xCarga * tamX / xmax);
    yGrafica = (yCarga * tamY / ymax);
    tamCx = 15*zCarga;
    tamCy = 15*zCarga;
    posCargax = chart.axisX[0].convertValueToPixel(xCarga);
    posCargay = chart.axisY[0].convertValueToPixel(yCarga);

    // ctx.drawImage(arrowsOut, posCargax-(tamCx/2),posCargay-(tamCy/2), tamCx,tamCy);//Lineas de campo
    ctx.save();
    ctx.translate(posCargax, posCargay);
    ctx.rotate( angulos[i]);
    console.log(angulos[i]);
    (angulos[i].toString()!="NaN")? ctx.drawImage(arrow, -tamCx/2, -tamCy/2, tamCx,tamCy):null;
    ctx.restore();
    ctx.save();
    ctx.translate(posCargax, posCargay);
    ctx.rotate( anguloVelocidad);
    console.log(anguloVelocidad);
    (anguloVelocidad.toString()!="NaN")? ctx.drawImage(arrowVel, -tamCx/2, -tamCy/2, tamCx,tamCy):null;
    ctx.restore();
    p++;
  }

  
};

