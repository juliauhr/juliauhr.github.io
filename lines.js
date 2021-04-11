(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 400;
var height = 30;

canvas.width = width;
canvas.height = height;
canvas.style.width = width;
canvas.style.height = height;
//ctx.scale(2,2);

var pointCount = 10;
var lines = [[],[]];

for(i=0; i<lines.length; i++){
  for(j=0; j<pointCount; j++){
    if(j==pointCount){
      ny = 25;
    }else{
      ny = Math.random()*(height-2);
    }
    lines[i].push({
      x: j*30+60,
      y: Math.random()*height,
      nextY: ny
    });
  }
};

var loopCount = 0;

function update() {
  var done = true;
  ctx.clearRect(0,0,width,height);
  loopCount++;
  for(var i=0; i<lines.length; i++){
    ctx.beginPath();
    ctx.moveTo(0, height/2);
    for (var j=0; j < lines[i].length; j++){
      move(lines[i][j]);
      ctx.lineTo(lines[i][j].x, lines[i][j].y);
      if(lines[i][j].y<lines[i][j].nextY){
        done = false;
      }
    }
    ctx.lineTo(width-1, height/2);
    ctx.stroke();
  }
  if(done){
    window.cancelAnimationFrame();
  }
  requestAnimationFrame(update);
}

function move(point){
  if(point.y<point.nextY+1){
    point.y+=.5;
  }else if(point.y>point.nextY-1){
    point.y-=.5;
  }
}

window.addEventListener("load", function () {
  update();
});
