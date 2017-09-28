var leChecker : GameObject; //Drag the 'ShellGameCheck' object here in Inspector
var leSetup : GameObject; //Drag the 'ShellGame' object here in Inspector
var theKey : GameObject; //This is the key/object that the player is trying to find; Set in Inspector and make sure it's inactive
var lesShells : GameObject; //This is the 'DaShells' GameObject with the shuffle script on it; drag here in Inspector
var trigSnd : AudioClip; //Sound we play when trig is initialized
private var isPlaying = false;
private var needReset = false;
private var weWon = false;


function Update () 
{
	if (needReset)
	{
		ResetPuzzle();
	}
	if (weWon)
	{
		theKey.SetActiveRecursively(true);
		Destroy(leSetup.GetComponent("ShellGame"));
		Destroy(leChecker.GetComponent("ShellGameCheck"));
		for (var shll in leSetup.GetComponent("ShellGame").shells)
		{
			shll.GetComponentInChildren(Shell).isPlaying = false;
		}
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		Destroy(this);
	}

}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Knook" && !isPlaying) 
	{
	    AudioSource.PlayClipAtPoint(trigSnd, transform.position);
		leSetup.GetComponent("ShellGame").daPlayer = other.gameObject;
		leSetup.GetComponent("ShellGame").isOn = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		GetComponent.<Renderer>().enabled = false;
		isPlaying = true;
	}
}

function ResetPuzzle()
{
		leSetup.GetComponent("ShellGame").isOn = false;
		leSetup.GetComponent("ShellGame").shownOne = false;
		leSetup.GetComponent("ShellGame").shownTwo = false;
		leSetup.GetComponent("ShellGame").shownThree = false;
		leChecker.GetComponent("ShellGameCheck").guessNum = 3;
		lesShells.transform.eulerAngles = Vector3(0,0,0);
		for (var shll in leSetup.GetComponent("ShellGame").shells)
		{
			shll.GetComponentInChildren(Shell).first = false;
			shll.GetComponentInChildren(Shell).second = false;
			shll.GetComponentInChildren(Shell).third = false;
			shll.GetComponentInChildren(Shell).isPlaying = false;
		}
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		GetComponent.<Renderer>().enabled = true;
		isPlaying = false;
		needReset = false;
}