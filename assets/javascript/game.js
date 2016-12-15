// Pseudocode

// 1. Generate target score randomly between 19 and 120 (Math.random)
// 2. Generate crystal values randomly between 1 and 12 (Math.random)
// 3. Every crystal must have different score (push each value into array, check if generated random is in array, if not, push, else generate new)
// 4. On click of crystal, score = score + crystal value. Keep checking after each addition if score > targetscore.
// 5. If score > target score, you lose message, losses ++, generate another random target score and crystal values. (call reset())
// 6. If score == target score, you win message, wins++, generate another random target score and crystal values. (call reset())

var game = {
	targetScoreValue : 0,
	crystalValues : [],
	alphaValue : 0,
	betaValue : 0,
	gammaValue : 0,
	omegaValue : 0,
	score : 0,

	generateTargetScore : function generateTargetScore() {

		targetScoreValue = Math.floor((Math.random()*101)+19);
		$("#targetScore").html(targetScoreValue);
		console.log(targetScoreValue);
	},

	generateCrystalValues :function generateCrystalValues() {
		for(i=0; i<4; i++){                   // create 4 random numbers
            var randomNumber = Math.floor((Math.random()*12)+1); // random number created
            if(this.crystalValues.length == 0){              // if array is not empty, check for same values
              this.crystalValues.push(randomNumber);
            }
            else {
              if(this.crystalValues.indexOf(randomNumber) == -1){  // if random number is not a part of the array
                this.crystalValues.push(randomNumber);     // push it to array
              }
              else {
                var randomNumber = Math.floor((Math.random()*12)+1); // if not empty, get new random number
              }
            }
          }

		// this.alphaValue = this.crystalValues[0];
		// this.betaValue = this.crystalValues[1];
		// this.gammaValue = this.crystalValues[2];
		// this.omegaValue = this.crystalValues[3];

		$("#alpha").attr("value", this.crystalValues[0]);
		$("#beta").attr("value", this.crystalValues[1]);
		$("#gamma").attr("value", this.crystalValues[2]);
		$("#omega").attr("value", this.crystalValues[3]);

		// console.log(this.alphaValue);
		// console.log(this.betaValue);			//// BUG -> crystal values sometimes become undefined.
		// console.log(this.gammaValue);
		// console.log(this.omegaValue);
	},

	checkScore : function checkScore() {
		this.score = this.score + $(".gem").val();
		if(this.score == this.targetScoreValue){
			this.wins++;
			$("#wins").html(this.wins);
			// this.reset();
		}
		if(this.score > this.targetScoreValue){
			this.losses++;
			$("#losses").html(this.losses);
			// this.reset();
		}
		console.log(this.score);
		
	},

	reset : function reset() {
		crystalValues = [];
		$(".gem").attr("value","");
		targetScoreValue = 0;
		$("#targetScore").html("");
	}


}

$( document ).ready(function() {

	game.generateTargetScore();
	game.generateCrystalValues();
    // console.log(targetScoreValue);
    $(".gem").on("click", function(){
    	game.checkScore();
    });

});
