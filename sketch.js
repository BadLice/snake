var R = 20;
var player;

function setup()
{
  createCanvas(600, 600);
  player = new Player();
}

function draw()
{
  background(0);
  // drawGrid();
  player.draw();
  player.update();
}

function drawGrid()
{
  stroke(255);

  for (var x = 0; x < width / R; x++)
    line(x * R, 0, x * R, height)
  for (var y = 0; y < height / R; y++)
    line(0, y * R, width, y * R);
}