var leMngr: GameObject; //Drag 'DoorMngr' object here in Inspector
var leDoor: GameObject; //Drag the door in question in the 'HubRoom' here in Inspector
var leBarrier: GameObject; //Drag the weightboxes that we activate when this script does its job here in Inspector
private var canDo = false;
private var daPlayer: GameObject;
function Update ()
{
	if (canDo && GameObject.FindGameObjectWithTag("Character").GetComponent(ChrMngr).curGuy.tag == "Knook")
	{
		FakeWeight();
	}
}

function OnTriggerEnter (other : Collider)
{	
	if (other.gameObject.tag == "Knook")
	{
		daPlayer = other.gameObject;
		canDo = true;
	}
}

function OnTriggerExit (other : Collider)
{
	if (other.gameObject.tag == "Knook")
	{
		canDo = false;
	}
}

function FakeWeight()
{
	if (Input.GetButtonUp("Fire1")) //Basically once we destroy the box, open the door and drop the weighted boxes down around Knook
	{
		leMngr.GetComponent("DoorMngr").daDoor = leDoor;
		leMngr.GetComponent("DoorMngr").needOpen = true;
		leBarrier.SetActiveRecursively(true);
		//Reserved for falling anvil cartoon sound clip
		Destroy(this);
	}
}