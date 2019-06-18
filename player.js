class Player
{
  constructor()
  {
    this.score = 0;
    this.dead = false;
    this.toGrow = false;
    this.food = new Food();
    this.timex = millis();
    this.lease = 0.17;
    this.dir = 0;
    this.canDir = true;
    this.start = new Pos(floor(width / 2 / R), floor(height / 2 / R));
    this.startSize = 4;
    this.list = [];
    for (var i = 0; i < this.startSize; i++)
    {
      this.list.push(new Pos(this.start.x, this.start.y + i))
    }
  }

  draw()
  {
    this.food.draw();

    fill(0, 255, 0);
    for (var i = 0; i < this.list.length; i++)
    {
      rect(this.list[i].x * R, this.list[i].y * R, R, R);
    }

  }

  update()
  {
    this.eat();
    this.edges();
    this.itself();
    this.control();
    this.move()
    this.gameOver();
  }

  gameOver()
  {
    if (this.dead)
    {
      noStroke();
      fill(255, 0, 0);
      textSize(60);
      text("Game Over", width / 2 - 150, height / 2 - 100);
      fill(255, 255, 0);
      text("Score: " + this.score, width / 2 - 100, height / 2);
      noLoop();
    }
  }

  eat()
  {
    if (this.list[0].x === this.food.pos.x && this.list[0].y === this.food.pos.y)
    {
      this.score++;
      this.increaseSpeed();
      this.grow();
      this.food = new Food();
    }
  }

  increaseSpeed()
  {
    if (this.lease > 0.05)
      this.lease -= 0.005;
  }

  grow()
  {
    this.toGrow = true;
  }

  edges()
  {
    if (this.list[0].x < 0 || this.list[0].x > floor(width / R) - 1 || this.list[0].y < 0 || this.list[0].y > floor(height / R) - 1)
      this.dead = true;
  }

  itself()
  {
    for (var i = 1; i < this.list.length; i++)
    {
      if (this.list[0].x == this.list[i].x && this.list[0].y == this.list[i].y)
        this.dead = true;
    }
  }

  move()
  {

    if (millis() - this.timex > this.lease * 1000)
    {
      this.timex = millis();
      //go up
      if (this.dir == 0)
        this.shift(this.list[0].x, this.list[0].y - 1);
      else
        //go right
        if (this.dir == 1)
          this.shift(this.list[0].x + 1, this.list[0].y);
        else
          //go down
          if (this.dir == 2)
            this.shift(this.list[0].x, this.list[0].y + 1);
          else
            //go left
            if (this.dir == 3)
              this.shift(this.list[0].x - 1, this.list[0].y);
    }
  }

  control()
  {
    //0=up,1=right;2=down;3=left
    if (keyIsPressed && this.canDir)
    {
      if (keyCode === UP_ARROW)
      {
        if (this.dir !== 2)
        {
          this.dir = 0;
          this.canDir = false;
        }
      }
      else if (keyCode === DOWN_ARROW)
      {
        if (this.dir !== 0)
        {
          this.dir = 2;
          this.canDir = false;
        }
      }
      else if (keyCode === LEFT_ARROW)
      {
        if (this.dir !== 1)
        {
          this.dir = 3;
          this.canDir = false;
        }
      }
      else if (keyCode === RIGHT_ARROW)
      {
        if (this.dir !== 3)
        {
          this.dir = 1;
          this.canDir = false;
        }
      }
    }
  }

  shift(x, y)
  {
    var buff = [];

    for (var i = 0; i < this.list.length; i++)
    {
      if (i == 0)
        buff.push(new Pos(x, y));
      else
      {
        buff.push(new Pos(this.list[i - 1].x, this.list[i - 1].y));
      }

    }
    if (this.toGrow)
    {
      buff.push(new Pos(this.list[this.list.length - 1].x, this.list[this.list.length - 1].y));
      this.toGrow = false;
    }
    this.list = buff;
    this.canDir = true;
  }
}

class Pos
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}

class Food
{
  constructor()
  {
    this.pos = new Pos(floor(random(width / R)), floor(random(height / R)));
  }
  draw()
  {
    fill(0, 0, 255);
    rect(this.pos.x * R, this.pos.y * R, R, R);
  }
}