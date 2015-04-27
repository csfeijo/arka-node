var scene = new Scene();

Quick.init(function () { return scene });

var background = new GameObject();

scene.add(background);
background.setWidth(Quick.getCanvasWidth());
background.setHeight(Quick.getCanvasHeight());
background.setColor('#0096d6');
//background.setImage(image);


var player1 = new GameObject();
scene.add(player1);

image_1 = document.getElementById('p1');
player1.setImage(image_1);
player1.setWidth(64);
player1.setHeight(64);
player1.setColor('transparent');


var player2 = new GameObject();
scene.add(player2);

image_2 = document.getElementById('p2');
player2.setImage(image_2);
player2.setWidth(64);
player2.setHeight(64);
player2.setColor('transparent');


var point1 = new Point(Quick.getCanvasRight(), Quick.getCanvasBottom());
player1.setSpeedToPoint(1, point1);


var point2 = new Point(300, Quick.getCanvasBottom());
player2.setSpeedToPoint(1, point2);


// var sprite = new Sprite();
// sprite.setImage('mike.png');