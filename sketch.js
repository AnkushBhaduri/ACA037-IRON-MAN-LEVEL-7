
// declaring global variables
var bg, backgroundImg,ground;
var ironman, stones, stoneImg;
var diamondImage, diamondsGroup, diamondsScore=0, diamondSound;
var spikeImg;
var gameState= "PLAY";
var restart, restartImg;
// function preload used to load game elements
function preload() {
 backgroundImg = loadImage("images/bg.jpg");
 ironmanImg= loadImage("images/iron.png");
 stoneImg= loadImage("images/stone.png");
 diamondImage= loadImage("images/diamond.png");
 diamondSound= loadSound("sounds/coinSound.mp3");
 spikeImg= loadImage("images/spikes.png");
 diesound= loadSound("sounds/dieSound.mp3");
 restartImg= loadImage("images/restart.png");
}
// function setup used to create sprites and define canvas for game elements
function setup() {
  // creating canvas of game for 1000*600 pixels
 createCanvas(1000, 600);
 // creating sprite for background image
 bg = createSprite(580,300);
 // creating sprites for ironman
 ironman=createSprite(185,525,20,20);
 ironman.scale=0.3;
 ironman.addImage(ironmanImg);
 restart= createSprite(500,300);
 restart.addImage(restartImg);
 restart.visible=false;
 // creating sprites for ground
 ground=createSprite(200,585,1500,100);
 ground.visible=false;
 //bg.velocityY= 6;
 bg.addImage(backgroundImg);
 bg.scale =1.5;
 // creating new groups for game elements
 stonesGroup = new Group();
 diamondsGroup= new Group();
 spikesGroup= new Group();
 ironman.debug=true;
}

function draw() {
  if (gameState==="PLAY"){
    ironman.setCollider("rectangle", 0, 0, 200,500);
    ironman.scale=0.3;
    bg.velocityY=6;
  // used to create a continuously spawnning background
  if (bg.y >550){
    bg.y = bg.height/4;
   }
   // prevent ironman to go oustide y axis
   if (ironman.y< 100){
     ironman.y=100;
   }
   // prevent ironman to go outside x axis
   if (ironman.x< 100){
    ironman.x=100;
  }

  //makes ironman move upward
   if(keyDown("up")){
     ironman.velocityY= -10
   };
  // makes ironman move left
   if(keyDown("left")){
    ironman.velocityX= -8
  };
  // makes iroman move towards the right
  if(keyDown("right")){
    ironman.velocityX= 8
  }
  // brings iroman downwards
  if(keyDown("down")){
    ironman.velocityY=16
  }
  // stops ironman from moving
  if(keyDown("space")){
    ironman.velocityY=0;
    ironman.velocityX=0;
  }
  // general velocity for ironman
  ironman.velocityY+= 0.5;
  // make ironman stand on the ground
  ironman.collide(ground);
  // calling generateStones() function
  generateStones ();
  // calling generateDiamonds() function
  generateDiamonds ();
  // calling generateSpikes() function
  generateSpikes ();
  // letting ironman stand on the stones
  for (var i=0; i< (stonesGroup).length ; i++){
    var temp =(stonesGroup).get(i);
    if(temp.isTouching(ironman)){
      ironman.collide(temp)
    }
  }
  // letting ironman collect diamonds
  for( var j=0; j<(diamondsGroup).length; j++){
    var temp2= (diamondsGroup).get(j);
    if (temp2.isTouching(ironman)){
      diamondSound.play();
      diamondsScore++;// increase the score as ironman collects the diamonds
      temp2.destroy();
      temp2=null;

    }
  }
  // letting ironman touch the spikes and lose score
  for (var x=0; x<(spikesGroup).length; x++){
    var temp3= (spikesGroup).get(x);
    if (temp3.isTouching(ironman)){
      diamondsScore= diamondsScore-5;// losing score created
      temp3.destroy();
      temp3=null;
    }
  }
  if (diamondsScore <= -10 || ironman.y > 610){
    diesound.play();
    gameState="END";
  }
}
else if(gameState==="END"){
  bg.velocityY=0;
  ironman.velocityX=0;
  ironman.velocityY=0;
  stonesGroup.setVelocityXEach(0);
  diamondsGroup.setVelocityXEach(0);
  spikesGroup.setVelocityXEach(0);
  stonesGroup.setLifetimeEach(-1);
  diamondsGroup.setLifetimeEach(-1);
  spikesGroup.setLifetimeEach(-1);
  restart.visible=true;
  if (mousePressedOver(restart)){
    restartGame();
  }
}
 
  drawSprites();
    textSize(20);// used to display size of text of score
    fill("white");
    text(" Diamonds Collected:   " + diamondsScore ,500,50)// used to display the score
   
}
// used for generating stones
function generateStones(){
  if (frameCount%50===0){
    // creating sprites of Stones
    var stone= createSprite(1200,120,40,10);
    // craeting the stones in random locations based on the values randomly
    stone.x=random(50,450);
    stone.addImage(stoneImg);
    stone.scale=0.5;
    stone.velocityY= 5;
    stone.lifetime=250;
    stonesGroup.add(stone);
  }}
// used to generate Diamonds
function generateDiamonds(){
  if (frameCount%50===0){
    // creating sprites of each diamond
    var diamond2= createSprite(1200,120,40,10);
    diamond2.x= Math.round(random(80,950));
    diamond2.addImage(diamondImage);
    diamond2.scale=0.5;
    diamond2.velocityY= 6;
    diamond2.lifetime=2000;
    diamondsGroup.add(diamond2);
  }
}
// used to generate Spikes
function generateSpikes(){
  if (frameCount%100===0){
    //creating sprites of each spike
    var spike= createSprite(1250,115,40,10);
    // 955 used to increase the permissible area of canvas where the spikes can occur instead of 155
   spike.x= Math.round(random(45,955));
   spike.addImage(spikeImg);
   spike.scale=0.7;
   spike.velocityY= 5;
   spike.lifetime=2000;
   spikesGroup.add(spike);
   
  }
}
function restartGame(){
  gameState="PLAY";
  ironman.y=100;
  ironman.x=100;
  diamondsGroup.destroyEach();
  spikesGroup.destroyEach();
  stonesGroup.destroyEach();
  restart.visible=false;
  diamondsScore= 0;
  ironman.debug=false;
}