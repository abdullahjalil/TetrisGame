$(document).ready(function(){
	var cell = document.getElementById("tetrisDiv");
	tetrisDiv(cell);
});
var tetrisGameBoard = {};

tetrisGameBoard.myScore = 0;

tetrisGameBoard.dropSpeed = 1000;

tetrisGameBoard.counter = null;

tetrisGameBoard.isGamePaused = false;

var tetrisDiv = function(divContent) {
	var divs = {
		container: null,
		tetrisGameBoard: {
			cell: null,
			arrayRow: 16,
			arraycolumn: 10,
			shapes: []
		},
		next: {
			cell: null,
			side: 4,
			shapes: []
		},
		pauseGame: {
			cell: null,
			text: ["Click to Start!", "Paused!", "You Lost!"]
		}
	};
// this decides where the Shape will fall from its currently always being dropped from the middle
	divs.tetrisGameBoard.xStart = Math.floor((divs.tetrisGameBoard.arraycolumn - divs.next.side) / 2);
	divs.tetrisGameBoard.yStart = -divs.next.side;

	var shape = {
		cell: null,
		showShape: true,
		setDisplay: function(showShape) {
			if (showShape) {
				this.cell.style.visibility = "visible";
			} else {
				this.cell.style.visibility = "hidden";
			}
			this.showShape = showShape;
		}
	};

	var tetrisArray = {};

	tetrisArray.currentTetrisPeice = {
		tetrisArray: null,
		number: 0,
		setDirection: 0,
		x: 0,
		y: 0
	};
// setting up the base array for all the shapes
// using 1s to fill in a Shape
	tetrisArray.next = {
		tetrisArray: [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		number: 0,
		setDirection: 0
	};
// this 2 dimensional array contians all the shapes and possible rotations
	tetrisArray.matrix = [
		[ // I
			[
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0]
			],
			[
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0]
			],
			[
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]
		],
		[ // J
			[
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 1, 1],
				[0, 0, 0, 0]
			],
			[
				[0, 1, 1, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 1],
				[0, 0, 0, 1],
				[0, 0, 0, 0]
			]
		],
		[ // L
			[
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 0, 1, 0],
				[1, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[1, 1, 1, 0],
				[1, 0, 0, 0],
				[0, 0, 0, 0]
			]
		],
		[ // O
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			]
		],
		[ // S
			[
				[0, 1, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 0, 1, 1],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 1, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 0, 1, 1],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			]
		],
		[ // T
			[
				[0, 0, 0, 0],
				[0, 1, 0, 0],
				[1, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 0],
				[0, 1, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 0, 0],
				[1, 1, 0, 0],
				[0, 1, 0, 0]
			]
		],
		[ // Z
			[
				[0, 0, 1, 0],
				[0, 1, 1, 0],
				[0, 1, 0, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 1, 1],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 1, 0],
				[0, 1, 1, 0],
				[0, 1, 0, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 1, 1],
				[0, 0, 0, 0]
			]
		]
	];
// selecting random tetris peice with a random length from the arrays
	tetrisArray.chooseNext = function() {
// find the length of the array
		var tetrisLength = this.matrix.length;
// randomize using math random function and * by the length
		var tetrisNumber = Math.floor(Math.random() * tetrisLength);

		tetrisNumber = (tetrisNumber === tetrisLength) ? (tetrisLength - 1) : tetrisNumber;
		var tetrisDirection = Math.floor(Math.random() * 2);
		tetrisDirection = (tetrisDirection === 2) ? 3 : tetrisDirection;
//
		this.currentTetrisPeice.tetrisArray = this.next.tetrisArray;
		this.currentTetrisPeice.number = this.next.number;
		this.currentTetrisPeice.setDirection = this.next.setDirection;
		this.currentTetrisPeice.x = divs.tetrisGameBoard.xStart;
		this.currentTetrisPeice.y = divs.tetrisGameBoard.yStart;

		this.next.tetrisArray = this.matrix[tetrisNumber][tetrisDirection];
		this.next.number = tetrisNumber;
		this.next.setDirection = tetrisDirection;

		for (var i = 0; i < divs.next.side; i++) {
			for (var j = 0; j < divs.next.side; j++) {
				divs.next.shapes[i][j].setDisplay(this.next.tetrisArray[i][j]);
			}
		}
	};
