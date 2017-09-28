var plunges : GameObject[]; //In Inspector, drag all the spiked plungers in this trigger's corresponding room into this array
private var doinWrk = false;
private var t : float = 0.0;
function Update () 
{
	if (doinWrk)
	{
		t += Time.deltaTime;
		if (t >= 2.0)
		{
			Destroy(gameObject); //We're destroying this trigger once we've turned on all les plungers; may have to change this number
		}
	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Jethro" || other.gameObject.tag == "Arnez" && doinWrk == false)
	{
		for (var plng in plunges) //This is turning on all of the plungers in the room once Jethro or Arnez walks into le trigger
		{
			plng.GetComponent("SpikedPlunger").canDrop = true;
		}
		GameObject.FindGameObjectWithTag("Character").GetComponent(ChrMngr).canSwitch = false;
		doinWrk = true;
	}
}