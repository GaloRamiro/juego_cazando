/* obtener el canbas y su contexto para dibujar*/
let canvas=document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");


const VELOCIDAD = 10;


/*Definir Variables*/
let gatoX=0;
let gatoY=0;
let comidaX=100;
let comidaY=100;
let puntos=0;
/*Definir Constantes*/
const ALTO_GATO=50;
const ANCHO_GATO=50;

const ANCHO_COMIDA=30;
const ALTO_COMIDA=30;


/* obtener el canbas y su contexto para dibujar*/

function IniciarJuego(){
 gatoX = (canvas.width / 2) - (ANCHO_GATO / 2); 
 gatoY = (canvas.height / 2) - (ALTO_GATO/ 2);

 graficarGato();
 graficarComida();
}

function graficar(x,y,ancho,alto,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,ancho,alto);
}


function graficarGato(){
     graficar(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#000000");
}

function graficarComida(){
     graficar(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#df1111");
}




function limpiarCanva(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function moverIzquierda(){
   gatoX = gatoX - VELOCIDAD;
   actualizarPantalla();
   detectarColicion();
}
function moverDerecha(){
   gatoX = gatoX + VELOCIDAD;
   actualizarPantalla();
   detectarColicion();
}
function moverArriba(){
   gatoY = gatoY - VELOCIDAD;
   actualizarPantalla();
   detectarColicion();
}

function moverAbajo(){
   gatoY = gatoY + VELOCIDAD;
   actualizarPantalla();
   detectarColicion();
}


function actualizarPantalla(){
    limpiarCanva();
    graficarGato();
    graficarComida();
}
function detectarColicion(){
    if(comidaX + ANCHO_COMIDA > gatoX &&
       comidaX < gatoX + ANCHO_GATO &&
       comidaY + ALTO_COMIDA > gatoY &&
       comidaY < gatoY + ALTO_GATO
    ){
      aparecerComida();
      puntos = puntos +1;
      mostrarEnSpan("txtPuntos",puntos);
    }

    }
function aparecerComida(){
    comidaX = generarAleatorio(0, canvas.width-ANCHO_COMIDA);
    comidaY = generarAleatorio(0, canvas.height-ALTO_COMIDA);
    actualizarPantalla();
}