var shells : GameObject[]; //This is the array of all 5 boxes in the shell game
var lesShells: GameObject; //This is the parent gameobject of all the shells; used for showing the shuffle; Set in Inspector
var leChecker : GameObject; //This is the gameobject that presides over the shell game; Set it in Inspector
private var isOn = false;
private var shownOne = false;
private var shownTwo = false;
private var shownThree = false;
private var daPlayer : GameObject; //The player; Will be set by the initializing switch


function Update () 
{
	if (isOn && !shownOne)
	{

		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		leChecker.GetComponent("ShellGameCheck").theBox = shells[Random.Range(0, shells.Length-1)];
		leChecker.GetComponent("ShellGameCheck").theBox.GetComponentInChildren(Shell).oYeah = true;
		lesShells.GetComponent("ShuffleScript").needShuffA = true;
		daPlayer.transform.Find("Camera").GetComponent.<Camera>().enabled = false;
		for (var shll in shells)
		{
			shll.GetComponentInChildren(Shell).first = true;
			shll.GetComponentInChildren(Shell).isPlaying = true;
		}
		isOn = false;
		shownOne = true;
	}
	if (isOn && shownOne && !shownTwo)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		leChecker.GetComponent("ShellGameCheck").theBox = shells[Random.Range(0, shells.Length-1)];
		leChecker.GetComponent("ShellGameCheck").theBox.GetComponentInChildren(Shell).oYeah = true;
		lesShells.GetComponent("ShuffleScript").needShuffB = true;
		daPlayer.transform.Find("Camera").GetComponent.<Camera>().enabled = false;
		for (var shll in shells)
		{
			shll.GetComponentInChildren(Shell).first = false;
			shll.GetComponentInChildren(Shell).second = true;
		}
		isOn = false;
		shownTwo = true;
	}
	if (isOn && shownOne && shownTwo && !shownThree)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		leChecker.GetComponent("ShellGameCheck").theBox = shells[Random.Range(0, shells.Length)];
		leChecker.GetComponent("ShellGameCheck").theBox.GetComponentInChildren(Shell).oYeah = true;
		lesShells.GetComponent("ShuffleScript").needShuffC = true;
		daPlayer.transform.Find("Camera").GetComponent.<Camera>().enabled = false;
		for (var shll in shells)
		{
			shll.GetComponentInChildren(Shell).second = false;
			shll.GetComponentInChildren(Shell).third = true;
		}
		isOn = false;
		shownThree = true;
	}
}

