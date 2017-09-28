var leWalls: GameObject[]; //In Inspector, drag all the spiked wall pairs to these slots in order
var leChngs: GameObject[]; //In Inspector, drag all the 'SpikeChange' gameobjects to this slot
var myBoxes: GameObject; //In Inspector, drag original 'ClosingInBoxes' gameobject to this slot
var boxFab: GameObject; //In Inspector, drag 'ClosingInBoxes' prefab to this slot
var knkSpwn: Transform; //Where we move Knook to when he touches the key
var resPnt: Transform; //Where we respawn the player if killed by spiked walls;
var leSentenceA: String; //We need a message to show the player when Knook falls into this room; Type that message here in Inspector
var leSentenceB: String; //This is the message we show the player after he/she is killed by spiked walls and before they reset 
var camTrig: GameObject; //The camera panning trig; Drag here in Inspector
var spkSnd: AudioClip; //Drag the creaking sound here in Inspector
private	var spikeStart = false;
private var canReset = false;
private var needReset = false;
private var needNext = false;
private var hasKey = false;
private var i: int = 0;
private var t: float = 00;
private var daPlayer: GameObject; //The player
private var boxSpwn: Transform;
function Start()
{
	boxSpwn = myBoxes.transform;
}

function Update ()
{
	if (needReset)
	{
		ResetSpikes();
	}
	if (hasKey)
	{
		StartSpikes();
	}
	if (needNext)
	{
		StartNext();
	}
}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Knook")
	{
		daPlayer = other.gameObject;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = true;
		daPlayer.transform.position = knkSpwn.position;
		daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = false;
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		hasKey = true;
	}
}

function StartSpikes()
{
	GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
	//daPlayer.GetComponent("ThirdPersonController").enabled = false;
	if (!spikeStart)
	{
		t += Time.deltaTime;
		if (t >= 12.25) //Waiting until the camera is done panning to allow the player to play
		{	
			camTrig.active = false;
			daPlayer.GetComponent("ThirdPersonController").enabled = false;
			spikeStart = true;
		}
	}
	if (Input.GetButtonUp("Fire1") && spikeStart)
	{
		AudioSource.PlayClipAtPoint(spkSnd, transform.position);
		leWalls[i].GetComponent(KnookWallScript).go = true;
		leWalls[i+1].GetComponent(KnookWallScript).go = true;
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		spikeStart = false;
		hasKey = false;
	}
}

function StartNext()
{
	AudioSource.PlayClipAtPoint(spkSnd, transform.position);
	leWalls[i].GetComponent(KnookWallScript).go = true;
	leWalls[i+1].GetComponent(KnookWallScript).go = true;
	daPlayer.GetComponent("ThirdPersonController").enabled = true;
	needNext = false;
}

function ResetSpikes()
{
	daPlayer.GetComponent("ThirdPersonController").enabled = false;
	daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = true; //Attach a black plane to character as child and make it large enough/position it so
											    // that it'll cover entire camera frame when active
	daPlayer.transform.position = resPnt.position;
	canReset = true;
	if (Input.GetButtonUp("Fire1") && canReset)
	{
		for (var spike in leWalls)
		{
			spike.GetComponent(KnookWallScript).go = false;
			spike.transform.position = spike.GetComponent(KnookWallScript).initPos;
		}
		for (var chng in leChngs)
		{
			chng.GetComponent(ChangeSpikes).canChange = true;
		}
		myBoxes.SetActiveRecursively(false);
		myBoxes = Instantiate(boxFab, boxSpwn.position, boxSpwn.rotation);
		myBoxes.SetActiveRecursively(true);
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = false;
		camTrig.active = true;
		camTrig.transform.GetComponent.<Collider>().isTrigger = true;
		i = 0;
		t = 00;
		needNext = false;
		canReset = false;
		needReset = false;
	}
}

function OnGUI() 
{
	if (spikeStart) //This tells the player the button to press to start the eel chase sequence
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leSentenceA);
	}
	if (canReset) //This tells the player the button to reset the eel chase sequence if killed
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leSentenceB);
	}
}