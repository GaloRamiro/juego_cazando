/* Obtener el canvas y su contexto para dibujar */
let canvas=document.getElementById("areaJuego");// referencia al canvas del HTML
let ctx = canvas.getContext("2d");// contexto 2D para dibujar

/* Velocidad de movimiento del gato */
const VELOCIDAD = 10;


/* ================= VARIABLES ================= */
let gatoX=0;// posición horizontal del gato
let gatoY=0;// posición vertical del gato

let comidaX=100;// posición horizontal de la comida
let comidaY=100;// posición vertical de la comida

let puntos=0;// contador de puntos
let tiempo=15;// tiempo inicial del juego (segundos)

let imgGato = new Image();
imgGato.src = "img/gato.png";
let imgComida = new Image();
imgComida.src = "img/comida.png";
let intervalo;// almacenará el setInterval
let juegoActivo = true;
/* ================= CONSTANTES ================= */
const ALTO_GATO=50;
const ANCHO_GATO=50;
const ANCHO_COMIDA=30;
const ALTO_COMIDA=30;


/* ================= INICIO DEL JUEGO ================= */

function IniciarJuego(){
 intervalo = setInterval(restarTiempo,1000);// ejecuta restarTiempo cada 1 segundo

// centrar el gato en el canvas
 gatoX = (canvas.width / 2) - (ANCHO_GATO / 2); 
 gatoY = (canvas.height / 2) - (ALTO_GATO/ 2);

 graficarGato();// dibujar gato
 graficarComida();// dibujar comida
}

/* ================= FUNCIÓN GENERAL PARA DIBUJAR ================= */
function graficar(x,y,ancho,alto,color){
    ctx.fillStyle = color;// color del rectángulo
    ctx.fillRect(x,y,ancho,alto);// dibuja rectángulo
}

/* ================= DIBUJAR PERSONAJES ================= */
function graficarGato(){
    ctx.drawImage(imgGato, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);// cambio de rectangulo a gato
}

function graficarComida(){
    ctx.drawImage(imgComida, comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);// comida roja
    
}

/* ================= LIMPIAR PANTALLA ================= */
function limpiarCanva(){
    ctx.clearRect(0,0, canvas.width, canvas.height);// borra todo el canvas
}

/* ================= MOVIMIENTOS ================= */
function moverIzquierda(){
   if (!juegoActivo)return;
   gatoX = gatoX - VELOCIDAD;
   actualizarPantalla();
   detectarColicion();
}
function moverDerecha(){
   if (!juegoActivo)return;
   gatoX = gatoX + VELOCIDAD;
   actualizarPantalla();
   detectarColicion();
}
function moverArriba(){
   if (!juegoActivo)return;
   gatoY = gatoY - VELOCIDAD;
   actualizarPantalla();
   detectarColicion();
}

function moverAbajo(){
   if (!juegoActivo)return;
   gatoY = gatoY + VELOCIDAD;
   actualizarPantalla();
   detectarColicion();
}

/* ================= ACTUALIZAR PANTALLA ================= */
function actualizarPantalla(){
    limpiarCanva();// limpiar antes de dibujar
    graficarGato();// dibujar gato actualizado
    graficarComida();// dibujar comida
}

/* ================= DETECCIÓN DE COLISIÓN ================= */
function detectarColicion(){
    if(comidaX + ANCHO_COMIDA > gatoX &&
       comidaX < gatoX + ANCHO_GATO &&
       comidaY + ALTO_COMIDA > gatoY &&
       comidaY < gatoY + ALTO_GATO
    ){
      aparecerComida();// mover comida a otra posición
      puntos = puntos +1; // sumar puntos
      tiempo = 10; // tiempo se reduce y aumenta la dificultad del tiemp 
      mostrarEnSpan("txtTiempo", tiempo); // Ya se reinicia el tiempo cada vez que atrapa a comida

      // condición de victoria
      if(puntos>=6){
        alert("GANADOR")
        clearInterval(intervalo);// detener el tiempo
      }
      mostrarEnSpan("txtPuntos",puntos);// actualizar puntos en pantall
    }

    }

    /* ================= REUBICAR COMIDA ================= */
function aparecerComida(){
    // generar posiciones aleatorias dentro del canvas
    comidaX = generarAleatorio(0, canvas.width-ANCHO_COMIDA);
    comidaY = generarAleatorio(0, canvas.height-ALTO_COMIDA);

    actualizarPantalla();
}


/* ================= CONTROL DE TIEMPO ================= */
function restarTiempo(){
    if (tiempo <= 0){
        tiempo =0;
        juegoActivo= false;//detener juego
         mostrarEnSpan("txtTiempo","GAME OVER");// mensaje final
         clearInterval(intervalo); // detener juego
         return;
    }else{

        tiempo --;// DISMINUYE EL TIEMPO EN 1 segundo

        mostrarEnSpan("txtTiempo",tiempo);// mostrar tiempo
    }
}
/* ================= REINICIAR JUEGO ================= */
function  reiniciarJuego(){
    juegoActivo = true;
    clearInterval(intervalo);// detener intervalo anterior
    puntos=0;
    tiempo=10;

    // reposicionar gato al centro
    gatoX=(canvas.width/2)-(ANCHO_GATO/2);
    gatoY=(canvas.height/2)-(ALTO_GATO/2);

    aparecerComida();// nueva comida

     // actualizar interfaz
    mostrarEnSpan("txtPuntos", puntos);
    mostrarEnSpan("txtTiempo", tiempo);

    actualizarPantalla();

    intervalo= setInterval(restarTiempo, 1000);// reiniciar tiempo
}

