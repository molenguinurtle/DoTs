var cameraA : GameObject;
var sloCams : GameObject[];
private var cameraB : GameObject;
function Start()
{
	cameraA = gameObject.FindWithTag("MainCamera");
	cameraB = sloCams[Random.Range(0, sloCams.length-1)];
}
function Update ()
{
}
function OnTriggerStay(other : Collider) 
{
    if (other.gameObject.tag == "Player") 
    {
   		//Deactivate the main camera and activate the slomo one
   		cameraA.SetActiveRecursively(false);
   		cameraB.active = true;
    }   	
}
function OnTriggerExit(other : Collider)
{
	if (other.gameObject.tag == "Player")
	{
		//Reactivate the main camera and deactivate the slomo one
		cameraB.active = false;
		cameraA.SetActiveRecursively(true);
	}
}