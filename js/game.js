/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


;
(function () {
    'use strict';


    var SCREEN_WIDTH = 400;
    var SCREEN_HEIGHT = 600;

    var KEY_EVENT_KEY_LEFT = 97;
    var KEY_EVENT_KEY_RIGHT = 100;

    var Background = function () {

        var that = this;

        this.element;

        var xPos, yPos;

        var width, height;

        this.init = function () {
            that.element = document.createElement('div');

            xPos = 0;
            yPos = -80;

            width = SCREEN_WIDTH;
            height = SCREEN_HEIGHT + 80;

            that.element.style.width = width + 'px';
            that.element.style.height = height + 'px';
            that.element.style.position = 'absolute';
            that.element.style.top = yPos + 'px';
            that.element.style.left = xPos + 'px';
            that.element.style.backgroundImage = 'url("images/doodle-background.png")';
            that.element.style.backgroundRepeat = 'repeat-x repeat-y';
        };

        var move = function () {
            if (yPos >= 0) {
                yPos = -80;
            }
            yPos += 2;
        };

        var render = function () {
            that.element.style.top = yPos + 'px';
        };

        this.updateFrame = function () {
            move();
            render();
        };

        this.init();
    };


    var Animation = function (_character) {

        var that = this;

        var character = _character;
        var element = character.element;

        this.xPos = character.xPos;
        this.yPos = character.yPos;
        this.width = character.width;
        this.height = character.height;

        var speed = character.speed;


        this.resetValues = function () {
            that.xPos = character.xPos;
            that.yPos = character.yPos;
            that.width = character.width;
            that.height = character.height;
            character.yVelocity = 0;
        };

        this.resetYValue = function () {
            that.yPos = character.yPos;
        };

        this.resetYValueAfterCollision = function (_yValue) {
            that.yPos = character.yPos = _yValue - character.height;
        };

        this.resetXValue = function () {
            that.xPos = character.xPos;
        };

        this.move = function (direction) {
            if (direction === 'left') {
                that.xPos -= speed;
            }
            if (direction === 'right') {
                that.xPos += speed;
            }
        };

        this.render = function () {

            character.xPos = that.xPos;
            character.yPos = that.yPos;

            element.style.left = character.xPos + 'px';
            element.style.top = character.yPos + 'px';
        };


    };


    var Collision = function () {
        this.checkTopCollision = function (objectA, objectB) {
            if (((objectA.xPos + objectA.width) > objectB.xPos) && (objectA.xPos < (objectB.xPos + objectB.width))) {
                if (((objectA.yPos + objectA.height) >= objectB.yPos) && (objectA.yPos < objectB.yPos) && ((objectA.yPos + objectA.height) < (objectB.yPos + objectB.height))) {
                    return true;
                }
            }
            return false;
        };

        this.checkCollision = function (objectA, objectB) {
            if (((objectA.xPos + objectA.width) > objectB.xPos) && (objectA.xPos < (objectB.xPos + objectB.width))) {
                if (((objectA.yPos + objectA.height) > objectB.yPos) && (objectA.yPos < (objectB.yPos + objectB.height))) {
                    return true;
                }
            }
            return false;
        };
    };


    var Spritesheet = function () {

        var that = this;

        var coordinates = [
            {action: 'leftFace', coOrd: {x: 0, y: -202, w: 0, h: 0}},
            {action: 'leftJump', coOrd: {x: 0, y: -372, w: 0, h: 0}},
            {action: 'rightFace', coOrd: {x: -30, y: -122, w: 0, h: 0}},
            {action: 'rightJump', coOrd: {x: -30, y: -290, w: 0, h: 0}},
            {action: 'springDown', coOrd: {x: 0, y: -470, w: 44, h: 27}},
            {action: 'springUp', coOrd: {x: 0, y: -502, w: 44, h: 51}},
            {action: 'greenBlock', coOrd: {x: -2, y: -3, w: 100, h: 26}},
            {action: 'redBlock', coOrd: {x: -2, y: -33, w: 100, h: 26}},
            {action: 'blueBlock', coOrd: {x: -2, y: -63, w: 100, h: 26}},
            {action: 'whiteBlock', coOrd: {x: -2, y: -93, w: 100, h: 26}},
            {action: 'greenVillain', coOrd: {x: -175, y: -101, w: 82, h: 52}},
            {action: 'redVillain', coOrd: {x: 0, y: -104, w: 47, h: 35}}
        ];

        this.getSpriteCoordinates = function (command) {

            return findCoOrd(command);

        };

        var findCoOrd = function (command) {
            for (var i = 0; i < coordinates.length; i++) {
                if (coordinates[i].action === command) {
                    return coordinates[i].coOrd;
                }
            }
        };
    };


    var Sprite = function (command) {
        this.coOrds = new Spritesheet().getSpriteCoordinates(command);

        this.element = document.createElement('div');

        this.element.style.width = this.coOrds.w + 'px';
        this.element.style.height = this.coOrds.h + 'px';
        this.element.style.position = 'absolute';

        this.element.style.backgroundImage = 'url("images/doodle-sprites.png")';
        this.element.style.backgroundPositionX = this.coOrds.x + 'px';
        this.element.style.backgroundPositionY = this.coOrds.y + 'px';

    };


    var Platform = function (_xPos, _yPos, _type) {

        var that = this;

        this.width, this.height;

        this.type;
        var xVelocity;

        this.xPos, this.yPos;

        this.element;

        this.init = function () {
            that.width = 100;
            that.height = 26;

            that.type = _type;
            xVelocity = 1;

            that.xPos = _xPos;
            that.yPos = _yPos;

            that.element = document.createElement('div');

            that.element.style.position = 'absolute';
            that.element.style.left = that.xPos + 'px';
            that.element.style.top = that.yPos + 'px';

            if (that.type === 'standard') {

                setSprite('greenBlock');

            } else if (that.type === 'spring') {

                setSprite('blueBlock');

                setSpringSprite('springDown');

            } else if (that.type === 'moving') {

                setSprite('whiteBlock');

            }
        };

        function setSprite(command) {

            var coOrds = new Spritesheet().getSpriteCoordinates(command);

            that.width = coOrds.w;
            that.height = coOrds.h;

            that.element.style.width = that.width + 'px';
            that.element.style.height = that.height + 'px';
            that.element.style.backgroundImage = 'url("images/doodle-sprites.png")';
            that.element.style.backgroundRepeat = 'no-repeat';
            that.element.style.backgroundPositionX = coOrds.x + 'px';
            that.element.style.backgroundPositionY = coOrds.y + 'px';

        }

        function setSpringSprite(command) {
            var sprite = new Sprite(command);

            sprite.element.style.left = sprite.coOrds.w / 2 + 'px';
            sprite.element.style.top = -sprite.coOrds.h + 'px';

            that.element.appendChild(sprite.element);
        }
        ;

        this.changeSpringSprite = function () {
            if (that.type === 'spring') {
                that.element.removeChild(that.element.childNodes[0]);
                setSpringSprite('springUp');
            }
        };

        var move = function (speed) {
            that.yPos += speed;
        };

        var autoMove = function () {
            if (that.xPos < 0 || that.xPos + that.width > SCREEN_WIDTH) {
                xVelocity *= -1;
            }

            that.xPos += xVelocity;
        };

        var render = function () {
            that.element.style.left = that.xPos + 'px';
            that.element.style.top = that.yPos + 'px';
        };

        this.updateFrame = function (speed) {
            move(speed);
            render();
        };

        this.updateFrameX = function () {
            autoMove();
            render();
        };

        this.init();
    };


    var ExtraClass = function () {

        var collision = new Collision();

        this.getRandomCoordinates = function (prevX, prevY) {

            var randomXValue = Math.floor(Math.random() * 4);

            var randomYValue = Math.floor(Math.random() * 3) + 1;

            var newX = randomXValue * 100;
            var newY = randomYValue * -50;

            if ((newY <= (prevY - 50)) && (newY > (prevY - 350))) {
                return {xCord: newX, yCord: newY};
            }

            return null;
        };

        this.getRandomCoordinatesForVillain = function (prevX, prevY) {

            var randomXValue = Math.floor(Math.random() * 4);

            var randomYValue = Math.floor(Math.random() * 3) + 1;

            var newX = randomXValue * 100;
            var newY = randomYValue * -50;

            return {xCord: newX, yCord: newY};

        };

        this.checkCollisionOfPlayerPlatforms = function (player, platforms) {
            for (var i = 0; i < platforms.length; i++) {
                if (collision.checkTopCollision(player.animation, platforms[i])) {

                    player.animation.resetYValueAfterCollision(platforms[i].yPos);
                    player.groundLevel = platforms[i].yPos;
                    player.yVelocity = 0;
                    player.platformType = platforms[i].type;
                    platforms[i].changeSpringSprite();

                    return true;
                }
            }
            return false;
        };

        this.checkCollisionOfPlayerVillains = function (player, villains) {
            for (var i = 0; i < villains.length; i++) {
                if (collision.checkCollision(player.animation, villains[i])) {
                    if (collision.checkTopCollision(player.animation, villains[i])) {
                        return i;
                    }
                    return 'collided';
                }
            }
            return null;
        };

        this.checkTopCollisionOfPlayerVillains = function (player, villains) {
            for (var i = 0; i < villains.length; i++) {
                if (collision.checkTopCollision(player.animation, villains[i])) {
                    return true;
                }
            }
            return false;
        };
    };


    var Score = function () {

        var that = this;

        this.element;

        this.score;

        this.init = function () {
            that.element = document.createElement('div');
            that.element.style.position = 'absolute';
            that.element.style.zIndex = 3;
            that.element.style.width = SCREEN_WIDTH + 'px';
            that.element.style.height = SCREEN_HEIGHT / 30 + 'px';
            that.element.style.top = '0px';
            that.element.style.right = '0px';
            that.element.style.textAlign = 'left';
            that.element.style.backgroundColor = 'grey';
            that.element.style.fontFamily = 'Candara';
            that.element.style.fontSize = '16px';
            that.element.style.fontWeight = 'bold';
            that.element.style.color = 'white';

            that.score = 0;
        };

        var render = function () {
            that.element.innerHTML = 'Score: ' + that.score;
        };

        this.updateScore = function (updateMessage) {
            if (updateMessage === 'height') {
                that.score += 1;
            } else if (updateMessage === 'redVillain') {
                that.score += 10;
            } else if (updateMessage === 'greenVillain') {
                that.score += 20;
            }

            render();
        };

        this.init();
    };


    var Player = function () {
        var that = this;

        this.width, this.height;

        var innerElementWidth, innerElementHeight;

        this.yPos, this.xPos;

        this.xVelocity, this.yVelocity;

        this.spriteCord = {};

        this.speed, this.ySpeed;
        this.direction;
        this.platformType;

        this.isUntouchable;

        this.element;
        var innerElement;

        this.animation;

        this.spriteSheet;
        this.spriteCord;

        this.onGround;
        this.isFalling;
        this.groundLevel;
        this.gravity;

        this.init = function () {
            that.width = 50;
            that.height = 78;

            innerElementWidth = 80;
            innerElementHeight = 78;

            that.yPos = SCREEN_HEIGHT / 2;
            that.xPos = (SCREEN_WIDTH - that.width) / 2;

            that.xVelocity = 0;
            that.yVelocity = 0;

            that.spriteCord = {};

            that.speed = 4;
            that.ySpeed = -25;
            that.direction = 'right';
            that.platformType = 'standard';

            that.isUntouchable = false;

            that.element = document.createElement('div');
            that.element.style.width = that.width + 'px';
            that.element.style.height = that.height + 'px';
            that.element.style.position = 'absolute';
            that.element.style.top = that.yPos + 'px';
            that.element.style.left = that.xPos + 'px';
            that.element.style.zIndex = '2';


            innerElement = document.createElement('div');

            innerElement.style.width = innerElementWidth + 'px';
            innerElement.style.height = innerElementHeight + 'px';
            innerElement.style.backgroundImage = 'url("images/doodle-sprites.png")';

            that.element.appendChild(innerElement);

            that.animation = new Animation(that);
            that.spriteSheet = new Spritesheet();

            that.spriteCord = that.spriteSheet.getSpriteCoordinates('rightFace');

            that.onGround = true;
            that.isFalling = true;
            that.groundLevel = SCREEN_HEIGHT;
            that.gravity = 0.5;
        };

        var move = function () {

            that.ySpeed = -25;

            if (that.platformType === 'spring') {
                that.ySpeed = -100;
                that.isUntouchable = true;
                that.groundLevel = SCREEN_HEIGHT;
            }

            that.startJump();

            window.onkeypress = function (event) {

                var keyCode = event.which || event.keyCode;

                if (keyCode === KEY_EVENT_KEY_LEFT) {
                    that.xVelocity = -that.speed;
                    that.direction = 'left';
                }
                if (keyCode === KEY_EVENT_KEY_RIGHT) {
                    that.xVelocity = that.speed;
                    that.direction = 'right';
                }
            };

        };

        var render = function () {
            innerElement.style.backgroundPositionX = that.spriteCord.x + 'px';
            innerElement.style.backgroundPositionY = that.spriteCord.y + 'px';
        };

        var updateDirection = function () {
            if (that.direction === 'left') {
                innerElement.style.marginLeft = '-30px';
                that.spriteCord = that.spriteSheet.getSpriteCoordinates('leftFace');
            } else if (that.direction === 'right') {
                innerElement.style.marginLeft = '0px';
                that.spriteCord = that.spriteSheet.getSpriteCoordinates('rightFace');
            }
        };

        this.updateSpriteDuringCollision = function () {
            if (that.direction === 'left') {
                innerElement.style.marginLeft = '-30px';
                that.spriteCord = that.spriteSheet.getSpriteCoordinates('leftJump');
            } else if (that.direction === 'right') {
                innerElement.style.marginLeft = '0px';
                that.spriteCord = that.spriteSheet.getSpriteCoordinates('rightJump');
            }
        };

        this.startJump = function () {
            if (that.onGround) {
                that.yVelocity = that.ySpeed;
                that.groundLevel = SCREEN_HEIGHT + 200;
                that.onGround = false;
                that.isFalling = false;
                that.updateSpriteDuringCollision();
            } else {
                updateDirection();
            }
        };

        var startRightJump = function () {
            if (that.onGround) {
                that.yVelocity = -20;
                that.xVelocity = that.speed;
                that.groundLevel = 600;
                that.onGround = false;
                that.isFalling = false;
            }
        };

        var startLeftJump = function () {
            if (that.onGround) {
                that.yVelocity = -20;
                that.xVelocity = -that.speed;
                that.groundLevel = 600;
                that.onGround = false;
                that.isFalling = false;
            }
        };

        var endJump = function () {
            if (that.yVelocity < that.ySpeed / 2) {
                that.yVelocity = that.ySpeed / 2;
            }
        };

        this.updateFrame = function () {

            that.yVelocity += that.gravity;

            if (that.yVelocity === 0) {
                that.isFalling = true;
                that.isUntouchable = false;
                that.platformType = 'standard';
            }

            endJump();

            that.animation.yPos += that.yVelocity;
            that.animation.xPos += that.xVelocity;

            if ((that.animation.yPos + that.animation.height) > that.groundLevel) {
                that.animation.resetYValueAfterCollision(that.groundLevel);
                that.onGround = true;
            }

            if (((that.animation.xPos) <= -40)) {
                that.animation.xPos = 360;
            }
            if (that.animation.xPos >= 400) {
                that.animation.xPos = 0;
            }
            if (that.onGround === true) {
                that.xVelocity = 0;
            }

            move();
            render();
            that.animation.render();

        };

        this.init();

    };


    var Villain = function (_xPos, _yPos, _type) {
        var that = this;

        this.width, this.height;

        this.xPos, this.yPos;

        this.type = _type;

        this.speed = 4;

        this.isDead;

        var xVelocity, yVelocity;

        this.element;

        this.init = function () {
            that.width = 100;
            that.height = 20;

            that.xPos = _xPos;
            that.yPos = _yPos;

            that.type = _type;

            that.speed = 4;

            that.isDead = false;

            xVelocity = 1;
            yVelocity = 8;


            that.element = document.createElement('div');

            that.element.style.position = 'absolute';
            that.element.style.top = that.yPos + 'px';
            that.element.style.left = that.xPos + 'px';

            if (that.type === 'greenVillain') {
                setSprite('greenVillain');

            } else if (that.type === 'redVillain') {
                setSprite('redVillain');

            }
        };


        function setSprite(command) {

            var coOrds = new Spritesheet().getSpriteCoordinates(command);

            that.width = coOrds.w;
            that.height = coOrds.h;

            that.element.style.width = that.width + 'px';
            that.element.style.height = that.height + 'px';

            that.element.style.backgroundImage = 'url("images/doodle-sprites-2.png")';
            that.element.style.backgroundRepeat = 'no-repeat';
            that.element.style.backgroundPositionX = coOrds.x + 'px';
            that.element.style.backgroundPositionY = coOrds.y + 'px';

            that.element.style.zIndex = 1;
        }

        var move = function (speed) {
            that.yPos += speed;
        };

        var autoMove = function () {
            if (that.xPos < 0 || that.xPos + that.width > SCREEN_WIDTH) {
                xVelocity *= -1;
            }

            that.xPos += xVelocity;

        };

        var moveDownAfterDeath = function () {
            that.yPos += yVelocity;
        };

        var render = function () {
            that.element.style.width = that.width + 'px';
            that.element.style.height = that.height + 'px';


            that.element.style.top = that.yPos + 'px';
            that.element.style.left = that.xPos + 'px';
        };


        this.updateFrame = function (speed) {

            if (that.isDead) {
                moveDownAfterDeath();
            } else {
                if (speed !== null) {
                    move(speed);
                }
                autoMove();
            }

            render();
        };

        this.updateFrameX = function () {
            if (that.isDead) {
                moveDownAfterDeath();
            } else {
                autoMove();
            }
            render();
        };

        this.init();

    };


    var GamePlay = function () {
        var that = this;

        this.element = document.createElement('div');

        this.playDivElement = document.createElement('div');

        var width = SCREEN_WIDTH;
        var height = SCREEN_HEIGHT;

        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';

        this.element.style.position = 'absolute';
        this.element.style.top = '0px';
        this.element.style.left = '0px';
        this.element.style.zIndex = 3;


        var appendStartMenu = function () {
            that.playDivElement.style.width = '200px';
            that.playDivElement.style.height = '50px';

            that.playDivElement.style.position = 'absolute';
            that.playDivElement.style.left = width / 2 - 100 + 'px';
            that.playDivElement.style.top = height / 2 - 25 + 'px';

            that.playDivElement.style.backgroundColor = 'lightblue';

            that.playDivElement.style.lineHeight = '50px';
            that.playDivElement.style.textAlign = 'center';
            that.playDivElement.style.textTransformation = 'uppercase';
            that.playDivElement.style.fontFamily = 'Ravie';
            that.playDivElement.style.fontSize = '24px';

            that.playDivElement.innerHTML = 'PLAY';

            that.playDivElement.onmouseover = function () {
                that.playDivElement.style.cursor = 'pointer';
                that.playDivElement.style.backgroundColor = 'blue';
            };

            that.playDivElement.onmouseout = function () {
                that.playDivElement.style.backgroundColor = 'lightblue';
            };

            that.element.appendChild(that.playDivElement);
        };

        this.hideMenu = function () {
            that.element.style.display = 'none';
        };

        this.showMenu = function () {
            that.element.style.display = 'block';
        };

        appendStartMenu();
    };


    var DoodleJump = function (_gameDiv) {

        var that = this;

        var interval = 20;
        var setTimeInterval;

        this.width = SCREEN_WIDTH;
        this.height = SCREEN_HEIGHT;

        var gamePlatform = _gameDiv;

        gamePlatform.style.width = that.width + 'px';
        gamePlatform.style.height = that.height + 'px';
        gamePlatform.style.border = '1px solid black';
        

        var gameDiv = document.createElement('div');

        gameDiv.style.width = that.width + 'px';
        gameDiv.style.height = that.height + 'px';
        gameDiv.style.position = 'relative';
        gameDiv.style.opacity = 1;
        gameDiv.style.overflow = 'hidden';

        gamePlatform.appendChild(gameDiv);
        

        var background = new Background();
        var player = new Player();
        var extraClass = new ExtraClass();
        var score = new Score();
        var gamePlay = new GamePlay();

        var platforms = [];
        var villains = [];

        var isGameOver = false;


        var createPlatform = function (xPos, yPos) {
            var platform = new Platform(xPos, yPos, 'standard');
            if (Math.random() < 0.01) {
                platform = new Platform(xPos, yPos, 'spring');
            } else if (Math.random() < 0.25) {
                platform = new Platform(xPos, yPos, 'moving');
            }
            gameDiv.appendChild(platform.element);

            platforms.push(platform);
        };

        var destroyPlatform = function (platformIndex) {
            platforms[platformIndex].element.remove();
            platforms.splice(platformIndex, 1);
        };

        var createVillain = function (xPos, yPos, type) {
            var villain = new Villain(xPos, yPos, type);
            gameDiv.appendChild(villain.element);

            villains.push(villain);
        };

        var destroyVillain = function (villainIndex) {
            villains[villainIndex].element.remove();
            villains.splice(villainIndex, 1);
        };

        var createPlatformsTemp = function () {
            platforms = [
                new Platform(200, 500, 'standard'),
                new Platform(200, 400, 'standard'),
                new Platform(0, 300, 'standard'),
                new Platform(200, 200, 'standard'),
                new Platform(200, 100, 'standard'),
                new Platform(400, 0, 'standard'),
                new Platform(200, 0, 'standard')
            ];

            for (var i = 0; i < platforms.length; i++) {
                gameDiv.appendChild(platforms[i].element);
            }

        };

        var updatePlatforms = function () {

            var prevX = platforms[platforms.length - 1].xPos;
            var prevY = platforms[platforms.length - 1].yPos;

            var coOrd = extraClass.getRandomCoordinates(prevX, prevY);

            if (coOrd !== null) {
                createPlatform(coOrd.xCord, coOrd.yCord);
            }
        };

        var updateVillains = function () {

            var randNum = Math.random();
            if (randNum < 0.01) {

                var coOrd;

                if (villains.length === 0) {
                    coOrd = extraClass.getRandomCoordinatesForVillain(100, 10);
                } else {
                    var prevX = villains[villains.length - 1].xPos;
                    var prevY = villains[villains.length - 1].yPos;

                    coOrd = extraClass.getRandomCoordinatesForVillain(prevX, prevY);
                }

                if (coOrd !== null) {
                    var type = 'greenVillain';
                    if (Math.random() > 0.5) {
                        type = 'redVillain';
                    }
                    createVillain(coOrd.xCord, coOrd.yCord - 50, type);                    //console.log('villain created', coOrd.xCord, coOrd.yCord - 50, type);
                }
            }
        };

        var updateBackground = function () {

            if (player.yPos < 300) {

                player.animation.yPos = 300;

                score.updateScore('height');

                //update background
                background.updateFrame();

                //update villains
                for (var i = 0; i < villains.length; i++) {
                    if (villains[i].yPos > 600) {
                        destroyVillain(i);
                    } else {
                        villains[i].updateFrame(Math.abs(player.yVelocity));
                    }
                }

                //update blocks
                for (var i = 0; i < platforms.length; i++) {
                    if (platforms[i].yPos > 600) {
                        destroyPlatform(i);
                    } else {
                        platforms[i].updateFrame(Math.abs(player.yVelocity));
                    }
                }

                updatePlatforms();

                updateVillains();

            }
        };

        var manageCollisionOfPlayerVillains = function () {
            var collisionStatusIndex = extraClass.checkCollisionOfPlayerVillains(player, villains);
            if (collisionStatusIndex !== null) {
                if (collisionStatusIndex === 'collided') {
                    if (player.isUntouchable === false) {
                        isGameOver = true;
                    }
                } else {
                    if (player.isFalling) {
                        villains[collisionStatusIndex].isDead = true;
                        player.groundLevel = villains[collisionStatusIndex].yPos;
                        score.updateScore(villains[collisionStatusIndex].type);
                    }
                }
            }
        };

        var gameOver = function () {
            clearTimeout(setTimeInterval);
            console.log('Game Over');
            alert('Game Over\nScore: ' + score.score);
            displayMenu();
        };

        var gameSetup = function () {

            gameDiv.appendChild(background.element);

            gameDiv.appendChild(score.element);

            createPlatformsTemp();

            gameDiv.appendChild(player.element);
        };

        var resetGameSetup = function () {
            if (gameDiv.hasChildNodes()) {
                while (gameDiv.hasChildNodes()) {
                    gameDiv.removeChild(gameDiv.firstChild);
                }
            }
            background.init();
            player.init();
            score.init();
            platforms = [];
            villains = [];

            isGameOver = false;
            
            gameSetup();
        };

        var displayGame = function () {
            gameDiv.style.opacity = 1;
            resetGameSetup();
            setTimeInterval = setInterval(gameLoop, interval);
        };

        var displayMenu = function () {
            gameDiv.style.opacity = 0.5;
            gamePlay.showMenu();
        };

        var gamePlaySetup = function () {

            gamePlatform.appendChild(gamePlay.element);

            gamePlay.playDivElement.onclick = function () {
                gamePlay.hideMenu();
                displayGame();
            };
        };

        //var loopCounter = 0;

        var gameLoop = function () {

            if (!isGameOver) {
                //loopCounter++;

                if (player.isFalling) {
                    if (!extraClass.checkCollisionOfPlayerPlatforms(player, platforms)) {

                    }
                }

                manageCollisionOfPlayerVillains();

                score.updateScore(1);

                updateBackground();

                player.updateFrame();

                for (var i = 0; i < platforms.length; i++) {
                    if (platforms[i].type === 'moving') {
                        platforms[i].updateFrameX();
                    }
                }

                for (var i = 0; i < villains.length; i++) {
                    villains[i].updateFrameX();
                }

                if (player.yPos >= SCREEN_HEIGHT) {
                    isGameOver = true;
                }

            } else {
                gameOver();
            }

        };

        var init = function () {

            gamePlaySetup();

            //gamePlay.displayStartMenu();


            //gameSetup();

            //setTimeInterval = setInterval(gameLoop, interval);
        };

        init();
    };


    window.DoodleJump = DoodleJump;

})();