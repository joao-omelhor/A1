var fundoImg, fundo;
var inimigoImg, inimigo;
var jakeImg, jake;
var coinImg, coin;
var explosaoImg, explosao; 

var coinGroup;
var inimigoGroup;

var score = 0;
var life = 3;

var gameState = "play";

function preload() {
  fundoImg=loadImage("img/bg.jpeg")
  inimigoImg=loadImage("img/Guard.webp")
  jakeImg=loadAnimation("img/jake.png")
  explosaoImg=loadAnimation("img/explosao.png")
  coinImg=loadImage("img/coin.png")
}


function setup() {
  createCanvas(800,800);
  fundo=createSprite(400,400);
  fundo.addImage(fundoImg);
  fundo.scale=6

  jake=createSprite(400,600);
  jake.addAnimation("jake",jakeImg);
  jake.addAnimation("explosao",explosaoImg);
  jake.scale=0.1

  coinGroup=new Group()
  inimigoGroup=new Group()


}

function draw() {
  background(0);

  

  if (gameState=="play") {
    fundo.velocityY=6;
    if (fundo.y>800) {
      fundo.y=400
    }
    if (keyDown("RIGHT_ARROW")) {
      jake.x=jake.x+5
    }
    if (keyDown("LEFT_ARROW")) {
      jake.x=jake.x-5
    }
    if (keyDown("DOWN_ARROW")) {
      jake.y=jake.y+5
    }
    if (keyDown("UP_ARROW")) {
      jake.y=jake.y-5
    }
    removeLife()
    removeCoins()
    spawnAliens()
    spawnCoins()

    if (life==0) {
      gameState="end"
    }
  }
  if (gameState=="end") {
    inimigoGroup.destroyEach()
    coinGroup.destroyEach()
    fundo.velocityY=0
    jake.velocityX=0
    jake.changeAnimation("explosao",explosaoImg)

  }
  fundo.depth-=1
  drawSprites();
  if (gameState=="end") {
    textSize(60)
    fill("black")
    text("Fim de jogo",250,400)
  }
  textSize(30)
    fill("black")
    text("vidas "+ life,60,100)
    textSize(30)
    fill("black")
    text("placar "+ score,60,150)
  
}

function spawnAliens() {
  if (frameCount%80==0) {
    inimigo=createSprite(random(30,600),random(10,400))
    inimigo.addImage(inimigoImg)
    inimigo.velocityY=3
    inimigo.scale=0.5
    inimigo.lifetime=800
    inimigoGroup.add(inimigo)
  }
  
}

function spawnCoins() {
  if (frameCount%80==0) {
    coin=createSprite(random(10,790),random(10,500))
    coin.addImage(coinImg)
    coin.velocityY=3
    coin.scale=0.1
    coin.lifetime=800
    coinGroup.add(coin)
  }
 
}

function removeCoins() {
  jake.overlap(coinGroup,function (collector,collected) {
    score+=1
    collected.remove()
  })
}

function removeLife() {
  jake.overlap(inimigoGroup,function (collector,collected) {
    life-=1
    collected.remove()
  })
 }