// this is responsible for moving the shape by removing it and replicating it
	tetrisArray.move = function(xPosition, yPosition) {
		if (this.duplicateTetrisShape(xPosition, yPosition)) {
			this.removeTetrisShape();
			this.currentTetrisPeice.x += xPosition;
			this.currentTetrisPeice.y += yPosition;
			this.pasteTetrisShape();
			return true;
		}
		return false;
	};

	//rotating the tetris shape is done in a similiar way but instead we use the arrays that have already been setup above
	//rotating possibilities have already been included in the tetris array
	tetrisArray.rotate = function() {
		this.removeTetrisShape();
		var previousPosition = this.currentTetrisPeice.setDirection;
		this.currentTetrisPeice.setDirection = (this.currentTetrisPeice.setDirection + 1) % 4;
		this.currentTetrisPeice.tetrisArray = this.matrix[this.currentTetrisPeice.number][this.currentTetrisPeice.setDirection];
		if (!this.duplicateTetrisShape(0, 0)) {
			this.currentTetrisPeice.setDirection = previousPosition;
			this.currentTetrisPeice.tetrisArray = this.matrix[this.currentTetrisPeice.number][this.currentTetrisPeice.setDirection];
		}
		this.pasteTetrisShape();
	};
// this is what moving and pasting will call to remove the values of 1 to 0
	tetrisArray.removeTetrisShape = function() {
		for (var i = 0; i < divs.next.side; i++) {
			var yShape = this.currentTetrisPeice.y + i;
			if (yShape >= 0) {
				for (var j = 0; j < divs.next.side; j++) {
					if (this.currentTetrisPeice.tetrisArray[i][j] !== 0) {
						divs.tetrisGameBoard.shapes[yShape][this.currentTetrisPeice.x + j].setDisplay(0);
					}
				}
			}
		}
	};
// this function takes the current tetris array and repositions the shape to the new position on both x and y
	tetrisArray.duplicateTetrisShape = function(xPosition, yPosition) {
		for (var i = 0; i < divs.next.side; i++) {
			var yShape = this.currentTetrisPeice.y + yPosition + i;
			var yTetrisShape = yPosition + i;
			for (var j = 0; j < divs.next.side; j++) {
				if (this.currentTetrisPeice.tetrisArray[i][j] !== 0) {
					var xShape = this.currentTetrisPeice.x + xPosition + j;
					var xTetrisShape = xPosition + j;
					if (xShape < 0 || xShape >= divs.tetrisGameBoard.arraycolumn) {
						return false;
					}
					if (yShape >= divs.tetrisGameBoard.arrayRow) {
						return false;
					}
					if (yShape >= 0) {
						if (divs.tetrisGameBoard.shapes[yShape][xShape].showShape) {
							if ((xTetrisShape >= 0) && (xTetrisShape < divs.next.side) && (yTetrisShape < divs.next.side)) {
								if (this.currentTetrisPeice.tetrisArray[yTetrisShape][xTetrisShape] === 0) {
									return false;
								} else {
									if (xPosition === 0 && yPosition === 0) {
										return false;
									}
								}
							} else {
								return false;
							}
						}
					}
				}
			}
		}
		return true;
	};
// pasting the shape in to place
	tetrisArray.pasteTetrisShape = function() {
		for (var i = 0; i < divs.next.side; i++) {
			var yShape = this.currentTetrisPeice.y + i;
			if (yShape >= 0) {
				for (var j = 0; j < divs.next.side; j++) {
					if (this.currentTetrisPeice.tetrisArray[i][j] !== 0) {
						var xShape = this.currentTetrisPeice.x + j;
						divs.tetrisGameBoard.shapes[yShape][xShape].setDisplay(this.currentTetrisPeice.tetrisArray[i][j]);
					}
				}
			}
		}
	};


