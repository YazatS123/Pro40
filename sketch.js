var car, ch, obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacles, enemy, coin, coinGroup, cane, coinIm, score, time, gameover, gameOverImage;
var PLAY = "play";
var END = "End";
var GameState = PLAY;
var me, obstacleGroup;
var lane1, lane2, lane3, lane;
function preload(){
  car = loadImage("Ch.png");
  obstacle1 = loadImage("Obstacle1.png");
  obstacle2 = loadImage("Obstacle2.png");
  obstacle3 = loadImage("Obstacle3.png");
  obstacle4 = loadImage("Obstacle4.png");
  coinIm = loadImage("gold.png");
  gameOverImage = loadImage("gameover.png");
  //track = loadImage("track.jpg");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  ch = createSprite(windowWidth/2, windowHeight - 90, windowWidth/20, windowHeight/20);
  score = 0;
  time = 0;
  gameover = createSprite(windowWidth/2, windowHeight/2, 5, 5);
  gameover.addImage("gameover", gameOverImage);
  gameover.visible = false;
  ch.addImage("character", car);
  ch.scale = 0.5;
  me = windowWidth/3;
  lane1 = me/2;
  lane2 = me + me/2;
  lane3 = me + me + me/2;
  ch.x = lane2;
  obstacles = new Group();
  coinGroup = new Group();
}
function draw() {
  background(255);
  fill("black");
  camera.position.y = camera.position.y - 5;
  ch.x = ch.x - 5;
  for(var i = 1; i <= windowHeight; i = i + 25){
    line(me, i, me, i + 10);
    line(me + me, i, me + me, i + 10);
  }
  if(GameState === PLAY){
    gameover.visible = false;
    time = time + Math.round(frameCount/69);
    if(keyDown("1") && ch.x === lane2){
    ch.x = lane1;
  }
  if(keyDown("2")){
    ch.x = lane2;
  }
  if(keyDown("3") && ch.x === lane2){
    ch.x = lane3;
  }
    if(coinGroup.isTouching(ch)){
      console.log("Yay!")
      coinGroup[0].destroy();
      score = score + 1;
    }
    if(obstacles.isTouching(ch)){
      console.log("Oh, no...");
      GameState = END;
      obstacles.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
      obstacles.setVelocityYEach(0);
      coinGroup.setVelocityYEach(0);
    }
    spawnEnemies();
    SpawnCoins();
    
  }
  else if(GameState === END){
    gameover.visible = true;
    gameover.depth = ch.depth + 2;
    if(mousePressedOver(gameover)){
      reset();
    }
  }
  text("Time: " + time, windowWidth - windowWidth + 20, windowHeight - windowHeight + 20);
  text("Score: " + score, windowWidth - windowWidth + 20, windowHeight - windowHeight + 40);
  drawSprites();
}
function spawnEnemies(){
  if(frameCount % 95 === 0){
    enemy = Math.round(random(1, 3));
    obstacle = createSprite(windowWidth/2, windowHeight - windowHeight - 100, 20, 20);
    switch(enemy){
      case 1:
        obstacle.addAnimation("1", obstacle2);
        obstacle.scale = 0.125;
        break;
        case 2:
        obstacle.addAnimation("2", obstacle3);
        obstacle.scale = 0.5;
        break;
        case 3:
        obstacle.addAnimation("3", obstacle1);
        obstacle.scale = 0.5;
        break;
        //default: break;
    }
    lane = Math.round(random(1, 3));
    switch(lane){
          case 1:
            lane = lane1;
        break;
        case 2:
        lane = lane2;
        break;
        case 3:
        lane = lane3;
        break;
        default: break;
    }
    obstacle.x = lane;
    //obstacle.velocityY = 5;
    obstacle.lifetime = 200;
    obstacle.depth = ch.depth;
    obstacle.depth = obstacle.depth - 1;
    obstacles.add(obstacle);
  }
}
function SpawnCoins(){
  if(frameCount%50 === 0){
    coin = createSprite(lane2, -50, 20, 20);
    coin.addImage("coin", coinIm);
    coin.scale = 0.125;
    cane = Math.round(random(1, 3));
    switch(cane){
      case 1:
        cane = lane1;
        break;
        case 2:
        cane = lane2;
        break;
        case 3:
        cane = lane3;
        break;
        default: break;
    }
    coin.x = cane;
    //coin.velocityY = 5;
    coin.lifetime = 215;
    coin.depth = ch.depth - 1;
    coinGroup.add(coin);
  }
}
function reset(){
  gameover.visible = false;
  score = 0;
  time = 0;
  obstacles.destroyEach();
  coinGroup.destroyEach();
  GameState = PLAY;
  frameCount = 0;
}