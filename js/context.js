var scene = new Scene();

Quick.init(function () { return scene; });

var background = new GameObject();

scene.add(background);
background.setWidth(Quick.getCanvasWidth());
background.setHeight(Quick.getCanvasHeight());
background.setColor('#0096d6');


var player1 = new GameObject();
scene.add(player1);

var player_main_sprite = document.getElementById('p1'),
    player_sprites = {
      to_down : player_main_sprite,
      to_right : ImageFactory.rotate(player_main_sprite, 270),
      to_left : ImageFactory.mirror(ImageFactory.rotate(player_main_sprite, 270)),
      to_up : ImageFactory.rotate(player_main_sprite, 540)
    };

// Start!!!
player1.setImage(player_sprites.to_down);
player1.setWidth(29);
player1.setHeight(40);
player1.setColor('transparent');

player1.controller = Quick.getController();

player1.update = function(){
  
  if (player1.controller.keyPush(CommandEnum.RIGHT)) {
		player1.moveX(4);
		player1.setImage(player_sprites.to_right);
		player1.setWidth(40);
    player1.setHeight(29);
	}
	
	if (player1.controller.keyPush(CommandEnum.LEFT)) {
	  player1.moveX(-4);
		player1.setImage(player_sprites.to_left);
		player1.setWidth(40);
    player1.setHeight(29);
	}
	
	if (player1.controller.keyPush(CommandEnum.DOWN)) {
	  player1.moveY(4);
		player1.setImage(player_sprites.to_down);
		player1.setWidth(29);
    player1.setHeight(40);
	}
	
	if (player1.controller.keyPush(CommandEnum.UP)) {
	  player1.moveY(-4);
		player1.setImage(player_sprites.to_up);
		player1.setWidth(29);
    player1.setHeight(40);
	}
	
};

//var point1 = new Point(Quick.getCanvasRight(), Quick.getCanvasBottom());
//player1.setSpeedToPoint(1, point1);


//player1.


/*
var player2 = new GameObject();
scene.add(player2);

image_2 = document.getElementById('p2');
player2.setImage(image_2);
player2.setWidth(64);
player2.setHeight(64);
player2.setColor('transparent');
var point2 = new Point(300, Quick.getCanvasBottom());
player2.setSpeedToPoint(1, point2);
*/






// var sprite = new Sprite();
// sprite.setImage('mike.png');