
let sun;
let earth;
let moon;
let ctx;
function initSolar() {
    //sun = new Image();
    //earth = new Image();
    //moon = new Image();
    //sun.src = "sun.png";
    //earth.src = "earth.png";
    //moon.src = "moon.png";
    let canvas = document.querySelector("#solar");
    ctx = canvas.getContext("2d");
    //sun.onload = function (){
    drawSolar()
    //}
}
initSolar();
function drawSolar() {
    ctx.clearRect(0, 0, 300, 300); //清空所有的内容
    /*绘制 太阳*/
    //ctx.drawImage(sun, 0, 0, 300, 300);
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.arc(150, 150, 15, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.save();
    ctx.translate(150, 150);
    //绘制earth轨道
    ctx.beginPath();
    ctx.strokeStyle = "rgba(200,66,66,0.9)";
    ctx.arc(0, 0, 100, 0, 2 * Math.PI)
    ctx.stroke();
    let time = new Date();
    //绘制地球
    ctx.beginPath();
    ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds())
    ctx.translate(100, 0);
    //ctx.drawImage(earth, -12, -12)
    ctx.fillStyle = "blue";
    ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
    ctx.fill();
    //绘制月球轨道
    ctx.beginPath();
    ctx.strokeStyle = "rgba(233,167,23,.7)";
    ctx.arc(0, 0, 40, 0, 2 * Math.PI);
    ctx.stroke();
    //绘制月球
    ctx.beginPath();
    ctx.rotate(2 * Math.PI / 6 * time.getSeconds() + 2 * Math.PI / 6000 * time.getMilliseconds());
    ctx.translate(40, 0);
    //ctx.drawImage(moon, -3.5, -3.5);
    ctx.fillStyle = "yellow";
    ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
    requestAnimationFrame(drawSolar);
}
