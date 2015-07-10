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

    var Background = function () {

        var that = this;

        this.element = document.createElement('div');

        this.imgSrc = 'images/doodle-background.png';

        var xPos = 0;
        var yPos = -80;

        var width = 400;
        var height = 680;

        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.top = yPos + 'px';
        this.element.style.left = xPos + 'px';
        this.element.style.backgroundImage = 'url("' + this.imgSrc + '")';
        this.element.style.backgroundRepeat = 'repeat-x repeat-y';

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
//            var coOrds;
//            if (command === 'moveLeft') {
//                coOrds = findCoOrd('leftFace');
//            } else if (command === 'moveRight') {
//                coOrds = findCoOrd('rightFace');
//            } else if (command === 'leftJump') {
//                coOrds = findCoOrd('leftJump');
//            } else if (command === 'rightJump') {
//                coOrds = findCoOrd('rightJump');
//            } else if (command === 'springDown') {
//                coOrds = findCoOrd('springDown');
//            } else if (command === 'springUp') {
//                coOrds = findCoOrd('springUp');
//            }

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


    var Platform = function (_width, _height, _xPos, _yPos, _type) {

        var that = this;

        this.width = _width;
        this.height = _height;

        this.type = _type;
        var xVelocity = 1;

        this.xPos = _xPos;
        this.yPos = _yPos;

        this.element = document.createElement('div');

        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.left = this.xPos + 'px';
        this.element.style.top = this.yPos + 'px';

        if (this.type === 'standard') {

            setSprite('greenBlock');

        } else if (this.type === 'spring') {

            setSprite('blueBlock');

            setSpringSprite('springDown');

        } else if (this.type === 'moving') {

            setSprite('whiteBlock');

        }

        function setSprite(command) {

            var coOrds = new Spritesheet().getSpriteCoordinates(command);
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

        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 3;
        this.element.style.width = '100px';
        this.element.style.height = '20px';
        this.element.style.top = '0px';
        this.element.style.right = '0px';
        this.element.style.textAlign = 'right';
        this.element.style.backgroundColor = 'grey';
        this.element.style.color = 'white';

        this.score = 0;

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
    };


    var Player = function () {
        var that = this;

        this.width = 50;
        this.height = 78;

        var innerElementWidth = 80;
        var innerElementHeight = 78;

        this.yPos = SCREEN_HEIGHT - this.height;
        this.xPos = (SCREEN_WIDTH - this.width) / 2;

        this.xVelocity = 0;
        this.yVelocity = 0;

        this.spriteCord = {};

        this.speed = 4;
        this.ySpeed = -25;
        this.direction = 'right';
        this.platformType = 'standard';

        this.isUntouchable = false;

        //var color = 'green';

        this.element = document.createElement('div');
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.top = this.yPos + 'px';
        this.element.style.left = this.xPos + 'px';
        this.element.style.zIndex = '2';


        var innerElement = document.createElement('div');

        innerElement.style.width = innerElementWidth + 'px';
        innerElement.style.height = innerElementHeight + 'px';
        //this.innerElement.style.position = 'absolute';
        //this.innerElement.style.top = this.yPos + 'px';
        //this.innerElement.style.left = this.xPos + 'px';
        innerElement.style.backgroundImage = 'url("images/doodle-sprites.png")';
        //        this.element.style.backgroundColor = color;

        this.element.appendChild(innerElement);

        this.animation = new Animation(this);
        this.spriteSheet = new Spritesheet();

        this.spriteCord = this.spriteSheet.getSpriteCoordinates('rightFace');

        this.onGround = true;
        this.isFalling = true;
        this.groundLevel = 600;
        this.gravity = 0.5;

        var move = function () {
            that.ySpeed = -25;
            if (that.platformType === 'spring') {
                that.ySpeed = -100;
                that.isUntouchable = true;
            }

            that.startJump();

            window.onkeypress = function (event) {

                var keyCode = event.which || event.keyCode;

                if (keyCode === 97) {
                    that.xVelocity = -that.speed;
                    that.direction = 'left';
                }
                if (keyCode === 100) {
                    that.xVelocity = that.speed;
                    that.direction = 'right';
                }
                if (keyCode === 119) {
                    that.startJump();
                }
                if ((keyCode === 113)) {
                    startLeftJump();
                }
                if ((keyCode === 101)) {
                    startRightJump();
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
                that.groundLevel = 600;
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

    };


    var Villain = function (_xPos, _yPos, _type) {
        var that = this;

        this.width = 100;
        this.height = 20;

        this.xPos = _xPos;
        this.yPos = _yPos;

        this.type = _type;

        this.speed = 4;

        this.moveDown = false;

        this.isDead = false;

        var xVelocity = 1;
        var yVelocity = 8;


        this.element = document.createElement('div');

        this.element.style.position = 'absolute';
        this.element.style.top = this.yPos + 'px';
        this.element.style.left = this.xPos + 'px';

        if (this.type === 'greenVillain') {
            setSprite('greenVillain');

        } else if (this.type === 'redVillain') {
            setSprite('redVillain');

        }

        function setSprite(command) {

            var coOrds = new Spritesheet().getSpriteCoordinates(command);
            that.element.style.backgroundImage = 'url("images/doodle-sprites-2.png")';
            that.element.style.backgroundRepeat = 'no-repeat';
            that.element.style.backgroundPositionX = coOrds.x + 'px';
            that.element.style.backgroundPositionY = coOrds.y + 'px';

            that.element.style.zIndex = 1;

            that.width = coOrds.w;
            that.height = coOrds.h;
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

    };


    var DoodleJump = function (_gameDiv) {

        var that = this;

        var interval = 20;
        var setTimeInterval;

        var gameDiv = _gameDiv;
        this.width = 400;
        this.height = 600;

        var background = new Background();
        var player = new Player();
        var extraClass = new ExtraClass();
        var score = new Score();

        var platforms = [];
        var villains = [];

        var isGameOver = false;


        var createPlatform = function (width, height, xPos, yPos) {
            var platform = new Platform(width, height, xPos, yPos, 'standard');
            if (Math.random() < 0.1) {
                platform = new Platform(width, height, xPos, yPos, 'spring');
            } else if (Math.random() < 0.25) {
                platform = new Platform(width, height, xPos, yPos, 'moving');
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
                new Platform(100, 26, 200, 500, 'standard'),
                new Platform(100, 26, 200, 400, 'standard'),
                new Platform(100, 26, 200, 300, 'standard'),
                new Platform(100, 26, 200, 200, 'standard'),
                new Platform(100, 26, 200, 100, 'standard'),
                new Platform(100, 26, 200, 0, 'standard')
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
                createPlatform(100, 26, coOrd.xCord, coOrd.yCord);
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
        };


        var gameSetup = function () {
            gameDiv.style.width = that.width + 'px';
            gameDiv.style.height = that.height + 'px';
            gameDiv.style.position = 'relative';
            gameDiv.style.border = '1px solid black';
            gameDiv.style.overflow = 'hidden';


            gameDiv.appendChild(background.element);

            gameDiv.appendChild(score.element);

            createPlatformsTemp();

            gameDiv.appendChild(player.element);
        };

        //var loopCounter = 0;

        var gameLoop = function () {

            if (!isGameOver) {
                //loopCounter++;

                if (player.isFalling) {
                    if (!extraClass.checkCollisionOfPlayerPlatforms(player, platforms)) {
                        player.groundLevel = 600;
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
            } else {
                gameOver();
            }

        };

        var init = function () {
            gameSetup();

            setTimeInterval = setInterval(gameLoop, interval);
        };

        init();
    };


    window.DoodleJump = DoodleJump;

})();