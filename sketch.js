let points = [];
let numOfPoints = 1000;
let deviation = 300;
let cnv;
let diagram;
let testPair;
let _x;
let _y;
let step;
let counter;
let movingStep;
let angle;
let mic;

function createCell() {}

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  //angle = random(-5,5);
  counter = 0;
  frameRate(20)
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  //Settings for drawing(these are the default values)

  //Set Cell Stroke Weight
  voronoiCellStrokeWeight(0.6);
  //Set Site Stroke Weight
  voronoiSiteStrokeWeight(1);
  //Set Cell Stroke
  voronoiCellStroke(200);
  //Set Site Stroke
  voronoiSiteStroke(10);
  //Set flag to draw Site
  voronoiSiteFlag(true);
  for (let i = deviation; i >= 0; i--) {
    let pointX = randomGaussian(windowWidth / 2, i);
    let pointY = randomGaussian(windowHeight / 2, i)
    points.push([pointX, pointY]);
    voronoiSites(points);
    //Compute voronoi diagram with size 700 by 500
  }
  voronoi(windowWidth, windowHeight, false);


  //Get the raw diagram, for more advanced use
  //This is purely to get information, doesn't change the diagram
  //https://github.com/gorhill/Javascript-Voronoi

  step = 0.1;
}


function draw() {
  colorMode(RGB, 255, 255, 255, 1);
  micLevel = mic.getLevel();
  counter++;
  updatePoints();
  background(10,0,20,0.4);
  voronoiDraw(0, 0, false, false);


}

function updatePoints() {
  //Draw point that is closest to the mouse closer to the mouse
  let pointID = voronoiGetSite(mouseX, mouseY, false);
  //voronoiDrawCell( points[pointID][0], points[pointID][1], pointID,VOR_CELLDRAW_BOUNDED, true, false);
  /*
  let x, y;
  if (step <= 1){
    x = step*mouseX +  (1-step)*points[pointID][0];
    y = step*mouseY +  (1-step)*points[pointID][1];
    step += 0.1;
  }
  else {
    step = 0.1
  }
  points[pointID] = [x,y];
  */
  console.log(micLevel)
  points.forEach(function (element) {
    angle = random(-5, 5);
    //Rotate points around center
    let translatedX = element[0] - windowWidth / 2;
    let translatedY = element[1] - windowHeight / 2;
    let _x = translatedX * cos(angle) - translatedY * sin(angle);
    let _y = translatedX * sin(angle) + translatedY * cos(angle);
    element[0] = _x + windowWidth / 2;
    element[1] = _y + windowHeight / 2;
  });
  voronoiSiteFlag(true);
  voronoiClearSites();
  voronoiSites(points);
  voronoi(windowWidth, windowHeight, false);

}