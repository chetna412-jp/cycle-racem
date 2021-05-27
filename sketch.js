
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var girl,girl_running,girl_collided,girlImage;
 var street,streetImg;
var ground,ground_image,invisible_ground;
var gameOver,restart,gameOverImage,restartImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var jumpSound,dieSound,checkpointSound;
 
function preload(){
  ground_image=loadImage("background 2.png");
  girl_running=loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png","Run (11).png","Run (12).png","Run (14).png","Run (15).png","Run (16).png","Run (17).png","Run (18).png","Run (19).png","Run (20).png");
  
  girl_collided=loadImage("Dead (30).png");
  girlImage=loadImage("Idle (1).png");
  gameOverImage=loadImage("game over2.png");
  restartImage=loadImage("reset 2.jpg");
 obstacle1=loadImage("covid.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")

}

function setup(){
  createCanvas(504,470);
  
  ground=createSprite(0,230,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=0.5;
  
  
   ground.velocityX=-1
  girl=createSprite(40,370,600,10);
  girl.addAnimation("girl_running",girl_running);
  girl.addImage("girl_collided",girl_collided);
  girl.addImage("girlImage",girlImage);
  girl.scale=0.2;
  
  girl.debug=false;
  girl.setCollider("rectangle",0,0,girl.width,girl.height);
  
  invisible_ground=createSprite(300,420,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(270,150);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  
  restart = createSprite(280,200);
  restart.addImage(restartImage);
  restart.scale=0.2
  
  obstaclesGroup=new Group();
  
  score=0;
  
}

function draw(){
  background(0);
  
  
    girl.velocityY = girl.velocityY + 0.8;
  girl.collide(invisible_ground); 
  
  
  
    if (gameState===PLAY){
      gameOver.visible=false;
    restart.visible=false;

      score = score + Math.round(getFrameRate()/60);

      spawnObstacles();
      
      ground.velocityX = -(4 + 3* score/100);
    
      if (ground.x < 80){
        ground.x = 470;
      }
     
      if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
      
      if((keyDown("space")&& girl.y >= 220)) {
     girl.velocityY = -12;
       jumpSound.play(); 
      }
      
        if (girl.isTouching(obstaclesGroup)||girl.y>500){
          gameState=END;
      dieSound.play();
        }
      
  }
  
     else if ( gameState===END) {
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX = 0;
       girl.velocityY = 0 
      girl.changeImage("girl_collided",girl_collided);
       
       
       obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
     
       if(mousePressedOver(restart)) {
        reset();
      }
  }

  
  
  drawSprites();
      fill("black");
  textFont("itallic");
    textSize(26);
     text("Score collected: "+ score, 150,50);

}

    function reset(){
    gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  girl.changeAnimation("girl_running",girl_running);
    obstaclesGroup.destroyEach();
    score=0;
    
}

  



function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(400,390,10,40);
   obstacle.velocityX = -6 ;
   
  
    //generate random obstacles
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
     
   obstacle.scale=0.2;
      obstaclesGroup.add(obstacle);
     
    obstacle.debug=false;
obstacle.setCollider("circle",1,0,0);
   }
}

function serve(){
  player.velocityX=3;
  player.velocityY=4;
}
