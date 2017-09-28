var arrowSpwns : GameObject[]; //In Inspector, drag all the flaming arrow spawners into this array
private var doinWrk = false;
private var t : float = 0.0;
function Update () 
{
	if (doinWrk)
	{
		t += Time.deltaTime;
		if (t >= 2.0)
		{
			Destroy(gameObject); //We're destroying this trigger once we've turned on all les spawners; may have to change this number
		}
	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez")
	{
		for (var spwn in arrowSpwns) //This is turning on all of the arrow spawners in the pitch black room once Arnez walks into le trigger
		{
			spwn.GetComponent("ArrowSpawner").isOn = true;
		}
		doinWrk = true;
	}
}