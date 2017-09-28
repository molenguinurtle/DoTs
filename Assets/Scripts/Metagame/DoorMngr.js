//***This script will need to be attached to an empty gameobject tagged 'Door'
var leMngr: GameObject; //Drag the character manager gameobject here in Inspector
private var daDoor: GameObject; //Gets set by the puzzle/task that is completed to open door
private var needOpen = false; //Gets set to true by the puzzle/task that is completed to open door
private var t: float = 00;
function Update ()
{
	if (needOpen)
	{
		OpenSesame();
	}
}

function OpenSesame()
{
	leMngr.GetComponent("ChrMngr").canSwitch = false;
	leMngr.GetComponent("ChrMngr").curGuy.GetComponent("ThirdPersonController").enabled = false;
	leMngr.GetComponent("ChrMngr").curGuy.transform.Find("Camera").camera.enabled = false;
	daDoor.SetActiveRecursively(true); //This is to activate the camera looking at the door
	daDoor.GetComponent("DoorScript").enabled = true;
	t += Time.deltaTime;
	if (t>=3.0)
	{
		daDoor.transform.Find("DoorCam").gameObject.active = false;
		leMngr.GetComponent("ChrMngr").curGuy.transform.Find("Camera").camera.enabled = true;
		leMngr.GetComponent("ChrMngr").curGuy.GetComponent("ThirdPersonController").enabled = true;
		leMngr.GetComponent("ChrMngr").canSwitch = true;
		t = 00;
		needOpen = false;
	}
}