
var canvas = {"width":window.innerWidth,"height":window.innerHeight}
var points = [];
var mousePos = {"x":0,"y":0};
var size = 0;
var time = {"sinceLastStep":0,"lastStep":Date.now(),"startDate":Date.now()}
var page = "default";
function main(){
	var c = document.getElementById("canvas");
	c.width = canvas.width;
	c.height = canvas.height;
	canvas.context = c.getContext('2d');
	size = 5;
	setUpPoints();
	step();



}
function updateCoords(event){
	mousePos.x = event.clientX;
	mousePos.y = event.clientY;
}
function resetSize(newSize){
	if(newSize != size){
		size = newSize;

		points = [];
		setUpPoints();
	}
	
}
function setUpPoints(){
	for(var r = -size; r<canvas.height/size;r++){
		for(var c = -size; c< canvas.width/size; c++){
			points.push({"x":c*size+size/2,"y":r*size+size/2,"size":size,"z":0,"zVel":0})
		}
	}
}

function step(){
	oldPage = page;
	var e = document.getElementById("selector");
	page = e.options[e.selectedIndex].value;
	if(page == "3"){
		page = oldPage;
		resetSize(10);
	}
	else if(page == "4"){
		page = oldPage;
		resetSize(5);
	}
	physics();
	render();
	window.setTimeout(step,5-time.sinceLastStep)
}
function physics(){
	var now = Date.now();
	time.sinceLastStep = (now-time.lastStep)/1;
	for(var p = 0; p<points.length;p++){
		var dx = mousePos.x-points[p].x;
		var dy = mousePos.y-points[p].y
		var d = Math.sqrt(dx*dx+dy*dy);
		//console.log(1000/d)
		points[p].zVel=20000/Math.pow(d,1);
		points[p].z += points[p].zVel*time.sinceLastStep/1000
		//console.log(page)
		if(points[p].z > 255-d && points[p].z > 5 && page=="dark"){
			points[p].z = 255-d*255;

		}
		else if(points[p].z > 255-d && page == "default"){
			points[p].z = 255-d;

		}


		if(points[p].z > 0){
			points[p].z-=2;

		}
		if(points[p].z < 0){
			points[p].z=0

		}

	}
	time.lastStep = now;

}
function render(){
	console.log(Math.floor(points[0].z))
	canvas.context.clearRect(0,0,canvas.width,canvas.height)
	for(var p = 0; p<points.length;p++){
		//console.log(points[p].z)
		canvas.context.fillStyle = "rgba("+ Math.floor(points[p].z+1) + "," + Math.floor(points[p].z + 20) + "," + Math.floor(points[p].z+30) +"," + Math.floor(points[p].zVel/10)+ ")";
		canvas.context.fillRect(points[p].x,points[p].y,points[p].size+1,points[p].size+1)
	}
	//canvas.context.fillStyle = "red"
	//canvas.context.fillRect(mousePos.x,mousePos.y,10,10)
}

main();