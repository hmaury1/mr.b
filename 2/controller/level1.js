frameIndex = 0,
tickCount = 0,
ticksPerFrame = 10;
numberOfFrames = 10;

PlayerOrientation = 'R';

function update() {
    // check keys
    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            new Audio('sound/jumping.mp3').play();
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39]) {
        // right arrow
        PlayerOrientation = 'R'
        if (player.velX < player.speed) {            
            player.velX++;         
        }     
    }     
    
    if (keys[37]) {         
        // left arrow 
        PlayerOrientation = 'L'        
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
 
    player.velX *= friction;
    player.velY += gravity;
 
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    
    
    
    player.grounded = false;
    for (var i = 0; i < platforms.length; i++) {
        
            var backgroundWall = new Image();
            backgroundWall.src = "img/wall red.png" ;
            ctx.fillStyle = ctx.createPattern(backgroundWall, 'no-repeat');
            ctx.drawImage(backgroundWall, 4, 4, 44, 44, platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
            /*ctx.fillStyle = "white";
            ctx.rect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);*/
 
        var dir = colCheck(player, platforms[i]);
 
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
 
    }
    if(player.grounded){
         player.velY = 0;
    }
 
    player.x += player.velX;
    player.y += player.velY;

    ctx.fill();

    var backgroundPlayer = new Image();
    backgroundPlayer.src = PlayerOrientation === 'R' ? "img/ghost_right.png" : "img/ghost_left.png";
    ctx.fillStyle = ctx.createPattern(backgroundPlayer, 'repeat');
    ctx.drawImage(backgroundPlayer, 12, 8, 38, 49, player.x, player.y, player.width, player.height);

    if (coins.length > 0) {
        for (var i = 0; i < coins.length; i++) {
            if(coins[i].show) {
                var dir = colCheck(player, coins[i]);
    
                if(dir) {
                    new Audio('sound/Coin-pick-up.mp3').play();
                    coins[i].show = false;
                    document.getElementById("coins").innerHTML +='<img class="coin" src="img/coin.svg"/>';
                } else {
                    var background = new Image();
                    background.src = "img/coin-sprites.png";
                    ctx.fillStyle = ctx.createPattern(background, 'repeat');
                    ctx.drawImage(
                        background,
                        frameIndex * 44,
                        0,
                        44,
                        44,
                        coins[i].x,
                        coins[i].y,
                        44,
                        44);
                }
            }
        }

        coins = coins.filter(c => c.show);

        tickCount += 1;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;

            if (frameIndex < numberOfFrames - 1) {	
                // Go to the next frame
                frameIndex += 1;
            }
            else {
                frameIndex = 1;
            }
        }

        //document.getElementById('xValue').innerHTML = 'x: ' + ~~player.x;
        //document.getElementById('yValue').innerHTML = 'y: ' + ~~player.y;
        
        requestAnimationFrame(update);
    } else {
        document.getElementById('canvas').setAttribute('style', 'display:none;')
        document.getElementsByClassName('game-over')[0].setAttribute('style', 'display:block;')
    }
    
   
}
 
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
 
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
 
window.addEventListener("load", function () {
    //document.getElementById('speedValue').innerHTML = ' speed: ' + player.speed;
    //document.getElementById('frictionValue').innerHTML = ' - friction: ' + friction;
    //document.getElementById('gravityValue').innerHTML = ' - gravity: ' + gravity;
    update();
});