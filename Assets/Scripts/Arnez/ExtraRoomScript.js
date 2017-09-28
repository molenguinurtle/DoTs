var leMngr: GameObject; //Drag 'ChrMngr' gameobject here in Inspector
var flipMng: GameObject; //Drag 'FlipMngr' gameobject here in Inspector
var extraDoor: GameObject; //Drag the bars from the door gameobject from 'Hallway(Arnez)' that leads to the extra room, here in Inspector
var leSnd: AudioClip;
function Update ()
{

}
function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Arnez")
	{
		leMngr.GetComponent("ChrMngr").didExtra = true;
		AudioSource.PlayClipAtPoint(leSnd, transform.position);
		for (var flip in GameObject.FindGameObjectsWithTag("Flip")) 
		{
			Destroy(flip);
		}
		extraDoor.SetActiveRecursively(true);
		Destroy(extraDoor.transform.parent.GetComponent(DoorScript));
		Destroy(flipMng);
		Destroy(this);
	}
}