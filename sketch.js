var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombis;
var zombi1;
var live = 200;
var zombies;
var disparo;
var disparoimg;
var rafaga;
var zombi2img;
var zombi3img;
var zombi2;
var zombi3;
var zombi2g;
var zombi3g;
var score = 0;
var gameState = "play"
var risa_zombi;
var isrisa = true;
var explosion;
var golpe;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
zombis = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
disparoimg = loadImage("assets/bullet1.png");
zombi2img = loadImage("assets/zombie3.png");
zombi3img = loadImage("assets/z.png");
risa_zombi = loadSound("zoombi.mp3");
explosion = loadSound("explosion.mp3");
golpe = loadSound("golpe.mp3");
}

function setup() {
 
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  //bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
//bg.addImage(bgImg)
//bg.scale = 1.1
  zombies = new Group();
rafaga = new Group();
zombi2g = new Group();
zombi3g = new Group();
//creating the player sprite
player = createSprite(displayWidth-1200, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
  
   
}

function draw() {
  background(bgImg); 
  textSize(24);
  fill("black");

  if(gameState==="play"){
    text(`Puntuacion: ${score}`,width-200,50);
  
  if(keyDown("space")){
disparo_();
explosion.play();
  }
var seleccion_zombi = Math.round(random(1, 3));
if(frameCount%100==0){
  if(seleccion_zombi==1){
zombi();
  }else if(seleccion_zombi==2){
zombi_2();
  }else{
zombi_3();
  }

}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")&&player.y>displayHeight-500){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")&&player.y<displayHeight-150){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombies.collide(player)){
  live -=15;
  golpe.play();
  zombies.destroyEach();
}
if(zombi2g.collide(player)){
live -=10;
golpe.play();
zombi2g.destroyEach();
}
if(zombi3g.collide(player)){
live -=5;
golpe.play();
zombi3g.destroyEach();
}

if(zombies.collide(rafaga)){
  disparozombi(zombies);
  score +=10;
}
if(zombi2g.collide(rafaga)){
  disparozombi2(zombi2g);
  score += 15;
}
if(zombi3g.collide(rafaga)){
  disparozombi3(zombi3g);
  score +=5;
}
vida();

if (score > 119) {
    ganaste();
}
  }

  
  
  if(live<0){
    gameState = "end"
    zombies.destroyEach();
    zombi2g.destroyEach();
    zombi3g.destroyEach();
    gameOver();
    risa_zombi.play();
    delayTime(5);
    risa_zombi.setVolume(0.6);
    
  }

drawSprites();

}


function ganaste() {
  gameState = "end" 
  zombies.destroyEach();
  zombi2g.destroyEach();
  zombi3g.destroyEach();
  nextlevel();
}
function zombi(){
  
    zombi1 = createSprite(displayWidth - 150, displayHeight - 250,50,50);
    zombi1.addImage(zombis)
    zombi1.scale = 0.2
    zombi1.velocityX = -8
    zombi1.y = Math.round(random(displayHeight - 250, displayHeight - 480));
    zombies.add(zombi1)
  
}
function vida(){
  push();
  fill("white");
  rect(displayWidth/2 - 150, 50 , 200, 20);
  fill("green");
  rect(displayWidth/2 - 150, 50 , live, 20);
  if(live < 100){
    fill ("yellow");
    rect(displayWidth/2 - 150, 50 , live, 20)
  }
  if(live < 40){
    fill ("red");
    rect(displayWidth/2 - 150, 50 , live, 20)
  }
  pop();
}
function disparo_(){
disparo = createSprite(player.x, width/2 ,50 , 20);
disparo.y = player.y - 20;
disparo.addImage(disparoimg)
disparo.scale = 0.07;
disparo.velocityX = 12;
rafaga.add(disparo)
}
function disparozombi(zombies){
  zombies.destroyEach();
  rafaga.destroyEach();
}

function zombi_2(){

    zombi2 = createSprite(displayWidth - 150, displayHeight - 250,50,50);
    zombi2.addImage(zombi2img)
    zombi2.scale = 0.1
    zombi2.velocityX = -8
    zombi2.y = Math.round(random(displayHeight - 250, displayHeight - 480));
    zombi2g.add(zombi2)
  
}

function zombi_3(){
  zombi3 = createSprite(displayWidth - 150, displayHeight - 250,50,50);
  zombi3.addImage(zombi3img)
  zombi3.scale = 0.11
  zombi3.velocityX = -8
  zombi3.y = Math.round(random(displayHeight - 250, displayHeight - 480));
  zombi3g.add(zombi3)
}
function disparozombi2(zombi2g){
zombi2g.destroyEach();
rafaga.destroyEach();
}
function disparozombi3(zombi3g){
zombi3g.destroyEach();
rafaga.destroyEach();
}
function gameOver (){
  swal(
    {
      title: `Perdiste`,
      text: "¡Los Zombis te comieron!",
      imageUrl:
      "https://images.emojiterra.com/twitter/v13.1/512px/1f9df.png",
    imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function nextlevel() {
  swal({
    title: "¡Venciste a la orda zombi! Sobreviviste por ahora",
    text: "¿Juegas otra vez?",
    imageUrl:
      "https://www.seekpng.com/png/detail/163-1637361_images-of-one-unlocked-xbox-one-achievement-unlocked.png",
    imageSize: "350x350",
    confirmButtonText: "Jugar de nuevo"
  },
  function(isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }
  );
}