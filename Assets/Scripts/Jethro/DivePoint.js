var leFloor: GameObject; //This is the invisible floor of the respective level of water; Set in Inspector
private var canDive = false;
private var hasClicked = false;
private var t: float = 00;
private var daPlayer: GameObject;


function Update ()
{
	if (canDive)
	{
		Dive();
	}
}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Jethro" && GameObject.FindWithTag("Character").curGuy.tag == "Jethro")
	{
		hasClicked = false;
		canDive = true;
		daPlayer = other.gameObject;
	}
}

function OnTriggerExit(other: Collider)
{
	if (other.gameObject.tag == "Jethro")
	{
		canDive = false;
	}
}

function Dive()
{
	if (Input.GetButtonUp("Fire1") && !hasClicked)
	{
		GameObject.FindWithTag("Character").canSwitch = false;
		hasClicked = true;
	}
	if (hasClicked)
	{
		//Take control away, but it will be given back once the timer runs out
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		leFloor.active = false; //Make the floor the player is standing on inactive...
		t += Time.deltaTime;
		if (t>= 3.0)
		{
			leFloor.active = true; //...then active again after 3 seconds
			daPlayer.GetComponent("ThirdPersonController").enabled = true;
			GameObject.FindWithTag("Character").canSwitch = true;
			t = 00;
			canDive = false;
		}
	}
}

function OnGUI() //This tells the player the button to press to dive
{
	if (canDive && !hasClicked && GameObject.FindWithTag("Character").curGuy.tag == "Jethro")
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to dive deeper into the water!");
	}
}