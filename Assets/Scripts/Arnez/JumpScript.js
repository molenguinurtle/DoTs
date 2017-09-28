private var daPlayer : GameObject; //The player
var jumpPoint : Transform; //This is where we're jumping to
var moveTime : float;
var canJump = false;
var needSwitch = true;
private var haveJumped = true;
private var havePressed = false;
private var tranTime : float;
private var isJumping = false;

function Update () 
{
	if (canJump && GameObject.FindWithTag("Character").GetComponent(ChrMngr).curGuy.tag == "Arnez")
	{
		Jump();
	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez" && !other.gameObject.GetComponent("JumpCheck").isJumping)
	{
		daPlayer = other.gameObject;
		canJump = true;
		haveJumped = false;
		tranTime = 00;
		havePressed = false;
	}
}

function OnTriggerExit (other : Collider) //All this is doing is taking the OnGUI message off the screen once the player has jumped/is jumping
{
	if (other.gameObject == daPlayer)
	{
		haveJumped = true;
		if (!isJumping)
		{
			canJump = false;
		}
	}
}

function Jump() //The function for jumping
{
    var playControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
	GameObject.FindWithTag("Character").GetComponent(ChrMngr).canSwitch = false;
	daPlayer.GetComponent("JumpCheck").isJumping = true;
	playControl.enabled = false;
	havePressed = true;
	if (havePressed) //If we left click, we jumpin
	{
		isJumping = true;
		tranTime += Time.deltaTime;
		daPlayer.transform.position = Vector3.Lerp(daPlayer.transform.position, jumpPoint.position, tranTime/moveTime);
		//daPlayer.transform.rotation = Quaternion.Lerp (daPlayer.transform.rotation, jumpPoint.rotation, tranTime/moveTime);
		if (tranTime >= moveTime)
		{
			daPlayer.GetComponent("JumpCheck").isJumping = false;
			isJumping = false;
			playControl.enabled = true;
			if (needSwitch)
			{
				GameObject.FindWithTag("Character").GetComponent(ChrMngr).canSwitch = true;
			}
			canJump = false;
		}
	}
}
