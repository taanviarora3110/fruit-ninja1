//game states
var PLAY=1;
var END=0;
var gameState=1;
//creating variables
var sword,sword_image;
var fruit,fruit1,fruit2,fruit3,fruit4;
var monster,monster1Image,monster2Image;
var gameOverImage;
//creating groups for fruits and enemy
var fruitGroup;
var enemyGroup;
//creating variable for score
var score;

function preload(){
  //loading images for different variables
sword_image=loadImage("sword.png");
fruit1=loadImage("fruit1.png");
fruit2=loadImage("fruit2.png");
fruit3=loadImage("fruit3.png");
fruit4=loadImage("fruit4.png");
  monster1Image=loadImage("alien1.png");
  monster2Image=loadImage("alien2.png");
  gameOverImage=loadImage("gameover.png");
}




function setup(){
  //creating canvas
  createCanvas(windowWidth,windowHeight);
  //creating sprite for sword
sword= createSprite(40,200,20,20);
  //adding animation to the sword
sword.addImage(sword_image);
 // scaling the image
sword.scale=0.7;
  //setting collider for sword
  sword.setCollider("rectangle",0,0,40,40);
  //creating group for fruits and enemy
 fruitGroup= createGroup();
enemyGroup=createGroup();
  //setting score to 0
  score=0;
}





function draw(){
  //giving background
background("lightBlue");
  
  //move sword with mouse
sword.y=mouseY;
  sword.x=mouseX;
  
  if(gameState===PLAY){
    //increasing the score if fruitGroup is touching sword
    if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+2;
    }
 // calling fruits and enemy function
   fruits();
  enemy();}
  if(enemyGroup.isTouching(sword)){
    gameState=END;}
 
    
  
  if(gameState===END){
    //destroying enemy and fruit groups in end state
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
  
   //setting velocityX of fruit and enemy group to 0
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
   //setting velocity X and Y of sword to 0
    sword.velocityX=0;
    sword.velocityY=0;
  // adding gameOver image to sword
    sword.addImage(gameOverImage);
   //reposition the gameOver image
    sword.x=300;
    sword.y=200;
   //resetting the score to 0
    score=0;
    
  }
  
text("Score:"+score,530,50);
  

  drawSprites();
 
}
function fruits(){
   
if(World.frameCount%80===0){
fruit=createSprite(400,200,20,20);
fruit.scale=0.2;
  fruit.velocityX=-7;
  //fruit.debug=true;
  r=Math.round(random(1,4));
  if(r===1){
    fruit.addImage(fruit1);
  }else if(r===2){
    fruit.addImage(fruit2);
  } else if(r===3){
fruit.addImage(fruit3);
  }else {
    fruit.addImage(fruit4)
    }  
 fruit.y=Math.round(random(50,340));
  

 fruit.setLifetime=100;
  
fruitGroup.add(fruit);
     
  }
}

function enemy(){
if(World.frameCount%200===0){
  monster=createSprite(400,200,20,20);
   if(r===1){
    monster.addImage(monster1Image);
  }else
    monster.addImage(monster2Image);
  //enemy.debug=true;
  monster.y=Math.round(random(100,300));
  monster.velocityX=-8;
  monster.setLifetime=50;
  enemyGroup.add(monster);
}
}