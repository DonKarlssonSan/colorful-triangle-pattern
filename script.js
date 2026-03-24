import { bowyerWatson, Triangle } from "delaunay.js";
import Vector from "vectory-lib";

let canvas;
let ctx;
let w, h;
let colors;
let colorSchemeIndex;

function setup() {
  setupColors();
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
  canvas.addEventListener("click", draw);
}

function setupColors() {
  colors = [
    [
      "#ffcdb2",
      "#ffb4a2",
      "#e5989b",
      "#b5838d",
      "#6d6875"
    ],
    [
      "#9c89b8",
      "#f0a6ca",
      "#efc3e6",
      "#f0e6ef",
      "#b8bedd"
    ],
    [
      "#7bdff2",
      "#b2f7ef",
      "#eff7f6",
      "#f7d6e0",
      "#f2b5d4"
    ],
    [
      "#cc5803",
      "#e2711d",
      "#ff9505",
      "#ffb627",
      "#ffc971"
    ],
    [
      "#d8e2dc",
      "#ffe5d9",
      "#ffcad4",
      "#f4acb7",
      "#9d8189"
    ],
    [
      "#05668d",
      "#028090",
      "#00a896",
      "#02c39a",
      "#f0f3bd"
    ],
    [
      "#9c89b8",
      "#f0a6ca",
      "#efc3e6",
      "#f0e6ef",
      "#b8bedd"
    ],
    [
      "#fbfbf2",
      "#e5e6e4",
      "#cfd2cd",
      "#a6a2a2",
      "#847577"
    ],
  ];
}

function getRandomColor() {
  let len = colors[colorSchemeIndex].length;
  let randomIndex = Math.floor(Math.random() * len);
  return colors[colorSchemeIndex][randomIndex];
}

function getRandomPoints() {
  let extra = 50;
  
  let pointList = [
    new Vector(-extra, -extra),
    new Vector(-extra, h + extra),
    new Vector(w + extra, -extra),
    new Vector(w + extra, h + extra)
  ];
  
  let delimiter = Math.random() * 9000 + 1000;
  let nrOfPoints = w * h / delimiter;
  for(let i = 0; i < nrOfPoints; i++) {
    pointList.push(new Vector(
      Math.random() * (w + extra * 2) - extra,
      Math.random() * (h + extra * 2) - extra
    ));
  }
  return pointList;
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  draw();
}

function draw() {
  let nrOfColorSchemes = colors.length;
  colorSchemeIndex = Math.floor(Math.random() * nrOfColorSchemes);
  ctx.fillStyle = getRandomColor();
  ctx.fillRect(0, 0, w, h);
  
  let superTriangle = new Triangle(
    new Vector(-w * 10, h * 10),
    new Vector(w * 10, h * 10),
    new Vector(w / 2, -h * 10)
  );
  
  let pointList = getRandomPoints();
  let triangles = bowyerWatson(superTriangle, pointList);
  triangles.forEach(t => {
    let col = getRandomColor();
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.lineTo(t.a.x, t.a.y);
    ctx.lineTo(t.b.x, t.b.y);
    ctx.lineTo(t.c.x, t.c.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
}

setup();