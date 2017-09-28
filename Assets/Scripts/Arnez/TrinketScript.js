var leMngr: GameObject; //This is the 'FlipMngr' gameObject
var leTrig: GameObject; //This is the trigger that tells the 'chrmngr' gameobject that we completed this room once we touch it
private var isPlaying = false;
function Update () 
{

}
function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Arnez" && !isPlaying)
	{
		GetComponent.<Renderer>().enabled = false;
		leTrig.active = true;
		leMngr.GetComponent(FlipMngr).firstTimeA = true;
		isPlaying = true;
	}
}