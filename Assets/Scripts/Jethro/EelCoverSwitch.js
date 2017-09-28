var coverMngr: GameObject; //Drag the EelCoverMngr gameobject here in Inspector
var blue = false; //Check either red or blue in the Inspector to designate which holes will be covered by the respective switch
var red = false;

function Update ()
{
}

function OnTriggerEnter(other: Collider)
{
	//Will need to come back and add in taking away Jethro's controls & the ability to switch while briefly switching the camera
	// to a shot of the holes being covered and uncovered
	if (other.gameObject.tag == "Jethro" && blue)
	{
		coverMngr.GetComponent("EelCoverMngr").CoverB();
	}
	if (other.gameObject.tag == "Jethro" && red)
	{
		coverMngr.GetComponent("EelCoverMngr").CoverA();
	}
	
}