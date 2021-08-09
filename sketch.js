var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png", "ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  //spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300);
  ghost.addAnimation("Ghost", ghostImg);
  ghost.scale = 0.3;


  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();
}

function draw() {
  spookySound.play()
  background(200);
  if (gameState == "play") {

    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 50;
    }


    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 50;
    }

    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }

    if (ghost.isTouching(climbersGroup)) {
      ghost.velocityY = 0;
    }

    ghost.velocityY = ghost.velocityY + 0.4;

    if (ghost.isTouching(invisibleBlockGroup) || ghost.y > 600) {
      gameState = "end";
    }
    spawn_obstacles();
    drawSprites();
  }

  else if (gameState == "end") {
    background("black");
    textSize(40);
    text("GAME OVER", 200, 300);
  }
}


function spawn_obstacles() {
  if (frameCount % 120 == 0) {
    door = createSprite(random(100, 500), -50)
    door.addImage(doorImg);
    door.velocityY = 3;
    doorsGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth += 1;

    climber = createSprite(door.x, 0);
    climber.addImage(climberImg);
    climber.velocityY = 3;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(climber.x, 0, climber.width, 10);
    invisibleBlock.velocityY = 3;
    invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);
  }

}




