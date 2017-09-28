var thePlayer : GameObject; //Drag the walking player object here in Inspector
var moveTime : float;     //Set this in Inspector to how long you want it to take to move player off of ship
var dockPoint : Transform; //This is where we're moving the ship to on the dock; Set in Inspector
var exitPoint : Transform; //This is where we're moving the player to from the ship; Set in Inspector
var camDist : float;   //This is the distance you want the cam to be at when we're piloting the ship; set in Inspector
var camHeight : float; //This is the height you want the cam to be at when we're piloting the ship; set in Inspector
var townName : String; //This is the name of the town the ship will be docking at; Write it in Inspector
var playerVisual : GameObject; //This is the art portion of the Player object; Set in Inspector
private var tranTime : float;
private var exitTime : float;
private var canExit = false;
private var canChangeCam = false;
private var daPlayer : GameObject;
private var havePressed = false;
private var haveExited = true;
private var isExiting = false;
private	var rightDist = false;
private var rightHeight = false;
private var docked = false;
function Update ()
{
	if (canExit)
	{
		ExitShip();
	}
	if (canChangeCam)
	{
		var camControl : SmoothFollow = GameObject.FindWithTag("MainCamera").GetComponent("SmoothFollow");
		if (camControl.distance > camDist && !rightDist)
		{
			camControl.distance -=Time.deltaTime;
			if (camControl.distance <= camDist)
			{
				camControl.distance = camDist;
				rightDist = true;
			}
		}
		if (camControl.height > camHeight && !rightHeight)
		{
			camControl.height -=Time.deltaTime*3;
			if (camControl.height <= camHeight)
			{
				camControl.height = camHeight;
				rightHeight = true;
			}
		}
		if (rightHeight && rightDist)
		{
			camControl.target = thePlayer.transform;
			canChangeCam = false;
		}
	}
}
function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Player")
	{
		daPlayer = other.gameObject;
		canExit = true;
		docked = false;
		havePressed = false;
		haveExited = false;
		rightDist = false;
        rightHeight = false;
		tranTime = 00;
		exitTime = 00;
	}
}
function OnTriggerExit(other : Collider)
{
	if (other.gameObject == daPlayer)
	{
		haveExited = true;
		if (!isExiting)
		{
			canExit = false;
			canChangeCam = false;
		}
	}
}

function ExitShip()
{
    var boatControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
    var playerControl : ThirdPersonController = thePlayer.GetComponent("ThirdPersonController");
    if (Input.GetButtonUp ("Fire1"))
    {
    	boatControl.enabled = false;
    	daPlayer.transform.rotation = transform.rotation;
    	havePressed = true;
    }
    if (havePressed && !docked) //This moves ship to the dock point
    {
    	isExiting = true;
		canChangeCam = true;
    	tranTime += Time.deltaTime;
		daPlayer.transform.position = Vector3.Lerp(daPlayer.transform.position, dockPoint.position, tranTime/moveTime);
		if (tranTime >= moveTime)
		{
			docked = true;
		}
    }
    if (havePressed && docked) //Run this when we've moved the ship to the dock point
    {
		playerVisual.SetActiveRecursively(true);
    	exitTime += Time.deltaTime;
		thePlayer.transform.position = Vector3.Lerp(thePlayer.transform.position, exitPoint.position, exitTime/moveTime);
		if (exitTime >= moveTime)
		{
			isExiting = false;
			thePlayer.transform.parent = null;
			thePlayer.SetActiveRecursively(true);
			playerControl.enabled = true;
			canExit = false;
		}
    }	
}
function OnGUI() //This tells the player the button to press to board ship
{
	if (canExit && !haveExited)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to dock at"+ townName+"!");
	}
}