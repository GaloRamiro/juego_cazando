/* obtener el canbas y su contexto para dibujar*/
let canvas=document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");


const VELOCIDAD = 15;

document.getElementById("btnArriba").onclick = () => mover("arriba");
document.getElementById("btnAbajo").onclick = () => mover("abajo");
document.getElementById("btnIzquierda").onclick = () => mover("izquierda");
document.getElementById("btnDerecha").onclick = () => mover("derecha");
/*Definir Variables*/
let gatoX=0;
let gatoY=0;
let comidaX=100;
let comidaY=100;

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


function mover(direccion){
    
    if (direccion === "arriba") gatoY -= VELOCIDAD; 
    if (direccion === "abajo")gatoY += VELOCIDAD;   
    if (direccion === "izquierda")gatoX -= VELOCIDAD; 
    if (direccion === "derecha") gatoX += VELOCIDAD;
    graficarGato()
 
}