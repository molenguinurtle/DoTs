var placeToSpawn : Transform;
var isLadder = false;
var isWhirlpool = false;
var needLift = false; //Only set this to true on doors that we have to show the bars lifting on
var needUp = false;
var openSnd: AudioClip; //Set in Inspector to door opening sound
private var soundPlay = false;
private var daPlayer : GameObject;
private var upPoint : Vector3;
private var canMove = false;

function Start()
{
	upPoint = Vector3(transform.position.x, transform.position.y+2, transform.position.z);
	needUp = true;
}
function Update ()
{
	if (canMove && GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy == daPlayer && !isWhirlpool)
	{
		LeaveRoom();
	}
	
	if (canMove && GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy == daPlayer && isWhirlpool)
	{
		WhirlRoom();
	}
	
	if (needUp && needLift)
	{
		LiftBars(transform.Find("Bars").gameObject);
	}
}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy.tag)
	{
		daPlayer = other.gameObject;
		canMove = true;
	}
}
function OnTriggerExit(other : Collider)
{
	if (other.gameObject == daPlayer)
	{
		canMove = false;
	}
}
function LeaveRoom()
{
	var havePressed = false;
	if (Input.GetButtonUp ("Fire1") && !havePressed) 
	{	
		havePressed= true;
	}
	if (havePressed) //If we left click, we move to the placeToSpawn
	{	
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = true;
		daPlayer.transform.position = placeToSpawn.position;
		daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = false;
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		canMove = false;
	}

}

function WhirlRoom()
{
	GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
	daPlayer.GetComponent("ThirdPersonController").enabled = false;
	daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = true;
	daPlayer.transform.position = placeToSpawn.position;
	daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = false;
	daPlayer.GetComponent("ThirdPersonController").enabled = true;
	GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
	canMove = false;

}

function LiftBars(bars: GameObject)
{
		if (!soundPlay)
		{
			AudioSource.PlayClipAtPoint(openSnd, transform.position);
			soundPlay = true;
		}
		var dist : float = Vector3.Distance(bars.transform.position, upPoint);
		if (dist > 0)
		{
		    bars.transform.position = Vector3.Lerp(bars.transform.position, upPoint, Time.deltaTime*.75/dist);
		}
		else if (dist <= 0)
		{
			needUp = false;
		}
}

function OnGUI() //This tells the player the button to climb ladder or open door
{
	if (canMove && !isLadder && daPlayer == GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to go through door!");
	}
	if (canMove && isLadder && daPlayer == GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to use the ladder!");
	}

}