// creating the divs to contain the game
	tetrisGameBoard.setGame = function() {
		divContent.className += " tetris";

		divs.container = document.createElement("div");
		divs.container.className = "gameBoardContainer";
		divs.container.setAttribute("tabindex", "0");
		divContent.appendChild(divs.container);

		divs.tetrisGameBoard.cell = document.createElement("div");
		divs.tetrisGameBoard.cell.className = "tetrisGameBoard";
		divs.container.appendChild(divs.tetrisGameBoard.cell);

		var userIntstructionDiv = document.createElement("div");
		userIntstructionDiv.className = "tetrisGameBoard userInstruction";
		userIntstructionDiv.innerHTML = "myScore:<br/><br/>";
		divs.container.appendChild(userIntstructionDiv);

		var scoreDiv = document.createElement("div");
		scoreDiv.className = "scoreLine";
		scoreDiv.innerHTML = tetrisGameBoard.myScore;
		userIntstructionDiv.appendChild(scoreDiv);

		userIntstructionDiv.innerHTML += "<br/><br/><br/>NEXT PEICE:<br/><br/>";

		divs.next.cell = document.createElement("div");
		divs.next.cell.className = "nextPeiceScreen";
		userIntstructionDiv.appendChild(divs.next.cell);

		divs.pauseGame.cell = document.createElement("div")	;
		divs.pauseGame.cell.className = "pauseWindow";
		divs.pauseGame.cell.innerHTML = divs.pauseGame.text[0];
		divContent.appendChild(divs.pauseGame.cell);

		for (var i = 0; i < divs.tetrisGameBoard.arrayRow; i++) {
			divs.tetrisGameBoard.shapes[i] = [];
			for (var j = 0; j < divs.tetrisGameBoard.arraycolumn; j++) {
				var shapeDiv = document.createElement("div");
				shapeDiv.className = "shape";
				divs.tetrisGameBoard.cell.appendChild(shapeDiv);
				divs.tetrisGameBoard.shapes[i][j] = Object.create(shape);
				divs.tetrisGameBoard.shapes[i][j].cell = shapeDiv;
			}
		}

		for (i = 0; i < divs.next.side; i++) {
			divs.next.shapes[i] = [];
			for (j = 0; j < divs.next.side; j++) {
				shapeDiv = document.createElement("div");
				shapeDiv.className = "shape";
				divs.next.cell.appendChild(shapeDiv);
				divs.next.shapes[i][j] = Object.create(shape);
				divs.next.shapes[i][j].cell = shapeDiv;
			}
		}


// this is a event addEventListener to check the user clikcing on gameBoard to initiliaze the startGame function
// set to false by default
		divs.container.addEventListener("click", tetrisGameBoard.startGame, false);
	};
// function ot start the game once the player click outside div, and thne hides the  pauseGame div
	tetrisGameBoard.startGame = function() {
		// plays music as soon as this function runs
		$("#backgroundMusic").get(0).play();
		divs.container.removeEventListener("click", tetrisGameBoard.startGame, false);
		divs.container.addEventListener("keydown", tetrisGameBoard.keyPress, false);
		divs.pauseGame.cell.innerHTML = divs.pauseGame.text[1];
		divs.pauseGame.cell.style.visibility = "hidden";
		tetrisGameBoard.setScore(0);

		for (var i = 0; i < divs.tetrisGameBoard.arrayRow; i++) {
			for (var j = 0; j < divs.tetrisGameBoard.arraycolumn; j++) {
				divs.tetrisGameBoard.shapes[i][j].setDisplay(0);
			}
		}

		tetrisArray.chooseNext();

// drop speed set to every 1 second
		tetrisGameBoard.dropSpeed = 1000;
		tetrisGameBoard.counter = setInterval(tetrisGameBoard.move, tetrisGameBoard.dropSpeed);
	};

	tetrisGameBoard.move = function() {
		if (!tetrisArray.move(0, 1)) {
			tetrisGameBoard.checkScore();
			tetrisGameBoard.checkGameOver();
		}
	};
