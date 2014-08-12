var grid = [{player: "", number: 0}, {player: "", number: 1}, {player: "", number: 2}, {player: "", number: 3}, {player: "", number: 4}, {player: "", number: 5}, {player: "", number: 6}, {player: "", number: 7}, {player: "", number: 8}];
var turn = 0;
var winningLines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4 ,8],[2, 4, 6]];

var lastComputerChoice = null;
var SecondToLastComputerChoice = null;

var lastHumanChoice = null;
var SecondToLastHumanChoice = null;

var makeChoice = function() {
	if (turn > 10) {
		return "the end";
	}

	if (turn % 2 === 0 || turn === 0) {
		//Human's turn
		var answer = prompt("pick an answer (number only)");
		grid[answer].player = "human";
		lastHumanChoice = answer;
	}else{
		//Computer's turn
		var chooseACorner = function(){
			for (var i = 0; i < grid.length; i++) {
				console.log("choosing a corner")
				if (grid[i].number % 2 == 0 && grid[i].player === ""){
					console.log(grid[i].number);
					return grid[i].number;
				}
			}
		}
		var recordComputerAnswer = function(answer) {
			grid[answer].player = "computer";
			SecondToLastComputerChoice = lastComputerChoice;
			lastComputerChoice = answer;
		}

		var blockHuman = function(){
			var winningLinesCurrent = [[null, null, null],[null, null, null],[null, null, null],[null, null, null],[null, null, null],[null, null, null],[null, null, null],[null, null, null]];
			var nonWinningLinesCurrent = [[null, null, null],[null, null, null],[null, null, null],[null, null, null],[null, null, null],[null, null, null],[null, null, null],[null, null, null]];
			var winningCounts = [0,0,0,0,0,0,0,0];
			var lineCheckIncr = 0;
			for (var i = 0; i < winningLines.length; i++) {
				var spotCheckIncr = 0;
				for (var j = 0; j < winningLines[i].length; j++) {
					for (var k = 0; k < grid.length; k++) {
						if (grid[k].player === "human" && grid[k].number == winningLines[i][j]){
							winningLinesCurrent[i][j] = grid[k].number;
							console.log("A match");
							winningCounts[i]++;
						}
						if(grid[k].player === "" && grid[k].number == winningLines[i][j]){
							nonWinningLinesCurrent[i][j] = grid[k].number;
							console.log("non taken spot: "+ grid[k].number);
						}
					}
					console.log(winningLinesCurrent[i]);
					console.log(nonWinningLinesCurrent[i]);
					console.log(winningCounts);
					spotCheckIncr++;
					if (winningCounts[i] == 2 && spotCheckIncr == 3)  {
						console.log("blocked");
						var spaceToBlock;
						for (var l = 0; l < nonWinningLinesCurrent[i].length; l++) {
							if (nonWinningLinesCurrent[i][l] !== null){
								spaceToBlock = nonWinningLinesCurrent[i][l];
								console.log(spaceToBlock);
							}
						}

						return spaceToBlock;
					}
				}
				lineCheckIncr++;
				console.log(lineCheckIncr);
				if(lineCheckIncr == 8){
					return chooseACorner();
				}
			}
		}
		//Turn 2
		if (turn == 1) {
			if (lastHumanChoice == 4){
				answer = chooseACorner();
			}
			if (lastHumanChoice == 0 || lastHumanChoice % 2 == 0 && grid[4].player === "") {
				var answer = 4;
			}
			if (!(lastHumanChoice % 2 == 0) && grid[4].player === "") {
				var answer = chooseACorner();
			}
			recordComputerAnswer(answer);
		}
		//Turn 4
		if (turn == 3 ){
			if (lastComputerChoice === 0 || lastComputerChoice % 2 === 0){
				console.log("turn: "+ turn);
				if (lastHumanChoice == 0 || lastHumanChoice % 2 == 0) {
					var answer = blockHuman();
				}
				recordComputerAnswer(answer);
			}
		}
		if (turn > 3) {
			var answer = blockHuman();
			recordComputerAnswer(answer);
		}

	}

	turn++;
	console.log(grid);
	makeChoice();
}
