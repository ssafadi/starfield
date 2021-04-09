import "./style.css";
import { interval, range } from "rxjs";
import { map, toArray } from "rxjs/operators";

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth * 0.8;
gameCanvas.height = window.innerHeight * 0.8;

const WIDTH = gameCanvas.width;
const HEIGHT = gameCanvas.height;

const SPEED = 30;
const STAR_NUMBER = 250;

range(1, STAR_NUMBER)
  .pipe(
    map(_ =>
      Object({
        x: parseInt(Math.random() * WIDTH),
        y: parseInt(Math.random() * HEIGHT),
        size: Math.random() * 3 + 1
      })
    ),
    toArray()
  )
  .subscribe(array => {
    interval(SPEED).subscribe(_ => {
      painStarts(array);
      moveStars(array);
    });
  });

function moveStars(stars) {
  stars.forEach(star => {
    if (star.y >= HEIGHT) star.y = 0;
    else star.y += star.size;
  });
}

function painStarts(stars) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "#ffffff";
  stars.forEach(star => ctx.fillRect(star.x, star.y, star.size, star.size));
}
