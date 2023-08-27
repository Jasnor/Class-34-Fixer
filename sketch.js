const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bunny,bunnyImg,sad,eat;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls = [];

function preload() {
  backgroundImg = loadImage("nature pic.png");
  towerImage = loadImage("./assets/tower.png");
  bunnyImg = loadImage("blink_1.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  cannon = new Cannon(180, 110, 130, 100, angle);

  var options = {
    isStatic:true
  }
  bunny = Bodies.rectangle(1000,500,30,30,options);
  World.add(world,bunny);
  bunny.scale = 0.9
}

function draw() {
  background(189);
  imageMode(CENTER);
  image(backgroundImg, 600,300, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  image(bunnyImg, bunny.position.x, bunny.position.y,120,100);

  cannon.display();

  for(var i=0; i<balls.length; i++){
    showCannonBall(balls[i])
  }
}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length-1].shoot();
  }
}

function keyPressed(){
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBall(ball){
  if(ball){
    ball.display();
  }
}

  if(Collision(cannonBall,ground.body) == true){
    bunny.changeAnimation("sad")
   }

   if(Collision(fruit,bunny) == true){
    bunny.changeAnimation("eat")
   }

