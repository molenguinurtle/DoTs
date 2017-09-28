var leftDrop = false;
var bldr : GameObject; //Drag the prefab for the boulder to this slot in Inspector
var dropPointA : Transform; //This is where we will spawn the boulder when !leftDrop
var dropPointB : Transform; //This is where we will spawn the boulder when leftDrop = true
private var daPlayer : GameObject;
private var canPull = false;

function Update () 
{
	if (canPull)
	{
		pullLever();
	}
}

function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == "Knook") 
    {
    	daPlayer = other.gameObject; 
		canPull = true;
    }
}
function OnTriggerExit(other : Collider)
{
	if (other.gameObject.tag == "Knook") 
    {
		canPull = false;
    }
}

function pullLever()
{
	if (Input.GetButtonUp("Fire1") && !leftDrop)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		Instantiate (bldr, dropPointA.position, transform.rotation);
		leftDrop = true;
		canPull = false;
	}
	if (Input.GetButtonUp("Fire1") && leftDrop)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		Instantiate (bldr, dropPointB.position, transform.rotation);
		leftDrop = false;
		canPull = false;
	}

}

function OnGUI() //This tells the player the button to press to pull le lever in question
{
	if (canPull)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to pull lever!");
	}
}