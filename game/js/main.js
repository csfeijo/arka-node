(function () {

	"use strict";

	// imports
	var CommandEnum = com.dgsprb.quick.CommandEnum,
			Quick = com.dgsprb.quick.Quick,
   		GameObject = com.dgsprb.quick.GameObject,
   		Rect = com.dgsprb.quick.Rect,
	 		Scene = com.dgsprb.quick.Scene,
	 		Text = com.dgsprb.quick.Text;

	// static
	function main() {
		Quick.setAutoScale(false);
		Quick.setName("Arka Node Demo");
		Quick.init(function () { return new FirstScene() });
	}

	var Background = (function () {

		function Background() {
			GameObject.call(this);
			this.setColor("Green");
			this.setWidth(Quick.getCanvasWidth());
			this.setHeight(Quick.getCanvasHeight());
		}; Background.prototype = Object.create(GameObject.prototype);

		return Background;
	})();

	var Ball = (function () {

		function Ball() {
			GameObject.call(this);
			this.setImageId("ballSprite");
			this.setBoundary(new Rect(0, 0, Quick.getCanvasWidth(), Quick.getCanvasHeight()));
			this.setEssential();
			this.setSolid();
			this.setSpeedX(3 + Quick.random(3));
			this.setSpeedY(1 + Quick.random(3));
		}; Ball.prototype = Object.create(GameObject.prototype);

		// override
		Ball.prototype.onCollision = function (gameObject) {
			var collision = this.getCollision(gameObject);
			this.bounceFrom(collision);

			if (gameObject.hasTag("paddle")) {
				Quick.play("pingSound");
			} else {
				Quick.play("pongSound");
			}
		};

		Ball.prototype.update = function () {
			// checks for falling off the bottom of the screen
			if (this.getTop() > Quick.getCanvasHeight()) {
			  Quick.play("diedSound");
			  this.expire();
			}
		};

		return Ball;

	})();

	var FirstScene = (function () {

		function FirstScene() {
			Scene.call(this);
			this.add(new Background());

			var horizontalPipe = new HorizontalPipe();
			this.add(horizontalPipe);

			var verticalPipe1, verticalPipe2;
			verticalPipe1 = new VerticalPipe();
			verticalPipe2 = new VerticalPipe();
			verticalPipe2.setRight(Quick.getCanvasWidth());
			this.add(verticalPipe1);
			this.add(verticalPipe2);

			var ball = new Ball();
			ball.setTop(horizontalPipe.getBottom() + 1);
			ball.setLeft(verticalPipe1.getRight() + 1);
			this.add(ball);

			this.add(new Paddle());
			Quick.play("pongSound");
      
      var scoreText = new Text('score 000000');
      scoreText.setPosition(40, 10);
      this.add(scoreText);

		}; FirstScene.prototype = Object.create(Scene.prototype);

		// override
		FirstScene.prototype.getNext = function () {
			return new FirstScene();
		};

		return FirstScene;

	})();

	var Paddle = (function () {

		function Paddle() {
			GameObject.call(this);
			this.addTag("paddle");
			this.controller = Quick.getController();
			this.pointer = Quick.getPointer();
			this.setImageId("paddleSprite");
			this.setSolid();
			this.setCenterX(Quick.getCanvasWidth() / 2);
			this.setBottom(Quick.getCanvasHeight() - this.getHeight());
		}; Paddle.prototype = Object.create(GameObject.prototype);

		// override
		Paddle.prototype.update = function () {
			var position = this.pointer.getPosition();

			if (position.getY() > 0) {
				this.setCenterX(position.getX());
			}

			if (this.controller.keyDown(CommandEnum.LEFT) && this.getLeft() > 0) {
				this.moveX(-6);
			}

			if (this.controller.keyDown(CommandEnum.RIGHT) && this.getRight() < Quick.getCanvasWidth()) {
				this.moveX(6);
			}
		};

		return Paddle;

	})();

	var Pipe = (function () {

		function Pipe() {
			GameObject.call(this);
			this.addTag("pipe");
			this.setSolid();
		}; Pipe.prototype = Object.create(GameObject.prototype);

		return Pipe;

	})();

	var HorizontalPipe = (function () {

		function HorizontalPipe() {
			Pipe.call(this);
			this.setImageId("horizontalPipeSprite");
			this.setWidth(Quick.getCanvasWidth());
		}; HorizontalPipe.prototype = Object.create(Pipe.prototype);

		return HorizontalPipe;

	})();

	var VerticalPipe = (function () {

		function VerticalPipe() {
			Pipe.call(this);
			this.setImageId("verticalPipeSprite");
			this.setHeight(Quick.getCanvasHeight());
		}; VerticalPipe.prototype = Object.create(Pipe.prototype);

		return VerticalPipe;

	})();

	main();

})();
