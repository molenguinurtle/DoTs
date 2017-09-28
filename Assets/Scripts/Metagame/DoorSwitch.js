var leDoor: GameObject; //The door that is opened when this trigger is touched
var leMngr: GameObject; //The 'DoorMngr' gameobject
var leGuy: String; //This is the character that has to touch this trig to activate it; Set in Inspector
var trigSnd: AudioClip; //Sound we play when trig is touched
function Update () 
{

}
function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == leGuy) 
    {
        AudioSource.PlayClipAtPoint(trigSnd, transform.position);
		leMngr.GetComponent("DoorMngr").daDoor = leDoor;
		leMngr.GetComponent("DoorMngr").needOpen = true;
		GetComponent.<Renderer>().enabled = false;
		Destroy(this); //Do this so that we can't run back into this trigger
    }
}