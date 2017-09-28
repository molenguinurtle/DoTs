var theShip : GameObject; //Drag the ship GameObject to this slot in Inspector
var moveTime : float;     //Set this in Inspector to how long you want it to take to move player into ship
var shipPoint : Transform; //This is where we're moving the player to inside ship; Set up in Inspector
var camDist : float;   //This is the distance you want the cam to be at when we're piloting the ship; set in Inspector
var camHeight : float; //This is the height you want the cam to be at when we're piloting the ship; set in Inspector
private var tranTime : float;
private var canBoard = false;
private var canChangeCam = false;
private var daPlayer : GameObject;
private var havePressed = false;
private var haveBoarded = true;
private var isBoarding = false;
private	var rightDist = false;
private var rightHeight = false;
function Update ()
{
	if (canBoard)
	{
		Board();
	}
	if (canChangeCam)
	{
		var camControl : SmoothFollow = GameObject.FindWithTag("MainCamera").GetComponent("SmoothFollow");
		if (camControl.distance < camDist && !rightDist)
		{
			camControl.distance +=Time.deltaTime;
			if (camControl.distance >= camDist)
			{
				camControl.distance = camDist;
				rightDist = true;
			}
		}
		if (camControl.height < camHeight && !rightHeight)
		{
			camControl.height +=Time.deltaTime*3;
			if (camControl.height >= camHeight)
			{
				camControl.height = camHeight;
				rightHeight = true;
			}
		}
		if (rightHeight && rightDist)
		{
			//camControl.target = theShip.transform;
			canChangeCam = false;
		}
	}
}
function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Player")
	{
		daPlayer = other.gameObject;
		canBoard = true;
		havePressed = false;
		haveBoarded = false;
		tranTime = 00;
		rightDist = false;
        rightHeight = false;
	}
}
function OnTriggerExit(other : Collider)
{
	if (other.gameObject == daPlayer)
	{
		haveBoarded = true;
		if (!isBoarding)
		{
			canBoard = false;
			canChangeCam = false;
		}
	}
}

function Board()
{
    var playControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
    var boatControl : ThirdPersonController = theShip.GetComponent("ThirdPersonController");
    if (Input.GetButtonUp ("Fire1"))
    {
    	playControl.enabled = false;
    	daPlayer.transform.rotation = transform.rotation;
    	havePressed = true;
    }
    if (havePressed)
    {
    	isBoarding = true;
    	canChangeCam = true;
    	tranTime += Time.deltaTime;
		daPlayer.transform.position = Vector3.Lerp(daPlayer.transform.position, shipPoint.position, tranTime/moveTime);
		if (tranTime >= moveTime)
		{
			isBoarding = false;
			daPlayer.transform.parent = theShip.transform;
			daPlayer.active = false;
			boatControl.enabled = true;
			canBoard = false;
		}
    }
}
function OnGUI() //This tells the player the button to press to board ship
{
	if (canBoard && !haveBoarded)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to board ship!");
	}
}