(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 400;
var height = 200;

canvas.width = width*2;
canvas.height = height*2;
canvas.style.width = width;
canvas.style.height = height;
ctx.scale(2,2);

var colors = ['orange','olive','orangered','teal','black'];
var boxCount = 400;
var boxes = [];
for(i=0; i<boxCount; i++){
  var x = width/2;
  var w = Math.random()+3;
  boxes.push({
    x: 50,
    y: 80,
    width: 1,
    height: 1,
    nextX: Math.random()*width,
    nextY: Math.random()*height,
    color: colors[Math.floor(Math.random() * colors.length)],
    vel: Math.random()*2
  });
}

var loopCount = 0;
function update() {
  loopCount++;
  if(loopCount>700){
    requestAnimationFrame(update);
    window.cancelAnimationFrame();
  }
    for (var i = 0; i < boxes.length; i++){
      randomMovement(boxes[i]);
      ctx.fillStyle = boxes[i].color;
      ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);//draw boxes
      if(loopCount>500){
        if(boxes[i].vel>0){
          boxes[i].vel -= .01;
        }
      }
    }
    ctx.fillStyle = 'white';
    ctx.font = "40px Arial";
    ctx.fillText("JULIA UHR", 50, 100);
    requestAnimationFrame(update);
}

var far = 60;
function randomMovement(box){
  var velocity = box.vel;
  var dx = box.nextX - box.x;
  var dy = box.nextY - box.y;

  if(Math.abs(dx+dy) < 5){
    var nx = Math.floor(Math.random() * (far+far+1))-far;
    var ny = Math.floor(Math.random() * (far+far+1))-far;
    if(box.x+nx>0 && box.x+nx<width){
      box.nextX = box.x+nx;
    }else{
      box.nextX = box.x-nx;
    }
    if(box.y+ny>0 && box.y+ny<height){
      box.nextY = box.y+ny;
    }else{
      box.nextY = box.y-ny;
    }
  }else{
    var angle = Math.atan2(dy, dx);
    var xVelocity = velocity * Math.cos(angle);
    var yVelocity = velocity * Math.sin(angle);
    box.x += xVelocity;
    box.y += yVelocity;
  }
}

window.addEventListener("load", function () {
  update();
});
