//***This script is for if the player falls/dies in the flip puzzle room***
// ***Will need to tag all the flip plats 'Flip'***
var leMngr: GameObject; //Drag the FlipMngr gameobject here in Inspector
var spwn: Transform; //This is where we place the player (pre-'leJump') after he/she falls
var leTrinket: GameObject; //The object in the flip color room that the player picks up and starts all this nonsense
private var daPlayer: GameObject; //le player, obviously
private var needReset = false;
private var t: float = 00;

function Update ()
{
	if (needReset)
	{
		ResetFlip();
	}
}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Arnez")
	{
		daPlayer = other.gameObject;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = true;
		needReset = true;
	}
}

function ResetFlip()
{
	for (var flip in GameObject.FindGameObjectsWithTag("Flip")) //If this doesn't work, we'll just list all the flip
																// trigs in an array in this script
	{
		flip.GetComponent("FlipColorTrig").isGrey = true;
		flip.transform.parent.gameObject.GetComponent.<Renderer>().material = flip.GetComponent("FlipColorTrig").gCol;
	}
	t += Time.deltaTime;
	if (t>=.75)
	{	
		AudioSource.PlayClipAtPoint(GameObject.FindGameObjectWithTag("Respawn").GetComponent(RespawnManagerScript).nezYell, transform.position);
		if (leMngr != null)
		{
			leMngr.GetComponent("FlipMngr").daCount = leMngr.GetComponent("FlipMngr").daNum;
			leMngr.GetComponent("FlipMngr").firstTimeA = false;
			leMngr.GetComponent("FlipMngr").firstTimeB = true;
			leMngr.GetComponent("FlipMngr").needPanB = true;
			leMngr.GetComponent("FlipMngr").needPanA = true;
			leTrinket.GetComponent.<Renderer>().enabled = true;
			leTrinket.GetComponent("TrinketScript").isPlaying = false;
			leTrinket.GetComponent("TrinketScript").leTrig.active = false;
		}
		daPlayer.transform.position = spwn.position;
		daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = false;
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		t = 00;
		needReset = false;
	}
}