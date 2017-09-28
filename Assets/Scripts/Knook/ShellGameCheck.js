var guesses : int = 0; //This is just a counter for the number of guesses the player has made
var corGuess : int = 0; //This is the number of times the player has guesses correctly; Once this reaches 3, tell the 'ShellGame'
						// script that we're done
var theBox : GameObject; //This is the current box the player should be trying to follow/punch
var theSetup : GameObject; //This is the object with 'ShellGame' attached to it; drag that here in Inspector
var theInit : GameObject; //This is the object with 'ShellInit' attached to it; drag that here in Inspector
var rightSnd : AudioClip; //Sound we play when guess is correct
var wrongSnd : AudioClip; //Sound we play when guess is incorrect
private var theChoice : GameObject; //Gets set by whatever box the player chooses
private var needCheck = false;
var guessNum: int = 3; //This is the amount/number of guesses/chances that the player gets to pick the correct box
							   // Goes down by 1 afer each round



function Update () 
{

	if (corGuess <= 3 && needCheck)
	{
		if (theBox == theChoice)
		{
			AudioSource.PlayClipAtPoint(rightSnd, transform.position);
			guesses = 0;
			corGuess += 1;
			if (corGuess == 1)
			{
				guessNum = 2;
				theSetup.GetComponent("ShellGame").isOn = true;
			}
			else if (corGuess == 2)
			{
				guessNum = 1;
				theSetup.GetComponent("ShellGame").isOn = true;
			}
			else if (corGuess == 3)
			{
				theInit.GetComponent("ShellInit").weWon = true;
			}
			needCheck = false;
		}
		else if (theBox != theChoice)
		{
			AudioSource.PlayClipAtPoint(wrongSnd, transform.position);
			guesses +=1;
			needCheck = false;
			if (guesses >= guessNum)
			{
				corGuess = 0;
				guesses = 0;
				theInit.GetComponent("ShellInit").needReset = true;
				needCheck = false;
			}
		}
	}
}