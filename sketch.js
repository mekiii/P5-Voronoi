let points = [];
let numOfPoints = 1000;
var diagram = voronoiGetDiagram();
	console.log(diagram);

function setup() {
  frameRate(10)
  createCanvas(windowWidth, windowHeight);
  //Settings for drawing(these are the default values)

	//Set Cell Stroke Weight
	voronoiCellStrokeWeight(1);
	//Set Site Stroke Weight
	voronoiSiteStrokeWeight(1);
	//Set Cell Stroke
	voronoiCellStroke(0);
	//Set Site Stroke
	voronoiSiteStroke(255);
	//Set flag to draw Site
  voronoiSiteFlag(true);
  /*for (let i = 0; i < numOfPoints; i++){
    let pointX = randomGaussian(windowWidth/2, 100);
    let pointY = randomGaussian(windowHeight/2,100)
    points.push([pointX,pointY]);
  }*/

  /*voronoiSites(points);*/
	//Compute voronoi diagram with size 700 by 500
	voronoi(windowWidth, windowHeight, true);

	//Get the raw diagram, for more advanced use
	//This is purely to get information, doesn't change the diagram
	//https://github.com/gorhill/Javascript-Voronoi
	

}

function createRandomPoints(num){
  for (let i = 0; i < num; i++){
    let newVector = createVector(random(0, windowWidth), random(0, windowHeight));
    points.push(newVector);
  }
}



function draw() {
  background(255);
    let pointX = randomGaussian(windowWidth/2, 200);
    let pointY = randomGaussian(windowHeight/2,200)
    points.push([pointX,pointY]);
    voronoiSites(points);
    voronoi(windowWidth, windowHeight, true);
    voronoiDraw(0, 0, false, false);
  // put drawing code here
}