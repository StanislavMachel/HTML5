var gameArea = {
	canvas: null,
	context: null,
	start : function(canvas_id){
		this.canvas = document.getElementById(canvas_id);
		this.context = this.canvas.getContext('2d');
		this.canvas.width = 640;
		this.canvas.height = 480;
		this.interval = setInterval(updateGameArea, 20)
	},
};

var square = {
	draw:  function(centerX, centerY, radius){
		gameArea.context.beginPath();
		gameArea.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		gameArea.context.fillStyle = "green";
		gameArea.context.fill();
		gameArea.context.stroke();
	}
};

$(document).ready(function() {
	gameArea.start("canvas");
	
});
var x = 0;
var y = 0;
function updateGameArea(){
	$("#canvas").keydown(function(event){
		if(event.Key == 38){ //up
    	y--;
	    }else if(event.Key ==40){ //down
	    	y++;
	    }
	    else if(event.Key == 37){ //left
	    	x--;
	    }
	    else if(event.Key == 39) {
	    x++;
	    }//right
	});
	gameArea.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
	square.draw(x, y, 20);

}