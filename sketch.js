var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var alien1,alienImage1
var alien2,alienImage2;
var fruit1,fruitImage1;
var fruit2,fruitImage2;
var fruit3,fruitImage3;
var fruit4,fruitImage4;
var fruitsGroup,aliensGroup;
var sword,swordImage;
var realBackground,backgroundImage;
var swordSound;
var gameOversound,gameOver,gameOverimage;
var gameSound
function preload(){
  alienImage1 = loadImage("alien1.png");
  alienImage2 = loadImage("alien2.png");
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  swordImage = loadImage("sword.png");
  backgroundImage = loadImage("cloud2.png");
  //swordSound = loadSound("Fireball-Magic-Attack-C-www.fesliyanstudios.com.mp3");
  //gameOversound = loadSound("mixkit-sad-game-over-trombone-471.wav");
  //gameSound = loadSound("audio_420ec8b569.mp3");
  gameOverImage = loadImage("gameover.png");
}

function setup(){
  createCanvas(600,600);
  realBackground = createSprite(665,350,15,15);
  realBackground.addImage(backgroundImage);
  realBackground.scale = 5;
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  //sword.debug = true;
  sword.setCollider("circle",0,0,58);

  gameOver = createSprite(665,350,15,15)
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2;
  
  fruitsGroup = createGroup();
  aliensGroup = createGroup();
  swordsGroup = createGroup();
}
  
function draw(){
  background(180);
  //gameSound.play();
  sword.y = World.mouseY;
  sword.x = World.mouseX;
  if(gameState === PLAY){
    spawnFruit();
    if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
    score = score+2;
    //swordSound.play();
  }
    spawnAlien();
    gameOver.visible = false;
  if(aliensGroup.isTouching(sword)){
    gameState = END;
    //gameOversound.play();
  }
  }
   else if (gameState === END){
     gameOver.visible = true;
     fruitsGroup.setVelocityXEach(0);
     aliensGroup.setVelocityXEach(0);
     aliensGroup.destroyEach();
     aliensGroup.setLifetimeEach(-1);
     fruitsGroup.setLifetimeEach(-1);
   }
  drawSprites();
  stroke("darkBlue");
  textSize(26);
  text("Score: "+ score, 665,30);
}

function spawnFruit(){
  if(World.frameCount%40===0){
    var fruit = createSprite(1130,600,10,10);
    fruit.velocityX = -9;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruitImage1);
              break;
      case 2: fruit.addImage(fruitImage2);
              break;
      case 3: fruit.addImage(fruitImage3);
              break;
      case 4: fruit.addImage(fruitImage4);
              break;
      default: break;
    }
    fruit.y = Math.round(random(10,695));
    fruitsGroup.add(fruit);
    fruit.scale = 0.2;
    fruit.setLifetime = 400;
  }
}

function spawnAlien(){
  if(World.frameCount%40===0){
    var alien = createSprite(1130,600,1,1);
    alien.velocityX = -(8+(score/10));
    var rand2 = Math.round(random(1,4));
    switch(rand2) {
      case 1: alien.addImage(alienImage1);
              break;
      case 2: alien.addImage(alienImage2);
              break;
      default: break;
    }
    alien.y = Math.round(random(10,695));
    aliensGroup.add(alien);
    alien.scale = 0.9;
    alien.setLifetime = 400;
  }
}