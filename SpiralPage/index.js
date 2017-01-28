
var canvas = {"width":window.innerWidth,"height":window.innerHeight}
var points = [];
var mousePos = {"x":0,"y":0};
var size = 0;
var time = {"sinceLastStep":0,"lastStep":Date.now(),"startDate":Date.now()}
var page = "default";
var a,b,c,d,e,f
function main(){
	var c = document.getElementById("canvas");
	c.width = canvas.width;
	c.height = canvas.height;
	canvas.context = c.getContext('2d');
	size = 5;
	setUpPoints();
	step();



}

function getVarValues(){
	a = document.getElementById("sliderA").value;
	b = document.getElementById("sliderB").value;
	c = document.getElementById("sliderC").value;
	d = document.getElementById("sliderD").value;
	e = document.getElementById("sliderE").value;
	f = document.getElementById("sliderF").value;


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
var num = .1
function step(){
	getVarValues();
	num+=4*e
	//num+=e
	
	render();
	//radius =Math.abs( Math.sin(num/80)*50);
	window.setTimeout(step,5-time.sinceLastStep)
}

var radius =30;
function render(){
	canvas.context.fillStyle = "#00aabb";

	canvas.context.fillRect(0,0,canvas.width,canvas.height)
	canvas.context.strokeStyle = "white";
	canvas.context.beginPath();

	for(var i = 0; i<a*5;i++){
		canvas.context.arc(canvas.width/2,canvas.height/2-canvas.height/4*b+i/a*1000*c,d*radius,num+radius/100*i,num+radius/100*i*f)
	}
	/*for(var i = 0; i<500;i++){
		canvas.context.arc(canvas.width/2,canvas.height/2-canvas.height/4+i,radius,num+radius/100*i,num+radius/100*(i))
	}*/
	
	canvas.context.stroke();
	canvas.context.beginPath();

	for(var i = 0; i<a*5;i++){
		canvas.context.arc(canvas.width/4,canvas.height/2-canvas.height/4*b+i/a*1000*c,d*radius,num+radius/100*i,num+radius/100*i*f)
	}
	
	
	canvas.context.stroke();
	canvas.context.beginPath();
	for(var i = 0; i<a*5;i++){
		canvas.context.arc(3*canvas.width/4,canvas.height/2-canvas.height/4*b+i/a*1000*c,d*radius,num+radius/100*i,num+radius/100*i*f)
	}
	canvas.context.stroke();
	canvas.context.stroke();
	canvas.context.beginPath();
	for(var i = 0; i<a*5;i++){
		canvas.context.arc(canvas.width/4+canvas.width/8,canvas.height/2*b-i/a*1000*c,d*radius,num+radius/100*i,num+radius/100*i*f)
	}
	canvas.context.stroke();
	canvas.context.stroke();
	canvas.context.beginPath();
	for(var i = 0; i<a*5;i++){
		canvas.context.arc(2*canvas.width/4 + canvas.width/8,canvas.height/2*b-i/a*1000*c,d*radius,num+radius/100*i,num+radius/100*i*f)
	}
	canvas.context.stroke();

	
}

main();