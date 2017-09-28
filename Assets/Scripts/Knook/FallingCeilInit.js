var leManager : GameObject; //In Inspector, drag the Falling Ceiling Manager to this slot
var boxesPrfb : GameObject; //In Inspector, drag the FallCeilBoxes prefab here
var boxPnt : Transform; //In Inspector, drag an empty gameobject here; this is where the boxes will be spawned
var origCPos : Transform; //In Inspector, set this position to the position that the ceiling gameobjects are originally at
var respawnPos : Transform; //In Inspector, set this to the position you want the player to be at should they fail this puzzle
						  //Probably want this next to the initializing switch, which this script is attached to
var leDoor: GameObject; //The door that's opened after we complete the room
var trigSnd: AudioClip; //The Sound we play when trigger is hit
private var daPlayer : GameObject;
private var boxes : GameObject; //The instantiated boxes get set to this variable so we can keep track of them
private var isPlaying = false;
private var needReset = false;
private var puzzleDone = false;
var t : float = 0.0;
function Update () 
{
 	if (needReset)
 	{
 		ResetPuzzle();
 	}
 	if (puzzleDone)
 	{
 		GameObject.FindGameObjectWithTag("Door").GetComponent("DoorMngr").daDoor = leDoor;
		GameObject.FindGameObjectWithTag("Door").GetComponent("DoorMngr").needOpen = true;
 		Debug.Log("SUCCESS");
 		Destroy(this);
 	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Knook" && !isPlaying) 
	{
	    AudioSource.PlayClipAtPoint(trigSnd, transform.position);
		daPlayer = other.gameObject;
		boxes = Instantiate(boxesPrfb, boxPnt.position, boxPnt.rotation);
		leManager.GetComponent("FallingCeilingMng").isOn = true;
		GameObject.FindGameObjectWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		GetComponent.<Renderer>().enabled = false;
		isPlaying = true;
	}

}

function ResetPuzzle()
{
	Destroy(boxes);
	leManager.GetComponent("FallingCeilingMng").isOn = false;
	leManager.GetComponent("FallingCeilingMng").i = 0;
	leManager.GetComponent("FallingCeilingMng").ceilSet = false;
	for (var ceil in leManager.GetComponent("FallingCeilingMng").ceilings)
	{
		ceil.SetActiveRecursively(false);
		ceil.transform.position = origCPos.position;
	}
	daPlayer.GetComponent("ThirdPersonController").enabled = false;
	daPlayer.transform.position = respawnPos.position;
	t += Time.deltaTime;
	if (t >= 2.0)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		GameObject.FindGameObjectWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		isPlaying = false;
		GetComponent.<Renderer>().enabled = true;
		t = 00;
		needReset = false;
	}
	
}