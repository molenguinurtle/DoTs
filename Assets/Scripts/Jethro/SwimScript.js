var enterWater = false; //Set this to true in editor for the triggers on the edges of water
var exitWater = false;  //Set this to true in editor for the triggers inside and next to the edges of  the water
private var daPlayer : GameObject;
var entryPoint : Transform; //Set this in Inspector for the place the player will be once entering water
var exitPoint : Transform; //Set this in Inspector for the place the player will be once exiting water
private var canSwim = false;
private var canWalk = false;
private var buttonPressed = false;
function Update () 
{
	if (canSwim && GameObject.FindWithTag("Character").GetComponent(ChrMngr).curGuy.tag == "Jethro")
	{
		DiveIn();
	}
	if (canWalk && GameObject.FindWithTag("Character").GetComponent(ChrMngr).curGuy.tag == "Jethro")
	{
		GetOut();
	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Jethro" && enterWater && !other.gameObject.GetComponent("WhirlCheck").isPooling)
	{
		daPlayer = other.gameObject;
		buttonPressedA = false;
		canSwim = true;
	}
	if (other.gameObject.tag == "Jethro" && exitWater && !other.gameObject.GetComponent("WhirlCheck").isPooling)
	{
		daPlayer = other.gameObject;
		buttonPressedB = false;
		canWalk = true;
	}
}
function OnTriggerExit (other : Collider) //This removes the GUI text if the player leaves the Collider
{
	if (enterWater)
	{
		canSwim = false;
	}
	if (exitWater)
	{
		canWalk = false;
	}
}

function DiveIn() //This function moves the player into the water
{
	var playControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
	if (Input.GetButton ("Fire1")) 
	{	
		playControl.enabled = false;
		buttonPressedA = true;
	}
	if (buttonPressedA)
	{
		daPlayer.transform.position = Vector3.Lerp(daPlayer.transform.position, entryPoint.position, Time.time);//This is where we move the player into the water
		//daPlayer.transform.rotation = Quaternion.Lerp (daPlayer.transform.rotation, transform.rotation, Time.time); //Make sure they're facing the correct direction
		if (daPlayer.transform.position == entryPoint.position)
		{
			playControl.enabled = true;
			canWalk = false;
		}
	}
}		
function GetOut() //This function moves the player out of the water
{
	var playControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
	if (Input.GetButton ("Fire1")) 
	{	
		playControl.enabled = false;
		buttonPressedB = true;
	}
	if (buttonPressedB)
	{
		daPlayer.transform.position = Vector3.Lerp(daPlayer.transform.position, exitPoint.position, Time.time);//This is where we move the player out of the water
		//daPlayer.transform.rotation = Quaternion.Lerp (daPlayer.transform.rotation, transform.rotation, Time.time);
		if (daPlayer.transform.position == exitPoint.position)
		{
			playControl.enabled = true;
			canWalk = false;
		}
	}
}

function OnGUI() //This tells the player the button to press to enter or exit water
{
	if (canSwim && GameObject.FindWithTag("Character").GetComponent(ChrMngr).curGuy.tag == "Jethro")
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to enter the water!");
	}
	if (canWalk && GameObject.FindWithTag("Character").GetComponent(ChrMngr).curGuy.tag == "Jethro")
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to exit the water!");
	}
}