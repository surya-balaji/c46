var dot, dotImage
var obstacle1, obstacle2, obstacle3, obstaclesGroup, obstacleBreaking
var spaceship
var obstacle1Image, obstacle2Image,obstacle3Image, spaceshipImage
var obstacleFrequency
var planet, planetImage, planetEdge
var winSound
var score = 99;
var life = 3;
var gameState = 1;

function preload() {
  spaceshipImage = loadImage("spaceship.png");
  obstacle1Image = loadImage("asteroid.png");
  dotImage = loadImage("reticle.png");
  planetImage = loadImage("planet.png");

  winSound = loadSound("fireCrackers.mp3");
  obstacleBreaking = loadSound("obstacle breaking.mp3");
}

function setup() {
  createCanvas(1000,1000);

  dot = createSprite(500,500,10,10); 
  dot.shapeColor = "white";

  obstaclesGroup = new Group;

  spaceship = createSprite(0,500,100,600);

  planet = createSprite(1500,500,100,100);
  planet.addImage(planetImage);
  planet.scale = 2.5

  planetEdge = createSprite(500,500,20,20);
  planetEdge.visible = false;
}

function draw() {
  background("black");
  stroke("blue");
  text("Score: "+ score,20,20); 
  stroke("green");
  text("life: "+ life,20,40);

  spaceship.addImage(spaceshipImage);
  spaceship.scale = 1.5

  dot.addImage(dotImage);
  dot.scale = 0.05

  if(gameState === 1) {
    dot.x = mouseX;
    dot.y = mouseY;

    /*
    if(dot.isTouching(obstaclesGroup)) {
      obstaclesGroup.destroyEach();
      score = score + 1
      if(score % 10 === 0) {
        life = life + 1
      }
      if(score === 100) {
        gameState = 3
      }
    }
    */
   for(i=0;i<obstaclesGroup.length;i++) {
      if(mousePressedOver(obstaclesGroup.get(i))) {
      obstaclesGroup.get(i).destroy();
      score = score + 1
      
      
      obstacleBreaking.play();
      //obstacleBreaking.loop = false;
      if(score % 10 === 0) {
        life = life + 1
      }
      if(score === 100) {
        gameState = 3
      }
      }
   }
   /*for(i = obstaclesGroup.length- 1; i >=0 ; i--){

   }*/
    if(obstaclesGroup.isTouching(spaceship)) {
      life = life - 1;
      obstaclesGroup.destroyEach();
    }

    if(life === 0) {
      gameState = 2
    }
    
    
  }
  else if(gameState === 2) {
    text("Game Over",250,250);
    text("Press r to restart",250,275);

    obstacle1.lifetime = -1;
    obstacle1.velocityX = 0;

    if(keyDown("r")) {
      gameState = 1
      life = 3
      score = 0
    }
  }
  else if(gameState === 3) {
    planet.velocityX = -4;
    winSound.loop = false;
    
    winSound.play();
    if(planet.isTouching(planetEdge)) {
      planet.velocityX = 0;
      text("You Win",250,250);
      text("Press r to restart",250,275);
    }
    obstacle1.lifetime = -1;
    obstacle1.velocityX = 0;

    if(keyDown("r")) {
      gameState = 1
      life = 3
      planet.x = 1500
      planet.y = 500
      score = 0;
    }
  }

  spawnObstacles();
  drawSprites();
}

function spawnObstacles() {
  if(frameCount%120 === 0) {
    obstacle1 = createSprite(900,random(200,500),50,50);
    obstacle1.velocityX = -4 - score/10;
   /* if(score % 5 === 0) {
      obstacle1.velocityX = obstacle1.velocityX - 4
    }*/

    obstaclesGroup.add(obstacle1);

    obstacle1.addImage(obstacle1Image);
    obstacle1.scale = 0.3
    
    obstacle1.lifetime = 300;
  }
}