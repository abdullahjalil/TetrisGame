# Tetris Game Project

This project will entail me creating a tetris game using javascript, html and css

GitHub Link: https://abdullahjalil.github.io/TetrisGame/

## Project Plan

### Folder structure

```
+-- TetrisGame
|	+--js
|		--app.js
|	+--css
|		--style.css
|  	+--music
|.    	--Tetris.mp3
|	+--images
|		--background.gif
|     	--block.gif
|     	--wallpaper.gif
|	--index.html
```

### Objectives
* Research 2 dimensional arrays
* Implement the rules of tetris
* Keep an updated diary 
* Upload it to Git continuously throughtout the project
* Have the project completed in a Weeks time

### Implementation

* HTML5
* JavaScript
* CSS3
* JQUERY

### Design 

##### Shapes
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
	
##### GameBoard
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	
### Concept

Display each block with a number 1 in the array and make each shape serparetly
with every rotation posobility which can be called later on the code in a Rotate() function. 
	
#### Game Structure

Create a Scoring system which adds 100 everytime a line break
Randomize what Tetris shape drops from the top of a div using Math.random
Try implementing some music in to the game
* Include an instruction section explaining how to play the game.
* Implement and game over message
* Use CSS to style to provide good user experience
* Host the Game online using Github

### Constrols


### Task Diary

| Day                                                                         | Task| Completed? |  
|------------------------------------------------------------------------------|-----------|--------------------|
|7th January 2018                                                        | Create a folder structure and template in Atom, setup basic styling in css and added a variable with an array that contains the letter T( need to repeat this and replace every 0 with 1 in the shape of the tetris peice)          |        Yes          |  
|8th January 2018                                                   | Setup up basic divs and Research Arrays, added a drop function which drops the peice from top of the page, currently and added a freeze method which stops the falling shape when it touches the bottom of the div. To keep collision simple used arrays to detect when there is 1 in the array the other shape cannot move any further.          | Yes                    |   
|9th January 2018                            |  Basics of game functionality completed,iterate arrays for each Tetris shape and implement falling function with some additional asthetics. added the scoring system, attempted a leaderboard however i was unsuccessful. Added a rule so that when the player reaches a 1000 points it increase the drop speed adding an element of difficulty. (still having problems with rotation need to look at example online)       |       Yes             |   
| 10th Janaury 2018          | Completed rotation function, added some asthetics(gifs and images), attempted to create a animation for endGame but could not finish. added a display to show the next tetris peice to make it easier as the next tetris peice was always random instead of using tetris' original logic.         |  Yes                  |   

### Bugs

* Currently the first peice that drops does not appear until you press the keybinds, however after that first peice it runs as it should.
* The Tetris peices can be moved when they reach the bottom for a second due to the interval needed for each peice to drop.

##Further Development Ideas

1. Adding a leaderboard for scores
2. creating a function to display different coloured peices 
3. Adding a two player function
