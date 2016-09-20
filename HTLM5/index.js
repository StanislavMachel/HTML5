var Context = {
	canvas : null,
	contex : null,
	create : function (canvas_tag_id) {
		this.canvas = document.getElementById(canvas_tag_id);
		this.context = this.canvas.getContext('2d');
		return this.context;
	}
}
var Sprite = function(filePath, isPattern){
	//construct
	this.image = null;
	this.pattern = null;
	this.toRadians = Math.PI/180;

	if (filePath != undefined && filePath != "" && filePath != null) {
		this.image = new Image();
		this.image.src = filePath;

		if(isPattern){
			this.pattern = Context.context.createPattern(this.image, 'repeat');
		} else{
			console.log('Unable to load sprite.');
		}
	}
	this.draw = function(x, y, w, h){
		if(this.pattern != null){
			Context.context.fillStyle = this.pattern;
			Context.context.fillRect(x, y, w, h);
		} else{
			if(w != undefined || h != undefined){
				Context.context.drawImage(this.image,
										  x,
										  y,
										  this.image.height,
										  this.image.width)
			} else{
				Context.context.drawImage(this.image,
										  x,
										  y,
										  h,
										  w)
			}
		}
	};
	this.rotate = function(x, y, angle){
		Context.context.save();
		Context.context.translate(x, y);
		Context.context.rotate(angle * this.toRadians);
		Context.context.drawImage(this.image,
							 	  -(this.image.width/2),
							 	  -(this.image.height/2));
		Context.context.restore();
	};
};

var wall = new Sprite('wall.png', false);
$(document).ready(function() {
	//Initialize
	Context.create('canvas');

	Context.context.beginPath();
	Context.context.rect(0, 0, 640, 480);
	Context.context.fillStyle = 'black';
	Context.context.fill();

	var image = new Sprite('wall.png', false);
	var image2 = new Sprite('water.png', false);
	var pattern = new Sprite('water.png', true);

	var angle = 0;

	setInterval(function () {
		image.draw(0, 0, 64, 64);
		image.draw(0, 74, 256, 32);
		pattern.draw(160, 160, 256, 180);

		image.rotate(115, 160, angle+=4.0);
		image2.rotate(115, 260, -angle/2);
	}, 25)
});