var R = 20;
var player;

function setup()
{
    createCanvas(600, 600);
    player = new Player();
    slider = createSlider(0,1,player.lease,0.01);
    slider.position(20,635);
    tag = createP('Set speed');
    tag.position(20,600);
}

function draw()
{
  background(0);
  // drawGrid();
  player.draw();
  player.update();
  player.lease = slider.value();
}

function drawGrid()
{
  stroke(255);

  for (var x = 0; x < width / R; x++)
    line(x * R, 0, x * R, height)
  for (var y = 0; y < height / R; y++)
    line(0, y * R, width, y * R);
}