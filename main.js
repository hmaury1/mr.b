
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
 
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1278,
    height = 645,
    player = {
        //x: width / 2,
        x: 0,
        y: height - 25,
        width: 48,
        height: 48,
        speed: 5,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;
    imgX = 0;

 
 
canvas.width = width;
canvas.height = height;
 