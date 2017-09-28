var panPoints : Transform[]; //Where the camera will be panning to
var wait: float; //This is how long we wait at each panPoint before moving on
var move: float; //This is how long it takes to pan to each point
var needAgain = false; //Set to true in Inspector if we might need to do this again (JumpOrder)
var needSwitch = false; //Set true in Inspector if we wanna allow the player to switch characters after the camera pan
var letSkip = true; //Set to false in Inspector if we don't wanna allow the pan to be skipped
private var leMngr: Component; //The 'CamMngr' script; gets set in the Start function
function Start ()
{
	leMngr = GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr");
}

function OnTriggerEnter (other : Collider)
{	
	if (other.gameObject.tag == "Knook" || other.gameObject.tag == "Arnez" || other.gameObject.tag == "Jethro")
	{
		leMngr.targets = panPoints;
		leMngr.waitTime = wait;
		leMngr.moveTime = move;
		if (!needSwitch)
		{
			leMngr.letSwitch = false;
		}
		else if (needSwitch)
		{
			leMngr.letSwitch = true;
		}
		if (!letSkip)
		{
			leMngr.letSkip = false;
		}
		leMngr.weSet = false;
    	leMngr.updatePan = true;
    	if (needAgain)
    	{
    		transform.GetComponent.<Collider>().isTrigger = false;
    	}
    	else if (!needAgain)
    	{
    		Destroy(this);
    	}
	}
}