var topFloor = false;
var upPoint : Transform;
var downPoint : Transform;
var moveTime : float;
var theElevator : GameObject; //This is the actual elevator game object; drag to this point in Inspector
private var tranTime : float = 00;
private var daPlayer : GameObject;
private var canElev = false;
private var isElev = false;
private var havePressed = false;
function Update ()
{
	if (canElev)
	{
		if (Input.GetButton ("Fire1"))
		{
    		havePressed = true;
    		daPlayer.transform.parent = theElevator.transform;
		}
		Elevate();	
    }
}
function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Player")
	{
		daPlayer = other.gameObject;
		canElev = true;
		isElev = false;
		havePressed = false;
		tranTime = 00;
	}
}

function OnTriggerExit(other : Collider)
{
	if (other.gameObject == daPlayer)
	{
		canElev = false;
	}
}
function Elevate()
{
    var playControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
    if (havePressed && !topFloor)
    {
    	playControl.enabled = false;
    	isElev = true;
    	tranTime += Time.deltaTime;
		theElevator.transform.position = Vector3.Lerp(theElevator.transform.position, upPoint.position, tranTime/moveTime);
		if (tranTime >= moveTime)
		{
			isElev = false;
			daPlayer.transform.parent = null;
			playControl.enabled = true;
			havePressed = false;
			canElev = false;
		}
    }
    if (havePressed && topFloor)
    {
    	playControl.enabled = false;
    	isElev = true;
    	tranTime += Time.deltaTime;
		theElevator.transform.position = Vector3.Lerp(theElevator.transform.position, downPoint.position, tranTime/moveTime);
		if (tranTime >= moveTime)
		{
			isElev = false;
			daPlayer.transform.parent = null;
			playControl.enabled = true;
			havePressed = false;
			canElev = false;
		}
    }

}
function OnGUI() //This tells the player the button to press to ride the elevator
{
	if (canElev && !isElev && !topFloor)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to ride the elevator up to the dock!");
	}
	if (canElev && !isElev && topFloor)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to ride the elevator down to the town!");
	}
}
