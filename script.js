// Canvas Setup
var canvas = document.querySelector("canvas");

canvas.height = window.innerHeight - 130;
canvas.width = window.innerWidth - 30;

var c = canvas.getContext("2d");

var circles = [];

var slider = document.getElementById("circleSlider");

var circleCount = slider.value;

const radianInc = 0.02;

var radianCount = 0;

function Circle(relX, relY, dx, dy, radius, radians, radianOrientation, distFromCenter) {
  this.x = relX;
  this.y = relY;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.radians = radians;
  this.radianOrientation = radianOrientation;
  this.distFromCenter = distFromCenter;

  this.draw = function() {
    c.beginPath();
    c.fillStyle = "rgb(0,0,0)";
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  }

  this.update = function() {
    this.draw();
    this.radians += radianInc;
    this.x = canvas.width / 2 + (this.distFromCenter * (Math.cos(this.radians) * Math.cos(this.radianOrientation)));
    this.y = canvas.height / 2 + (this.distFromCenter * (Math.cos(this.radians) * Math.sin(this.radianOrientation)));
  }
}

function init() {
  circles = [];
  for (var i = 0; i < circleCount; i++) {
    circles.push(new Circle(-100, -100, 0, 0, 10, radianCount + (Math.PI / circleCount) * i, (Math.PI / circleCount) * i, 250));
    console.log(circles[i].radianOrientation);
  }
}

function animate() {
  requestAnimationFrame(animate);
  // console.log("foo");
  c.clearRect(0, 0, canvas.width, canvas.height);

  // center circle
  c.beginPath();
  c.strokeStyle = "rgb(256,256,256)";
  c.lineWidth = 5;
  c.arc(canvas.width / 2, canvas.height / 2, circles[1].distFromCenter + (circles[1].radius / 2) + 5, 0, Math.PI * 2, false);
  c.stroke();

  c.font = "30px Arial";
  c.textAlign = "center";
  c.fillText(circleCount, canvas.width / 2, canvas.height / 2);

  radianCount += radianInc;

  if (slider.value != circleCount) {
    console.log("changing");
    circleCount = slider.value;
    init();
  }

  // update all circles
  for (var i = 0; i < circleCount; i++) {
    circles[i].update();
  }
}

init();
animate();
