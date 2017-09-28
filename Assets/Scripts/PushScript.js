private var daPlayer : GameObject;
private var canPush = false;
private var isPushing = false;
private var havePressed = false;
function Update ()
{
	if (canPush)
	{
		Pushing();
	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez" || other.gameObject.tag == "Jethro" || other.gameObject.tag == "Knook")
	{
		daPlayer = other.gameObject;
		canPush = true;
		isPushing = false;
	}
}
function OnTriggerExit (other : Collider)
{
	if (other.gameObject == daPlayer)
	{
		canPush = false;
		isPushing = true;
		havePressed = false;
	}
}
function Pushing() // The function for pushing the block
{
	var playControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
	if (Input.GetButton ("Fire1"))
	{
		playControl.enabled = false;
		isPushing = true;
		havePressed = true;
		daPlayer.transform.rotation = Quaternion.Lerp (daPlayer.transform.rotation, transform.rotation, Time.time); //Rotates the player to face the block
		transform.parent.gameObject.transform.parent = daPlayer.transform; //Parents the block to player to move it with player
		if (daPlayer.transform.rotation == transform.rotation)
		{
			daPlayer.transform.Translate(Vector3.forward * Time.deltaTime);
		}
	}
	if (!Input.GetButton ("Fire1"))
	{
		//Gives player control back when they release the button
		if (havePressed)
		{
			transform.parent.gameObject.transform.parent = null;
			canPush = false;
			isPushing = false;
		}
		playControl.enabled = true;
	}
}

function OnGUI()
{
	if (canPush && !isPushing)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height-20, Screen.width, Screen.height), "Press and hold A button to push the block!");
	}
}