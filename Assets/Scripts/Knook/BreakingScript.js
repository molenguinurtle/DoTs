var daBox : GameObject; //The box
var soundToPlay : AudioClip;
private var canBreak = false; //Strictly a check for the GUI message to appear and disappear
private var haveSmashed = false;
var keepScore = false;
function Update ()
{
	if (canBreak && !keepScore&& GameObject.FindWithTag("Character").GetComponent(ChrMngr).curGuy.tag == "Knook")
	{
		Smash();
	}
	if (canBreak && keepScore)
	{
		SmashAdd();
	}
}
function OnTriggerEnter (other : Collider)
{	
	if (other.gameObject.tag == "Break")
	{
		daBox = other.gameObject.transform.parent.gameObject;
		canBreak = true;
	}
}

function OnTriggerExit (other : Collider) //All this is doing is taking the OnGUI message off the screen once the player has walked away from the object without breaking it
{
	if (other.gameObject.tag == "Break")
	{
		if (other.gameObject.transform.parent.gameObject == daBox)
		{
			canBreak = false;
		}
	}
}

function SmashAdd() //This is the function for destroying the object
{
	var theCount : BlockBreakingScript = GameObject.FindWithTag("Counter").GetComponent("BlockBreakingScript");
	if (Input.GetButtonUp ("Fire1") && !haveSmashed) //Checks to see if we've pressed the button before so we can avoid multiple audio and
	{                                              //particle effect plays
		AudioSource.PlayClipAtPoint(soundToPlay, transform.position);
		haveSmashed = true;
	}
	if (haveSmashed)
	{
		theCount.deathCount += 1;
		Destroy (transform.parent.gameObject);
	}
}
function Smash() //This is the function for destroying the object
{
	if (Input.GetButtonUp ("Fire1") && !haveSmashed) //Checks to see if we've pressed the button before so we can avoid multiple audio and
	{                                              //particle effect plays
		AudioSource.PlayClipAtPoint(soundToPlay, transform.position);
		haveSmashed = true;
	}
	if (haveSmashed)
	{
		Destroy (daBox);
		haveSmashed = false;
		canBreak = false;
	}
}
function OnGUI() //This tells the player the button to press to break the object in question
{
	if (canBreak && GameObject.FindWithTag("Character").GetComponent(ChrMngr).curGuy.tag == "Knook")
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to Smash!");
	}
}