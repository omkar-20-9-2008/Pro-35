var bg;
var balloon;
var b1,b2,b3;
var database;
var position;

function preload(){

  bg=loadImage("Hot Air Ballon-01.png");
  b1=loadImage("Hot Air Ballon-02.png");
  b2=loadImage("Hot Air Ballon-03.png");
  b3=loadImage("Hot Air Ballon-04.png");


}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(800,500);
  balloon = createSprite(70, 400, 50, 50);
  balloon.addAnimation("hotAirBallon",b1);
  balloon.scale = 0.4;

  var balpos = database.ref('balloon/height');
  balpos.on("value",readPosition, showError);



}

function draw() {
  background(bg); 
  
  fill("red");
  textSize(20);
  stroke("yellow");
  text("Use ARROW KEYS to move the balloon. ",10,50)

  if(keyDown (UP_ARROW)) {
    updateHeight(0,-10);
    balloon.addAnimation ("hotAirBalloon", b2);
    balloon.scale=balloon.scale -0.01;
    }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation ("hotAirBalloon", b3);
    balloon.scale=balloon.scale -0.01;    
  }
  else if(keyDown(LEFT_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation ("hotAirBalloon", b4);
    balloon.scale=balloon.scale -0.01;  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation ("hotAirBalloon", b2);
    balloon.scale=balloon.scale -0.01;  }



  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing database;")
}
