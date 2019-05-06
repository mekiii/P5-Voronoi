let points = [];
let numOfPoints = 1000;
let deviation = 200;
let cnv;
let diagram;
let testPair;
let _x;
let _y;
function createCell() {
}

function setup() {
  frameRate(10)
  cnv = createCanvas(windowWidth, windowHeight);
  //Settings for drawing(these are the default values)

	//Set Cell Stroke Weight
	voronoiCellStrokeWeight(1);
	//Set Site Stroke Weight
	voronoiSiteStrokeWeight(2);
	//Set Cell Stroke
	voronoiCellStroke(0);
	//Set Site Stroke
	voronoiSiteStroke(200);
	//Set flag to draw Site
  voronoiSiteFlag(true);
  for (let i= deviation; i >= 0; i--){
  let pointX = randomGaussian(windowWidth/2, i);
  let pointY = randomGaussian(windowHeight/2,i)
  points.push([pointX,pointY]);
  voronoiSites(points);
  //Compute voronoi diagram with size 700 by 500
  }
  voronoi(windowWidth, windowHeight, false);
  
  

	//Get the raw diagram, for more advanced use
	//This is purely to get information, doesn't change the diagram
	//https://github.com/gorhill/Javascript-Voronoi
	

}


function draw() {
  background(255);
  voronoiDraw(0, 0, false, false);
}