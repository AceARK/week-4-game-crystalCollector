// Pseudocode

// game object with functions -> generate random target value, generate random crystal values, reset, check score to target value
// 1. Generate random target value
// 2. Generate random crystal values
// 3. Reset all values
// 4. check score to target value

// Game object 
var game = {
	targetValue : 0,
	crystalValues : [],
	score : 0,
	wins : 0,
	losses : 0,
	numberOfCrystals : 4,

	generateRandomTargetValue : function generateRandomTargetValue() {
		this.targetValue = Math.floor(Math.random()*101 + 19);
		$("#targetScore").html(this.targetValue);
		console.log("target value - " + this.targetValue);
	},

	generateRandomCrystalValues : function generateRandomCrystalValues() {
		for(var i=0; i<numberOfCrystals; i++){
			var randomNumber = Math.floor(Math.random()*12 + 1);
			while(this.crystalValues.indexOf(randomNumber) != -1){
				var randomNumber = Math.floor(Math.random()*12 + 1);
			}
			this.crystalValues.push(randomNumber);
		}
		console.log(this.crystalValues);	
		// Call function to attach values from crystalValues to each crystal
		this.attachValuesToCrystal();	
	},

	attachValuesToCrystal : function attachValuesToCrystal() {
		// Attaching each crystal with a value from crystalValues
		$('.gem').each(function(){
		  $(this).attr("data-crystalvalue", game.crystalValues.pop());
		});
	}

	generateRandomCrystalValuesAlternateVersion : function generateRandomCrystalValuesAlternateVersion() {
			var randomNumber = Math.floor(Math.random()*12 + 1);
			if(this.crystalValues.indexOf(randomNumber) != -1) {
				this.generateRandomCrystalValuesAlternateVersion();
			} else {
				this.crystalValues.push(randomNumber);
			}		
	},

	checkScore : function checkScore(crystalValue) {
		this.score = crystalValue + this.score;
		console.log("Score - " + this.score);
		// If score = targetValue
		if(this.score == this.targetValue) {
			this.wins++;
			console.log("Wins " + this.wins);
			$("#wins").html(this.wins);
			this.reset();
		}
		if(this.score > this.targetValue) {
			this.losses++;
			console.log("Losses " + this.losses);
			$("#losses").html(this.losses);
			this.reset();
		}
	},

	reset : function reset() {
		this.targetValue = 0;
		this.crystalValues = [];
		this.score = 0;
		this.generateRandomTargetValue();
		this.generateRandomCrystalValues();
	}	
}

$(document).ready(function(){
	game.generateRandomTargetValue();
	//game.generateRandomCrystalValues();
	for (var i = 0; i < 4; i++) {
		game.generateRandomCrystalValuesAlternateVersion();
	}
	$('.gem').each(function(){
		  $(this).attr("data-crystalvalue", game.crystalValues.pop());
		});
	$('.gem').on("click", function(){
		var value = $(this).data("crystalvalue");
		game.checkScore(value);
	});
});



