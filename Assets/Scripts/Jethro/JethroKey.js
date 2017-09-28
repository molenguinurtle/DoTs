var daEel: GameObject; //Drag eel prefab here in Inspector
var finalTrig: GameObject; //This is the final trig that we activate once the key is touched; Once Jethro runs into this, his part is over
var backWall: GameObject; //Set this to 'LeftWall' Gameobject in Inspector
var eelSpwn: Transform; //Empty gameobject where you want the eel to spawn in the level
var resPnt: Transform; //Where we respawn the player if killed by eel
var leSentenceA: String; //We need a message to show the player when the eel appears; Type that message here in Inspector
var leSentenceB: String; //This is the message we show the player after he/she is killed by eel and before they reset 
var eelSnd: AudioClip; //Drag the 'eelHiss' audio clip here in Inspector
private var isPlaying = false;
private	var eelStart = false;
private var canReset = false;
private var needReset = false;
private var hasKey = false;
private var myEel: GameObject;
private var daPlayer: GameObject; //The player
function Update ()
{
	if (needReset)
	{
		ResetEel();
	}
	if (hasKey)
	{
		StartEel();
	}
}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Jethro" && !isPlaying)
	{
		daPlayer = other.gameObject;
		finalTrig.active = true;
		finalTrig.transform.parent.gameObject.GetComponent(DoorScript).enabled = true;
		if (finalTrig.transform.parent.gameObject.GetComponent(DoorScript).needUp != true)
		{
			finalTrig.transform.parent.gameObject.GetComponent(DoorScript).needUp = true;
		}
		AudioSource.PlayClipAtPoint(eelSnd, transform.position);
		hasKey = true;
		isPlaying = true;
	}
}

function StartEel()
{
	GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
	daPlayer.GetComponent("ThirdPersonController").enabled = false;
	backWall.active = false;
	if (!eelStart)
	{
		myEel= Instantiate(daEel, eelSpwn.position, eelSpwn.rotation);
		eelStart = true;
	}
	if (Input.GetButtonUp("Fire1") && eelStart)
	{
		var blockClrs : Component[];
		blockClrs = GetComponentsInChildren (Renderer);
		for (var block in blockClrs) 
		{
		    block.enabled = false;
		}		
		myEel.GetComponent("EelScript").go = true;
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		eelStart = false;
		hasKey = false;
	}
}

function ResetEel()
{
	daPlayer.GetComponent("ThirdPersonController").enabled = false;
	daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = true; //Attach a black plane to character as child and make it large enough/position it so
											    // that it'll cover entire camera frame when active
	Destroy(myEel);
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
	if (eelStart) //This tells the player the button to press to start the eel chase sequence
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leSentenceA);
	}
	if (canReset) //This tells the player the button to reset the eel chase sequence if killed
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leSentenceB);
	}
}