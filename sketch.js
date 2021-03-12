const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bg,munnabhai,mbph;
var score,ground,groundImg;
var platform,arrow,slingbow;
var fman,manf,apple1;
var gameState = "onSling";

function preload() {
   bg = loadImage("sprites/bg1.png");
   groundImg = loadImage("sprites/ground1.png");
   mbph = loadImage("sprites/archer.png");
   manf = loadImage("sprites/mans.png");
 }

function setup() {
  var canvas = createCanvas(1500,600);
  engine = Engine.create();
  world = engine.world;

   score = 0;

   munnabhai = createSprite(225,302,10,10);
   munnabhai.addImage(mbph);

   fman = createSprite(1250,352,10,10);
   fman.addImage(manf);
   fman.scale = 0.6;

   ground = new Ground(600,580,1800,80);

   apple1 = new Apple(1340,105);

   platform = new Ground(1340,155,50,20);

   arrow = new Arrow(200,200);
   slingbow = new SlingShot(arrow.body,{x:200, y:200});
   
}

function draw() {
    background(bg);        

    fill("white");
    stroke("orange");
    textSize(25);
    text("score:"+ score,450,50);

   Engine.update(engine);
   ground.display();

   platform.display();

  apple1.display();

  drawSprites();
  slingbow.display();
  arrow.display();
 
  apple1.score();

}

function mouseDragged(){
  // if (gameState!=="launched"){
      Matter.Body.setPosition(arrow.body, {x: mouseX , y: mouseY});
  // }
}

function mouseReleased(){
  slingbow.fly();
  gameState = "launched";
}

function keyPressed(){
  if(keyCode === 32){
   arrow.trajectory=[];
   slingbow.attach(arrow.body);
  }
}

