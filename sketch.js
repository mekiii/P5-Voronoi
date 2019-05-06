let points = [];
let numOfPoints = 1000;
let deviation = 200;
let cnv;
let diagram;
let testPair;
let _x;
let _y;
let step;

function createCell() {}

function setup() {
  frameRate(10)
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  //Settings for drawing(these are the default values)

  //Set Cell Stroke Weight
  voronoiCellStrokeWeight(1);
  //Set Site Stroke Weight
  voronoiSiteStrokeWeight(2);
  //Set Cell Stroke
  voronoiCellStroke(0);
  //Set Site Stroke
  voronoiSiteStroke(250);
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
  updatePoints();
  background(255);
  voronoiDraw(0, 0, false, false);
  

}

function updatePoints(){
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

 points.forEach(function(element) {
  let movingStep = random(-3,3);
  push();
  translate(windowWidth / 2, windowHeight / 2);
  element[0] += movingStep;
  element[1] += movingStep;
  pop();
});


  voronoiSiteFlag(true);
  let diagram = voronoiGetDiagram();
  voronoiClearSites();
  voronoiSites(points);
  voronoi(windowWidth, windowHeight, false);
  console.log(diagram.cells.length)

}