// this will set the completed Lines to 0
// this looks for a single line and if the line is linesFilled then it will -1 from the entire row
	tetrisGameBoard.checkScore = function() {
		var completeLines = 0;
		var comepleteLineFound = tetrisArray.currentTetrisPeice.y + divs.next.side - 1;
		if (comepleteLineFound >= divs.tetrisGameBoard.arrayRow) comepleteLineFound = divs.tetrisGameBoard.arrayRow - 1;
// looping this to make sure it doesn't just run it once
		for (var i = 0; i <= divs.next.side; i++) {
			var linesFilled = true;
			for (var j = 0; j < divs.tetrisGameBoard.arraycolumn; j++) {
				if (!divs.tetrisGameBoard.shapes[comepleteLineFound][j].showShape) {
					linesFilled = false;
					break;
				}
			}
			if (linesFilled) {
				completeLines++;
				this.scoreLine(comepleteLineFound);
			} else {
				comepleteLineFound--;
				if (comepleteLineFound < 0) {
					break;
				}
			}
		}

		if (completeLines > 1) {
			this.addScore(100 * completeLines);
		}
	};

	tetrisGameBoard.scoreLine = function(line) {
		for (var i = line; i > 0; i--) {
			for (var j = 0; j < divs.tetrisGameBoard.arraycolumn; j++) {
				divs.tetrisGameBoard.shapes[i][j].setDisplay(divs.tetrisGameBoard.shapes[i - 1][j].showShape);
			}
		}
		this.addScore(100);
	};

	tetrisGameBoard.setScore = function(newScore) {
		this.myScore = newScore;
		divs.container.getElementsByClassName("scoreLine")[0].innerHTML = newScore;
	};

	tetrisGameBoard.addScore = function(scoreToAdd) {
		var oldScore = this.myScore;
		var newScore = oldScore + scoreToAdd;
		this.setScore(newScore);
		// this checks if the score is 500 then the drop speed increases
		if (tetrisGameBoard.dropSpeed > 100 && (Math.floor(newScore / 500) > Math.floor(oldScore / 500))) {
			tetrisGameBoard.dropSpeed -= 10;
			clearInterval(this.counter);
			tetrisGameBoard.counter = setInterval(tetrisGameBoard.move, tetrisGameBoard.dropSpeed);
		}
	};

	tetrisGameBoard.checkGameOver = function() {
		for (var j = 0; j < divs.tetrisGameBoard.arraycolumn; j++) {
			if (divs.tetrisGameBoard.shapes[0][j].showShape) {
				this.gameOver();
				return;
			}
		}
		tetrisArray.chooseNext();
	};
// should display pauseGame when game is over and display the second text index in the array
	tetrisGameBoard.gameOver = function() {
		clearInterval(this.counter);
		divs.pauseGame.cell.innerHTML = divs.pauseGame.text[2];
// sets the div to visible
		divs.pauseGame.cell.style.visibility = "visible";
// get rid of the event listerners for keyPress so that the player can no longer move peices
		divs.container.removeEventListener("keydown", tetrisGameBoard.keyPress, false);
		tetrisGameBoard.animateGameOver();
	};
// -- attempting to set up animation for when game is over it fills every block one by one---
// !!!!!DID NOT WORK!!!!
// end Game with click event to restart the game
	tetrisGameBoard.animateGameOver = function() {
		var i = divs.tetrisGameBoard.arrayRow ;
		var j = 0;
		divs.container.addEventListener("click", tetrisGameBoard.startGame, false);
		(function() {
			if (i >= 0) {
				divs.tetrisGameBoard.shapes[i][j].setDisplay(1);
				if ((j + 5) < divs.tetrisGameBoard.arraycolumn) {
					j++;
				} else {
					j = 0;
					i--;
				}
				setTimeout(arguments.callee, 20);
			}
		})();
	};

	tetrisGameBoard.pauseGame = function() {
		if (tetrisGameBoard.isGamePaused) {
			divs.pauseGame.cell.style.visibility = "hidden";
			tetrisGameBoard.counter = setInterval(tetrisGameBoard.move, tetrisGameBoard.dropSpeed);
		} else {
			divs.pauseGame.cell.style.visibility = "visible";
			clearInterval(this.counter);
		}
		tetrisGameBoard.isGamePaused = !tetrisGameBoard.isGamePaused;
	};
// keyPress functions
// done using switch statements with cases matching keyCode
	tetrisGameBoard.keyPress = function(e) {
		e.preventDefault();

		if (!tetrisGameBoard.isGamePaused) {
			switch (e.keyCode) {
				case 37: // Move Left
					tetrisArray.move(-1, 0);
					break;
				case 38: // Move Up
					tetrisArray.rotate();
					break;
				case 39: // Move Right
					tetrisArray.move(1, 0);
					break;
				case 40: // Move Down
					tetrisArray.move(0, 1);
					break;
				case 80: // P
					tetrisGameBoard.pauseGame();
					break;
			}
		} else {
			if (e.keyCode === 80) {
				tetrisGameBoard.pauseGame();
			}
		}
	};

	tetrisGameBoard.setGame();
};
