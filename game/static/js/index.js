var gameArea = {
	canvas: null,
	context: null,
	start : function(canvas_id){
		this.canvas = document.getElementById(canvas_id);
		this.context = this.canvas.getContext('2d');
		this.canvas.width = 640;
		this.canvas.height = 480;
		this.interval = setInterval(updateGameArea, 20)
		window.addEventListener('keydown', function (e) {
            e.preventDefault();
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
	},
};

var square = {
	x: 10,
	y: 10,
	radius: 20,
	speedX: 5,
	speedY: 5,
	gravity: 0.1,
	gravitySpeed: 0,
	bounceSpeed: 0,
	bounce: 0.6,
	draw:  function(){
		gameArea.context.beginPath();
		gameArea.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		gameArea.context.fillStyle = "green";
		gameArea.context.fill();
		gameArea.context.stroke();
	},
	position: function(){
		this.gravitySpeed += this.gravity;
		this.y+=this.gravitySpeed;
		if(this.bounceSpeed > 0){
			this.bounceSpeed -= this.bounce;
			this.x+=this.bounceSpeed*this.bounce;
			if (this.bounceSpeed < 0){
				this.bounceSpeed = 0;
			}
		}
		if(this.bounceSpeed < 0){
			this.bounceSpeed -= this.bounce;
			this.x+=this.bounceSpeed*this.bounce;
			if (this.bounceSpeed > 0){
				this.bounceSpeed = 0;
			}
		}

		if (gameArea.keys && gameArea.keys[37]) {this.x-=this.speedX; }
		if (gameArea.keys && gameArea.keys[39]) {this.x+=this.speedX; }
		if (gameArea.keys && gameArea.keys[38]) {this.y-=this.speedY; }
		if (gameArea.keys && gameArea.keys[40]) {this.y+=this.speedY; }
		this.hitTop();
		this.hitBottom();
		this.hitRight();
		this.hitLeft();
	},
	hitTop: function(){
		var rocktop = this.radius;
		if(this.y < rocktop){
			this.y = rocktop;
		}
	},
	hitBottom: function(){
		var rockbottom = gameArea.canvas.height - this.radius;
		if(this.y > rockbottom){
			this.y = rockbottom;
			this.gravitySpeed = -(this.gravitySpeed * this.bounce);
		}
	},
	hitRight: function(){
		var rockright = gameArea.canvas.width - this.radius;
		if(this.x > rockright){
			this.x = rockright;
			this.bounceSpeed = -15;
		}
	},
	hitLeft: function(){
		var rockleft = this.radius;
		if(this.x < rockleft){
			this.x = rockleft;
			this.bounceSpeed = 15;
		}
	},
};

$(document).ready(function() {
	gameArea.start("canvas");
	
});
var x = 0;
var y = 0;
function updateGameArea(){
	gameArea.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	square.position();
	square.draw();
	
}