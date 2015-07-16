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


    /*Background*/
    var Background = function () {

        var that = this;

        this.element;

        var xPos, yPos;

        var width, height;

        /*Initialize and/or reset*/
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

        /*move down*/
        var move = function () {
            if (yPos >= 0) {
                yPos = -80;
            }
            yPos += 2;
        };

        /*display in browser*/
        var render = function () {
            that.element.style.top = yPos + 'px';
        };

        /*update status*/
        this.updateFrame = function () {
            move();
            render();
        };

        /*Load at the beginning*/
        this.init();
    };


    /*Animation of Player*/
    var Animation = function (_character) {

        var that = this;

        var character = _character;
        var element = character.element;

        this.xPos = character.xPos;
        this.yPos = character.yPos;
        this.width = character.width;
        this.height = character.height;

        var speed = character.speed;

        /*reset the values of character*/
        this.resetValues = function () {
            that.xPos = character.xPos;
            that.yPos = character.yPos;
            that.width = character.width;
            that.height = character.height;
            character.yVelocity = 0;
        };

        /*Reset Y position only*/
        this.resetYValue = function () {
            that.yPos = character.yPos;
        };

        /*reset Y position after collision*/
        this.resetYValueAfterCollision = function (_yValue) {
            that.yPos = character.yPos = _yValue - character.height;
        };

        /*reset X position only*/
        this.resetXValue = function () {
            that.xPos = character.xPos;
        };

        /*move left or right*/
        this.move = function (direction) {
            if (direction === 'left') {
                that.xPos -= speed;
            }
            if (direction === 'right') {
                that.xPos += speed;
            }
        };

        /*display in browser*/
        this.render = function () {

            character.xPos = that.xPos;
            character.yPos = that.yPos;

            element.style.left = character.xPos + 'px';
            element.style.top = character.yPos + 'px';
        };


    };


    /*Sounds*/
    var Sounds = function () {
        
        var that = this;
        
        this.sound = new Audio();
        this.sound.loop = false;
        
        var soundFiles = [
            'sounds/start.wav',
            'sounds/jump.wav',
            'sounds/feder.mp3',
            'sounds/jumponvillain.mp3',
            'sounds/finish.mp3',
            'sounds/allsounds.mp3'
        ];

        var playSoundFile = function (soundFile) {
            that.sound.src = soundFile;
            that.sound.play();
        };
        
        this.pauseAudio = function(){
            
        };

        this.playSound = function (command) {

            switch (command) {
                case 'play':
                    playSoundFile(soundFiles[0]);
                    break;
                case 'jump':
                    playSoundFile(soundFiles[1]);
                    break;
                case 'jumpOnVillain':
                    playSoundFile(soundFiles[3]);
                    break;
                case 'jumpOnSpring':
                    playSoundFile(soundFiles[2]);
                    break;
                case 'finish':
                    playSoundFile(soundFiles[4]);
                    break;
                case 'background':
                    playSoundFile(soundFiles[5]);
                    break;
                default:
                    break;
            }
        };

    };


    /*Collision Detection of Two Objects*/
    var Collision = function () {

        /*Check if Object A reaches on top of Object B*/
        this.checkTopCollision = function (objectA, objectB) {
            if (((objectA.xPos + objectA.width) > objectB.xPos) && (objectA.xPos < (objectB.xPos + objectB.width))) {
                /*if Object A is in X-axis region of Object B*/
                if (((objectA.yPos + objectA.height) >= objectB.yPos) && (objectA.yPos < objectB.yPos) && ((objectA.yPos + objectA.height) < (objectB.yPos + objectB.height))) {
                    /*if Object A bottom is on top of Object B*/
                    return true;
                }
            }
            return false;

        };

        /*Check if Object A collides with Object B in any direction*/
        this.checkCollision = function (objectA, objectB) {
            if (((objectA.xPos + objectA.width) > objectB.xPos) && (objectA.xPos < (objectB.xPos + objectB.width))) {
                /*if Object A is in X-axis region of Object B*/
                if (((objectA.yPos + objectA.height) > objectB.yPos) && (objectA.yPos < (objectB.yPos + objectB.height))) {
                    /*if Object A bottom is besides of Object B*/
                    return true;
                }
            }
            return false;
        };
    };


    /*SpriteSheet foor player, enemy and blocks/platforms*/
    var Spritesheet = function () {

        var that = this;

        /*Co-ordinates of sprites for player, enemies and platforms/blocks*/
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

        /*return required co-ordinates as per request*/
        this.getSpriteCoordinates = function (command) {

            return findCoOrd(command);

        };

        /*search for co-ordinates*/
        var findCoOrd = function (command) {
            for (var i = 0; i < coordinates.length; i++) {
                if (coordinates[i].action === command) {
                    return coordinates[i].coOrd;
                }
            }
        };
    };


    /*Sprite Div for Player and Villains*/
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


    /*Blocks for moving up*/
    var Platform = function (_xPos, _yPos, _type) {

        var that = this;

        this.width, this.height;

        this.type;
        var xVelocity;

        this.xPos, this.yPos;

        this.element;


        /*initialize or reset the platform*/
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

                /*green Block (Still)*/
                setSprite('greenBlock');

            } else if (that.type === 'spring') {

                /*Blue Block (Spring)*/
                setSprite('blueBlock');

                setSpringSprite('springDown');

            } else if (that.type === 'moving') {

                /*White Block (Moving)*/
                setSprite('whiteBlock');

            }
        };

        /*set the sprite image*/
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

        /*append spring to Blue(Spring) Block*/
        function setSpringSprite(command) {

            var sprite = new Sprite(command);

            sprite.element.style.left = sprite.coOrds.w / 2 + 'px';
            sprite.element.style.top = -sprite.coOrds.h + 'px';

            that.element.appendChild(sprite.element);
        }

        /*Update the spring sprite/image on top collision with player*/
        this.changeSpringSprite = function () {
            if (that.type === 'spring') {
                that.element.removeChild(that.element.childNodes[0]);
                setSpringSprite('springUp');
            }
        };

        /*move down*/
        var move = function (speed) {
            that.yPos += speed;
        };

        /*automatically move in X-axis for White(Moving) Block*/
        var autoMove = function () {
            if (that.xPos < 0 || that.xPos + that.width > SCREEN_WIDTH) {
                xVelocity *= -1;
            }

            that.xPos += xVelocity;
        };

        /*display in browser*/
        var render = function () {
            that.element.style.left = that.xPos + 'px';
            that.element.style.top = that.yPos + 'px';
        };

        /*update the status*/
        this.updateFrame = function (speed) {
            move(speed);
            render();
        };

        /*update the status (for White(Moving) Block)*/
        this.updateFrameX = function () {
            autoMove();
            render();
        };


        /*Initialize at the beginning*/
        this.init();
    };


    /*ExtraClass for extra oprations in Main Class*/
    var ExtraClass = function () {

        var collision = new Collision();

        /*get random co-ordinates for blocks/platform*/
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

        /*get random co=ordinates for villains*/
        this.getRandomCoordinatesForVillain = function (prevX, prevY) {

            var randomXValue = Math.floor(Math.random() * 4);

            var randomYValue = Math.floor(Math.random() * 3) + 1;

            var newX = randomXValue * 100;
            var newY = randomYValue * -50;

            return {xCord: newX, yCord: newY};

        };

        /*check collision of player and platforms (top collision)*/
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

        /*check collision of player and villains in all directions and top collision as well*/
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

    };


    /*Score */
    var Score = function () {

        var that = this;

        this.element;

        this.score;

        /*Initialize and reset the score*/
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
            //that.element.style.fontFamily = 'Candara';
            that.element.style.fontSize = '16px';
            that.element.style.fontWeight = 'bold';
            that.element.style.color = 'white';

            that.score = 0;
        };

        /*display in browser*/
        var render = function () {
            that.element.innerHTML = 'Score: ' + that.score;
        };

        /*update score */
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

        /*Initialize at the beginning*/
        this.init();
    };


    /*Player*/
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
        var sounds = null;

        /*Initialize or reset the player*/
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
            
            sounds = new Sounds();
        };

        /*move*/
        var move = function () {

            that.ySpeed = -25;

            if (that.platformType === 'spring') {
                //sounds.playSound('jumpOnSpring');
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

        /*display in browser*/
        var render = function () {
            innerElement.style.backgroundPositionX = that.spriteCord.x + 'px';
            innerElement.style.backgroundPositionY = that.spriteCord.y + 'px';
        };

        /*update direction of sprite image*/
        var updateDirection = function () {
            if (that.direction === 'left') {
                innerElement.style.marginLeft = '-30px';
                that.spriteCord = that.spriteSheet.getSpriteCoordinates('leftFace');
            } else if (that.direction === 'right') {
                innerElement.style.marginLeft = '0px';
                that.spriteCord = that.spriteSheet.getSpriteCoordinates('rightFace');
            }
        };

        /*update sprite image after top collision with objects*/
        this.updateSpriteDuringCollision = function () {
            if (that.direction === 'left') {
                innerElement.style.marginLeft = '-30px';
                that.spriteCord = that.spriteSheet.getSpriteCoordinates('leftJump');
            } else if (that.direction === 'right') {
                innerElement.style.marginLeft = '0px';
                that.spriteCord = that.spriteSheet.getSpriteCoordinates('rightJump');
            }
        };

        /*jump*/
        this.startJump = function () {
            if (that.onGround) {
                that.yVelocity = that.ySpeed;
                that.groundLevel = SCREEN_HEIGHT + 200;
                that.onGround = false;
                that.isFalling = false;
                if (that.platformType === 'spring') {
                    sounds.playSound('jumpOnSpring');
                } else {
                    sounds.playSound('jump');
                }
                that.updateSpriteDuringCollision();
            } else {
                updateDirection();
            }
        };

        /*limit the height after jump*/
        var endJump = function () {
            if (that.yVelocity < that.ySpeed / 2) {
                that.yVelocity = that.ySpeed / 2;
            }
        };

        /*update status*/
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

            /*check if the player has moved beyond the screen, if true: make the player appear on other side of screen*/
            if (((that.animation.xPos) <= -40)) {
                that.animation.xPos = SCREEN_WIDTH - 40;
            }
            if (that.animation.xPos >= SCREEN_WIDTH) {
                that.animation.xPos = 0;
            }

            if (that.onGround === true) {
                that.xVelocity = 0;
            }

            move();
            render();
            that.animation.render();

        };

        /*initialize at the beginning*/
        this.init();

    };


    /*Villain*/
    var Villain = function (_xPos, _yPos, _type) {
        var that = this;

        this.width, this.height;

        this.xPos, this.yPos;

        this.type = _type;

        this.speed = 4;

        this.isDead;

        var xVelocity, yVelocity;

        this.element;

        /*initialize or reset the villain*/
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

        /*set sprite image for villain*/
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

        /*move in Y-axis*/
        var move = function (speed) {
            that.yPos += speed;
        };

        /*move in X-axis*/
        var autoMove = function () {

            /*set X-axis limits for horizontal movement*/
            if (that.xPos < 0 || that.xPos + that.width > SCREEN_WIDTH) {
                xVelocity *= -1;
            }

            that.xPos += xVelocity;

        };

        /*move down after top collision with player*/
        var moveDownAfterDeath = function () {
            that.yPos += yVelocity;
        };

        /*display in browser*/
        var render = function () {
            that.element.style.width = that.width + 'px';
            that.element.style.height = that.height + 'px';

            that.element.style.top = that.yPos + 'px';
            that.element.style.left = that.xPos + 'px';
        };

        /*update status*/
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

        /*update status for X-axis*/
        this.updateFrameX = function () {
            if (that.isDead) {
                moveDownAfterDeath();
            } else {
                autoMove();
            }
            render();
        };

        /*Initialize at the beginning*/
        this.init();

    };


    /*Game Menu before and after playing game*/
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

        /*display "PLAY" option before and after game*/
        var appendStartMenu = function () {
            that.playDivElement.style.width = '200px';
            that.playDivElement.style.height = '50px';

            that.playDivElement.style.position = 'absolute';
            that.playDivElement.style.left = width / 2 - 100 + 'px';
            that.playDivElement.style.top = height / 2 - 25 + 'px';

            that.playDivElement.style.backgroundColor = '#7dc046';

            that.playDivElement.style.borderRadius = '50px';

            that.playDivElement.style.lineHeight = '50px';
            that.playDivElement.style.textAlign = 'center';
            that.playDivElement.style.textTransformation = 'uppercase';
            //that.playDivElement.style.fontFamily = 'Candara';
            that.playDivElement.style.fontSize = '24px';
            that.playDivElement.style.color = 'white';

            that.playDivElement.innerHTML = 'PLAY';

            that.playDivElement.onmouseover = function () {
                that.playDivElement.style.cursor = 'pointer';
                that.playDivElement.style.backgroundColor = '#65a334';
            };

            that.playDivElement.onmouseout = function () {
                that.playDivElement.style.backgroundColor = '#7dc046';
            };

            that.element.appendChild(that.playDivElement);
        };

        /*display SCORESHEET after game over*/
        this.appendScoreSheet = function (score) {

            var scoreDiv = document.getElementById('scoreCard');
            if (scoreDiv === null) {
                scoreDiv = document.createElement('div');

                scoreDiv.setAttribute('id', 'scoreCard');

                scoreDiv.style.width = SCREEN_WIDTH + 'px';
                scoreDiv.style.height = '100px';

                scoreDiv.style.position = 'absolute';

                scoreDiv.style.backgroundColor = '#7dc046';
                //scoreDiv.style.backgroundImage = 'url("images/green-bg.png")';
                //scoreDiv.style.backgroundRepeat = 'repeat-y repeat-x';

                scoreDiv.style.lineHeight = '100px';
                scoreDiv.style.textAlign = 'center';
                scoreDiv.style.textTransformation = 'capitalize';
                //scoreDiv.style.fontFamily = 'Candara';
                scoreDiv.style.fontSize = '18px';
                scoreDiv.style.color = 'white';

                var scoreElement = document.createElement('div');
                var highScoreElement = document.createElement('div');

                scoreElement.style.float = 'left';

                highScoreElement.style.float = 'right';

                scoreDiv.appendChild(scoreElement);
                scoreDiv.appendChild(highScoreElement);
            }

            scoreDiv.children[0].innerHTML = 'Your Score: ' + score;
            scoreDiv.children[1].innerHTML = 'High Score: ' + localStorage.getItem('highScore');

            that.element.appendChild(scoreDiv);
        };

        /*display instructions for playing*/
        var appendInstructionsSheet = function () {

            var instructionsDiv = document.getElementById('instructionCard');
            if (instructionsDiv === null) {
                instructionsDiv = document.createElement('div');

                instructionsDiv.setAttribute('id', 'instructionCard');

                instructionsDiv.style.width = SCREEN_WIDTH + 'px';
                instructionsDiv.style.height = '100px';

                instructionsDiv.style.position = 'absolute';
                instructionsDiv.style.top = SCREEN_HEIGHT - 100 + 'px';
                instructionsDiv.style.left = 0;

                instructionsDiv.style.backgroundColor = '#7dc046';
                //instructionsDiv.style.backgroundImage = 'url("images/green-bg.png")';

                instructionsDiv.style.textAlign = 'center';
                //instructionsDiv.style.fontFamily = 'Candara';
                instructionsDiv.style.fontSize = '18px';
                instructionsDiv.style.color = 'white';
            }

            instructionsDiv.innerHTML = '<strong>Instructions</strong><br/><br/>Press <strong>A</strong> to move <strong>Left</strong><br/>Press <strong>D</strong> to move <strong>Right</strong>';

            that.element.appendChild(instructionsDiv);
        };

        /*hide menu for playing game*/
        this.hideMenu = function () {
            that.element.style.display = 'none';
        };

        /*display menu before and after playing game*/
        this.showMenu = function () {
            that.element.style.display = 'block';
        };

        /*display play menu and instruction sheet*/
        appendStartMenu();
        appendInstructionsSheet();
    };


    /*Main class for game*/
    var DoodleJump = function (_gameDiv) {

        var that = this;

        var interval = 20;
        var setTimeInterval;

        this.width = SCREEN_WIDTH;
        this.height = SCREEN_HEIGHT;

        var gamePlatform = _gameDiv;

        gamePlatform.style.width = that.width + 'px';
        gamePlatform.style.height = that.height + 'px';
        gamePlatform.style.position = 'relative';
        gamePlatform.style.margin = '0 auto';
        gamePlatform.style.border = '1px solid #7dc046';


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
        var sounds = new Sounds();

        var platforms = [];
        var villains = [];

        var isGameOver = false;

        /*create new block/platform*/
        var createPlatform = function (xPos, yPos) {
            var platform = new Platform(xPos, yPos, 'standard');
            if (Math.random() < 0.21) {
                platform = new Platform(xPos, yPos, 'spring');
            } else if (Math.random() < 0.25) {
                platform = new Platform(xPos, yPos, 'moving');
            }
            gameDiv.appendChild(platform.element);

            platforms.push(platform);
        };

        /*destroy unwanted block/platform*/
        var destroyPlatform = function (platformIndex) {
            platforms[platformIndex].element.remove();
            platforms.splice(platformIndex, 1);
        };

        /*create new villain*/
        var createVillain = function (xPos, yPos, type) {
            var villain = new Villain(xPos, yPos, type);
            gameDiv.appendChild(villain.element);

            villains.push(villain);
        };

        /*destroy unwanted villain*/
        var destroyVillain = function (villainIndex) {
            villains[villainIndex].element.remove();
            villains.splice(villainIndex, 1);
        };

        /*create platforms at the beginning*/
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

        /*create new platforms as the player rises up*/
        var updatePlatforms = function () {

            var prevX = platforms[platforms.length - 1].xPos;
            var prevY = platforms[platforms.length - 1].yPos;

            var coOrd = extraClass.getRandomCoordinates(prevX, prevY);

            if (coOrd !== null) {
                createPlatform(coOrd.xCord, coOrd.yCord);
            }
        };

        /*create new villains as the player rises up*/
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
                    createVillain(coOrd.xCord, coOrd.yCord - 50, type);
                }
            }
        };

        /*update background, platforms, villains as the player rises up*/
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

        /*manage collision of player and villains*/
        var manageCollisionOfPlayerVillains = function () {
            var collisionStatusIndex = extraClass.checkCollisionOfPlayerVillains(player, villains);
            if (collisionStatusIndex !== null) {
                if (collisionStatusIndex === 'collided') {
                    if (player.isUntouchable === false) {
                        isGameOver = true;
                        sounds.playSound('finish');
                    }
                } else {
                    if (player.isFalling) {
                        sounds.playSound('jumpOnVillain');
                        villains[collisionStatusIndex].isDead = true;
                        player.groundLevel = villains[collisionStatusIndex].yPos;
                        score.updateScore(villains[collisionStatusIndex].type);
                    }
                }
            }
        };

        /*game over*/
        var gameOver = function () {
            clearTimeout(setTimeInterval);
            alert('Game Over\nScore: ' + score.score);
            displayMenu();
        };

        /*setup game before play*/
        var gameSetup = function () {

            gameDiv.appendChild(background.element);

            gameDiv.appendChild(score.element);

            createPlatformsTemp();

            gameDiv.appendChild(player.element);
        };

        /*reset game after game over*/
        var resetGameSetup = function () {

            /*remove all child elements including player, platforms, background and villains*/
            if (gameDiv.hasChildNodes()) {
                while (gameDiv.hasChildNodes()) {
                    gameDiv.removeChild(gameDiv.firstChild);
                }
            }

            /*reset all objects*/
            background.init();
            player.init();
            score.init();
            platforms = [];
            villains = [];

            isGameOver = false;

            /*append all required elements in main div*/
            gameSetup();
        };

        /*display game*/
        var displayGame = function () {
            gameDiv.style.opacity = 1;
            resetGameSetup();
            setTimeInterval = setInterval(gameLoop, interval);
        };

        /*display menu*/
        var displayMenu = function () {
            
            gameDiv.style.opacity = 0.2;
            if (isGameOver) {
                
                if (score.score > localStorage.getItem('highScore')) {
                    localStorage.setItem('highScore', score.score);
                }
                gamePlay.appendScoreSheet(score.score);
            }
            
            sounds.playSound('background');
            gamePlay.showMenu();
        };

        /*setup game*/
        var gamePlaySetup = function () {
            sounds.playSound('background');
            sounds.sound.loop = true;

            gamePlatform.appendChild(gamePlay.element);

            gamePlay.playDivElement.onclick = function () {
                gamePlay.hideMenu();
                sounds.playSound('play');
                sounds.sound.loop = false;
                displayGame();
                sounds.sound.pause();
            };
        };

        /*game loop*/
        var gameLoop = function () {

            if (!isGameOver) {

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
                    sounds.playSound('finish');
                }

            } else {
                gameOver();
            }

        };

        /*initialize*/
        var init = function () {

            gamePlaySetup();

        };

        init();
    };


    window.DoodleJump = DoodleJump;

})();