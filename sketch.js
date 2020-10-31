var road, roadImage;
var car, carImage;
var stone, stoneImage,stoneGroup;
var can, canImage,canGroup;
var distance;
var gameState = PLAY;
var PLAY = 1;
var END = 0;
var fuellevel,score;
var crashSound; 

function preload() {
  
 roadImage = loadImage("IMG_1100.JPG"); 
 carImage = loadImage("IMG_1101.JPG"); 
 stoneImage = loadImage("IMG_1102.JPG");
 canImage = loadImage("IMG_1103.JPG"); 
 crashSound = loadSound("car crash.mp3");
 




}

function setup() {
createCanvas(400, 400);


road = createSprite(200,200,20,20);
road.addImage("back",roadImage);
road.y = road.height/2;
road.scale = 2;  

car = createSprite(200,300,20,20);
car.addImage("car",carImage);
car.scale = 0.15;

stoneGroup = createGroup();
canGroup = createGroup();  
gameState = PLAY;

fuellevel = 10;
score=0;

}

function draw() {
  background(220);

  
  
  if(gameState === PLAY) {
  
  score = frameCount;  
    
    
    if (keyDown("left")) {
   car.x = car.x - 5;  
     }
  if (keyDown("right")) {
   car.x = car.x + 5;  
     }
  

  if (road.y > 400){
      road.y = road.height/2;
    
  
  }
  road.velocityY=10;
  
  if(frameCount % 100 === 0){
     fuellevel = fuellevel-1;
     
     }
  
    fuel();
  obsta();
  
  if(canGroup.isTouching(car)) {
   road.velocityY = road.velocityY+10;  
   canGroup.destroyEach(); 
  fuellevel = fuellevel+1;
  }
  
  if(fuellevel === 0) {
     gameState = END;
     
     }
  
    
    
    if(stoneGroup.isTouching(car)){
    gameState = END;
    crashSound.play();
    }
  }  if(gameState === END) {
    
    text("press R to reset",150,220);
    textSize(30);
    text("CRASHED",120,200);
    
    canGroup.setvelocityYEach = 0;
    stoneGroup.setvelocityYEach = 0; 
    road.visible = false;
    canGroup.destroyEach();  
    stoneGroup.destroyEach();  
    car.visible = false;
  
  if(keyDown("r"))
   reset(); 
  
  }
  
  

  
  
  
  drawSprites();
fill("white");
  text("FUEL LEVEL= " + fuellevel,30,30);
  text("DISTANCE= " + score,30,60);
}

function obsta() {
 
  if (frameCount % 100 === 0) {
    var stone = createSprite(600,-10,40,10);
    stone.x = Math.round(random(50,350))
    stone.addImage("ob",stoneImage);
    stone.velocityY = 4;
    stone.scale=0.15;
    stoneGroup.add(stone);
    stoneGroup.setLifetimeEach(400);
    
  
  
  
  
  }  
}

function fuel() {
 
  if (frameCount % 200 === 0) {
    var can = createSprite(600,-10,40,10);
    can.x = Math.round(random(50,350))
    can.addImage("fu",canImage);
    can.velocityY = 4;
    can.scale=0.07;
    canGroup.add(can);
    canGroup.setLifetimeEach(400);
 
 
  
  }
}

function reset() {
 gameState = PLAY; 
 road.visible = true; 
 fuellevel = 10;
 frameCount = 0; 
 car.visible = true;
 car.x = 200;
 car.y = 300;
}












