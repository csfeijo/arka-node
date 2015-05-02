(function () {

	"use strict";

	// imports
	var CommandEnum = com.dgsprb.quick.CommandEnum;
	var Quick = com.dgsprb.quick.Quick;
  var GameObject = com.dgsprb.quick.GameObject;
	var Scene = com.dgsprb.quick.Scene;
	var Point = com.dgsprb.quick.Point;

	function main() {
		Quick.setName('Arkanoid');
		Quick.setAutoScale(false);
		Quick.init(function () { return new GameScene() });
	}

	var Background = (function () {

		function Background() {
		  var arrBgs = ['red', 'green', 'blue', 'black'],
		      rand   = Math.floor(Math.random() * (arrBgs.length -1));
		  
			GameObject.call(this);
			this.setColor(arrBgs[rand]);
			this.setWidth(Quick.getCanvasWidth());
			this.setHeight(Quick.getCanvasHeight());
		}; Background.prototype = Object.create(GameObject.prototype);

		return Background;

	})();

	var Menu = (function() {
	  
	  function Menu() {
	    GameObject.call(this);
	    this.setColor('#999999');
	    this.setWidth(Quick.getCanvasWidth());
	    this.setHeight(10);
	  }; Menu.prototype = Object.create(GameObject.prototype);
	  
	  return Menu;
	  
	})();
	

	var GameScene = (function () {

		function GameScene() {
			Scene.call(this);
			this.add(new Background());
			this.add(new Menu());
			
			var player = new Player();
			this.add(player);
			
			var ball = new Ball();
			this.add(ball);

			
		}; GameScene.prototype = Object.create(Scene.prototype);

		// override
		GameScene.prototype.getNext = function () {
			return new GameScene();
		};

		return GameScene;

	})();

  var Ball = (function(){
    
    function Ball() {
      GameObject.call(this);
      this.setImage(document.getElementById('ball'));
	    this.setColor('transparent');
	    this.setSize(14, 12);
	    this.setSolid();
	    this.setY(30);
	    this.setAccelerationY(0.5);
	    this.addTag('ball');
    }; Ball.prototype = Object.create(GameObject.prototype);
    
    Ball.prototype.onCollision = function (gameObject) {
			if (gameObject.hasTag("player")) {
				Quick.play("bounceSound");
				console.log('collision!');
				this.bounceY();
				
			  //var point = new Point(0, 300);
        //this.setSpeedToPoint(0.5, point);
			}
		};
		
		Ball.prototype.update = function () {
			// checks for falling off the bottom of the screen
			if (this.getTop() > Quick.getCanvasHeight()) {
			  console.log('out');
			  Quick.play("diedSound");
			  this.expire();
			}
		};
    
    
    
    
    return Ball;
  })();



	// class Player extends GameObject
	var Player = (function () {

		var SPEED = 3;

		function Player() {
			GameObject.call(this);

			this.controller = Quick.getController();
			this.addTag("player");
			//this.setAccelerationY(0.5);
			this.setImage(document.getElementById('p1'));
      this.setColor('transparent');
			this.setY(130);
			this.setEssential();
			this.setSize(40, 10);
			this.setSolid();
		}; Player.prototype = Object.create(GameObject.prototype);

		// override
		Player.prototype.onCollision = function (gameObject) {
			
		};

		// override
		Player.prototype.update = function () {

			if (this.controller.keyDown(CommandEnum.LEFT) && this.getLeft() > 0) {
				this.moveX(-SPEED);
			} else if (this.controller.keyDown(CommandEnum.RIGHT) && this.getRight() < Quick.getCanvasWidth()) {
				this.moveX(SPEED);
			}
			
		};

		return Player;

	})();

	main();

})();
