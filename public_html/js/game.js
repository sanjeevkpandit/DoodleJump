/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


;
(function () {
    'use strict';


    var Background = function () {

        var that = this;

        this.element = document.createElement('div');

        this.imgSrc = 'images/sky-fluffy-clouds.JPG';

        var xPos = 0;
        var yPos = -60000;

        var width = 600;
        var height = 61280;

        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.top = yPos + 'px';
        this.element.style.left = xPos + 'px';
        //this.element.style.backgroundColor = 'lightblue';
        this.element.style.background = 'url(' + this.imgSrc + ') repeat-y top left';


        var move = function () {
            yPos += 2;
        };

        var render = function () {
            that.element.style.top = yPos + 'px';
        };

        this.updateFrame = function () {
            move();
            render();
        };
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


    var Player = function () {
        var that = this;

        this.width = 40;
        this.height = 50;

        var screenWidth = 600;
        var screenHeight = 600;

        this.yPos = screenHeight - this.height;
        this.xPos = (screenWidth - this.width) / 2;

        this.xVelocity = 0;
        this.yVelocity = 0;

        this.speed = 4;

        var color = 'green';

        this.element = document.createElement('div');

        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.top = this.yPos + 'px';
        this.element.style.left = this.xPos + 'px';
        this.element.style.backgroundColor = color;

        this.animation = new Animation(this);

        this.onGround = true;
        this.isFalling = true;
        this.groundLevel = 600;
        this.gravity = 0.5;

        var move = function () {
            
            startJump();

            window.onkeypress = function (event) {

                var keyCode = event.which || event.keyCode;

                if (keyCode === 97) {
                    moveInDirection('left');
                }
                if (keyCode === 100) {
                    moveInDirection('right');
                }
                if (keyCode === 119) {
                    startJump();
                }
                if ((keyCode === 113)) {
                    startLeftJump();
                }
                if ((keyCode === 101)) {
                    startRightJump();
                }
            };

        };

        var moveInDirection = function (direction) {
            that.animation.move(direction);
        };

        var startJump = function () {

            if (that.onGround) {
                that.yVelocity = -20;
                that.groundLevel = 600;
                that.onGround = false;
                that.isFalling = false;
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
            if (that.yVelocity < -10) {
                that.yVelocity = -10;
            }
        };

        this.updateFrame = function () {

            that.yVelocity += that.gravity;

            if (that.yVelocity === 0) {
                that.isFalling = true;
            }

            endJump();

            that.animation.yPos += that.yVelocity;
            that.animation.xPos += that.xVelocity;

            if ((that.animation.yPos + that.animation.height) > that.groundLevel) {
                that.animation.resetYValueAfterCollision(that.groundLevel);
                that.onGround = true;
            }
            if (((that.animation.xPos) < 0) || ((that.animation.xPos + that.animation.width) > 600)) {
                that.animation.resetXValue();
            }
            if (that.onGround === true) {
                that.xVelocity = 0;
            }

            move();
            that.animation.render();

        };

    };


    var Platform = function (_width, _height, _xPos, _yPos) {

        var that = this;

        this.width = _width;
        this.height = _height;

        this.xPos = _xPos;
        this.yPos = _yPos;

        this.element = document.createElement('div');

        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.left = this.xPos + 'px';
        this.element.style.top = this.yPos + 'px';
        this.element.style.backgroundColor = 'black';
        this.element.style.border = '2px solid black';


        var move = function (speed) {
            that.yPos += speed;
        };

        var render = function () {
            that.element.style.top = that.yPos + 'px';
        };

        this.updateFrame = function (speed) {
            move(speed);
            render();
        };
    };


    var DoodleJump = function (_gameDiv) {

        var that = this;

        var interval = 20;

        var gameDiv = _gameDiv;
        this.width = 600;
        this.height = 600;

        var background = new Background();
        var player = new Player();
        var platforms = [];
        var collision = new Collision();

        //var canCreateNewPlatforms = false;


        var createPlatform = function (width, height, xPos, yPos) {
            var platform = new Platform(width, height, xPos, yPos);
            gameDiv.appendChild(platform.element);

            platforms.push(platform);

            console.log('Create new platform: ', width, height, xPos, yPos);
        };

        var destroyPlatform = function (platformIndex) {
            platforms[platformIndex].element.remove();
            platforms.splice(platformIndex, 1);
        };


        var createPlatformsTemp = function () {
            platforms = [
                new Platform(200, 10, 200, 500),
                new Platform(200, 10, 200, 400),
                new Platform(200, 10, 200, 300),
                new Platform(200, 10, 200, 200)
            ];

            for (var i = 0; i < platforms.length; i++) {
                gameDiv.appendChild(platforms[i].element);
            }

        };

        var checkCollision = function () {
            for (var i = 0; i < platforms.length; i++) {
                if (collision.checkTopCollision(player.animation, platforms[i])) {

                    player.animation.resetYValueAfterCollision(platforms[i].yPos);
                    player.groundLevel = platforms[i].yPos;
                    player.yVelocity = 0;

                    return true;
                }
            }
            return false;
        };

        var getRandomCoordinates = function (prevX, prevY) {
            
            var randomXValue = Math.floor(Math.random() * 3);
            
            var randomYValue = Math.floor(Math.random() * 3) + 1;

            var newX = randomXValue*100;
            var newY = randomYValue*50;
            
            if ((newY <= (prevY - 50)) && (newY > (prevY - 300))) {
                //newY = prevY - newY;
                
                return {xCord: newX, yCord: newY};
            }
            
            return null;
        };

        var updatePlatforms = function () {

            var prevX = platforms[platforms.length - 1].xPos;
            var prevY = platforms[platforms.length - 1].yPos;

            var coOrd = getRandomCoordinates(prevX, prevY);
            
            if (coOrd !== null) {
                createPlatform(200, 10, coOrd.xCord, coOrd.yCord);
            }
        };

        var updateBackground = function () {

            if (player.yPos < 400) {
                
                
                //debugger;
                
                
                //update background
                console.log('updating background');
                background.updateFrame();

                //update blocks
                for (var i = 0; i < platforms.length; i++) {
                    if (platforms[i].yPos > 600) {
                        destroyPlatform(i);
                    } else {
                        platforms[i].updateFrame(Math.abs(player.yVelocity));
                    }
                }

                updatePlatforms();

            }
        };


        var gameSetup = function () {
            gameDiv.style.width = that.width + 'px';
            gameDiv.style.height = that.height + 'px';
            gameDiv.style.position = 'relative';
            gameDiv.style.border = '1px solid black';
            gameDiv.style.overflow = 'hidden';


            gameDiv.appendChild(background.element);

            createPlatformsTemp();

            gameDiv.appendChild(player.element);
        };

        var loopCounter = 0;

        var gameLoop = function () {

            loopCounter++;

            //background.updateFrame();
            player.updateFrame();

            updateBackground();

            if (player.isFalling) {
                if (!checkCollision()) {
                    player.groundLevel = 600;
                }
            }

        };

        var init = function () {
            gameSetup();

            setInterval(gameLoop, interval);
        };

        init();
    };


    window.DoodleJump = DoodleJump;

})();