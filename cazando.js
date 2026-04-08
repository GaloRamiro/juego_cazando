/* obtener el canbas y su contexto para dibujar*/
let canvas=document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

/* obtener el canbas y su contexto para dibujar*/
function graficarGato(){
    let ancho = 50;
    let alto = 50;

    let x = (canvas.width - ancho) / 2;
    let y = (canvas.height - alto) / 2;

    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, ancho, alto);
}