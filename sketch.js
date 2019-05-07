let points = [];
let deviation = 500;
let cnv;
let diagram;
let testPair;
let _x;
let _y;
let step;
let movingStep;
let angle;
let mic;

function createCell() {}

function setup() {
  //mic = new p5.AudioIn();
  //mic.start();
  //angle = random(-5,5);
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
    //let pointX = random(0, windowWidth);
    //let pointY = random(0 , windowHeight);
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
  //micLevel = mic.getLevel();

  updatePoints();
  background(10, 0, 20, 0.7);
  voronoiDraw(0, 0, false, false);
}

function updatePoints() {
  //Draw point that is closest to the mouse closer to the mouse
   let pointIDs = getClosestSite(mouseX, mouseY);
   pointIDs.forEach((element) => {
    let x = lerp(points[element][0], mouseX, step);
    let y = lerp(points[element][1], mouseY, step);
    points[element] = [x, y];
   })
   

  /*points.forEach((element,index) => {
   // if(sqrt(sq(x - element[0])+sq(y - element[1])) < tempdist){
     let x = mouseX;
     let y = mouseY;
      tempdist = sqrt(sq(x - element[0])+sq(y - element[1]));
      let maxDist = sqrt(sq(windowWidth) + sq(windowHeight));
      let stepSize = map(tempdist, 0, maxDist, 0.4, 0.0000001)
      stepSize = stepSize * stepSize * stepSize;
      x = lerp(points[index][0], mouseX, stepSize);
      y = lerp(points[index][1], mouseY, stepSize);
      points[index] = [x, y];
     
    //}
  });
*/
  //console.log(micLevel)
  
  points.forEach(function (element) {
    angle = random(-0.5, 1);
    //Rotate points around center
    let translatedX = element[0] - windowWidth / 2;
    let translatedY = element[1] - windowHeight / 2;
    let _x = translatedX * cos(angle) - translatedY * sin(angle);
    let _y = translatedX * sin(angle) + translatedY * cos(angle);
    element[0] = _x + windowWidth / 2;
    element[1] = _y + windowHeight / 2;
  });
  
  voronoiClearSites();
  voronoiSiteFlag(true);
  voronoiSites(points);
  voronoi(windowWidth, windowHeight, false);
}

function getClosestSite(x,y) {
  let pointIDs =[];
  let tempdist = 200;
  points.forEach((element,index) => {
    if(sqrt(sq(x - element[0])+sq(y - element[1])) < tempdist){
      //tempdist = sqrt(sq(x - element[0])+sq(y - element[1]));
      pointIDs.push(index);
    }
  });
  return pointIDs
}