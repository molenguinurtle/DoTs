var daWall: GameObject; //Drag spiked wall prefab here in Inspector
var finalTrig: GameObject; //This is the final trig that we activate once the key is touched; Once Arnez runs into this, his part is over
var backWall: GameObject; //Set this to 'LeftWall' Gameobject in Inspector
var wallSpwn: Transform; //Empty gameobject where you want the spiked wall to spawn in the level
var resPnt: Transform; //Where we respawn the player if killed by wall
var leSentenceA: String; //We need a message to show the player when the spiked wall appears; Type that message here in Inspector
var leSentenceB: String; //This is the message we show the player after he/she is killed by spiked wall and before they reset 
var wallSnd: AudioClip; //Drag the creaking wall sound here in Inspector
private var isPlaying = false;
private	var wallStart = false;
private var canReset = false;
private var needReset = false;
private var hasKey = false;
private var myWall: GameObject;
private var daPlayer: GameObject; //The player
function Update ()
{
	if (needReset)
	{
		ResetWall();
	}
	if (hasKey)
	{
		StartWall();
	}
}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Arnez" && !isPlaying)
	{
		daPlayer = other.gameObject;
		finalTrig.active = true;
		finalTrig.transform.parent.gameObject.GetComponent(DoorScript).enabled = true;
		if (finalTrig.transform.parent.gameObject.GetComponent(DoorScript).needUp != true)
		{
			finalTrig.transform.parent.gameObject.GetComponent(DoorScript).needUp = true;
		}
		AudioSource.PlayClipAtPoint(wallSnd, transform.position);
		hasKey = true;
		isPlaying = true;
	}
}

function StartWall()
{
	GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
	daPlayer.GetComponent("ThirdPersonController").enabled = false;
	backWall.active = false;
	if (!wallStart)
	{
		myWall= Instantiate(daWall, wallSpwn.position, wallSpwn.rotation);
		wallStart = true;
	}
	if (Input.GetButtonUp("Fire1") && wallStart)
	{
		var blockClrs : Component[];
		blockClrs = GetComponentsInChildren (Renderer);
		for (var block in blockClrs) 
		{
		    block.enabled = false;
		}			
		myWall.GetComponent("SpikedWallScript").go = true;
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		wallStart = false;
		hasKey = false;
	}
}

function ResetWall()
{
	daPlayer.GetComponent("ThirdPersonController").enabled = false;
	daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = true; //Attach a black plane to character as child and make it large enough/position it so
											    // that it'll cover entire camera frame when active
	Destroy(myWall);
	finalTrig.active = false;
	finalTrig.transform.parent.gameObject.GetComponent(DoorScript).enabled = false;
	finalTrig.transform.parent.Find("Bars").position = finalTrig.transform.parent.position;
	daPlayer.transform.position = resPnt.position;
	backWall.active = true;
	canReset = true;
	if (Input.GetButtonUp("Fire1") && canReset)
	{
		var blockClrs : Component[];
		blockClrs = GetComponentsInChildren (Renderer);
		for (var block in blockClrs) 
		{
		    block.enabled = true;
		}			
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = false;
		isPlaying = false;
		canReset = false;
		needReset = false;
	}
}

function OnGUI() 
{
	if (wallStart) //This tells the player the button to press to start the spiked wall chase sequence
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leSentenceA);
	}
	if (canReset) //This tells the player the button to reset the wall chase sequence if killed
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leSentenceB);
	}
}