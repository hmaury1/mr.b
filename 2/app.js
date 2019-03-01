
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
 
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1278,
    height = 500,
    player = {
        //x: width / 2,
        x: 0,
        y: height - 25,
        width: 25,
        height: 25,
        speed: 5,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;
    
var target = [
    {
        x: 1248,
        y: 275,
        width: 10,
        height: 10,
        show: true,
        platform: 9
    },
    {
        x: 1108,
        y: 125,
        width: 10,
        height: 10,
        show: true,
        platform: 8
    },
    {
        x: 908,
        y: 125,
        width: 10,
        height: 10,
        show: true,
        platform: 7
    }
];

var boxes = [];
 
// dimensions
boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height
});
boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});
boxes.push({
    x: width - 10,
    y: 0,
    width: 50,
    height: height
});

// content:

boxes.push({
    x: 120,
    y: 400,
    width: 100,
    height: 10
});

boxes.push({
    x: 300,
    y: 400,
    width: 100,
    height: 10
});

boxes.push({
    x: 420,
    y: 300,
    width: 100,
    height: 10
});

boxes.push({
    x: 700,
    y: 300,
    width: 25,
    height: 10
});

boxes.push({
    x: 900,
    y: 150,
    width: 25,
    height: 10
});

boxes.push({
    x: 1100,
    y: 150,
    width: 25,
    height: 10
});


boxes.push({
    x: 1240,
    y: 300,
    width: 25,
    height: 10
});

 
canvas.width = width;
canvas.height = height;
 
function update() {
    // check keys
    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {            
            player.velX++;         
        }     
    }     
    
    if (keys[37]) {         
        // left arrow         
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
 
    player.velX *= friction;
    player.velY += gravity;
 
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();
 
    player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
 
        var dir = colCheck(player, boxes[i]);
 
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
            target.forEach(element => {
                if(element.platform === i && element.show){
                    element.show = false;
                    document.getElementById("coins").innerHTML +='<img class="coin" src="coin.svg"/>';
                }
            });                
        } else if (dir === "t") {
            player.velY *= -1;
        }
 
    }
 
    if(player.grounded){
         player.velY = 0;
    }
 
    player.x += player.velX;
    player.y += player.velY;

    document.getElementById('xValue').innerHTML = 'x: ' + ~~player.x;
    document.getElementById('yValue').innerHTML = 'y: ' + ~~player.y;
 
    ctx.fill();
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "yellow";
    for (var i = 0; i < target.length; i++) {
        if(target[i].show)
        ctx.fillRect(target[i].x, target[i].y, target[i].width, target[i].height);
    }
    
    requestAnimationFrame(update);
}
 
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)         
        var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);         
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}
 
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
 
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
 
window.addEventListener("load", function () {
    document.getElementById('speedValue').innerHTML = ' speed: ' + player.speed;
    document.getElementById('frictionValue').innerHTML = ' - friction: ' + friction;
    document.getElementById('gravityValue').innerHTML = ' - gravity: ' + gravity;
    update();
});