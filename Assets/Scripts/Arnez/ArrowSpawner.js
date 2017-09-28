var arrow : GameObject; //In Inspector, drag the flaming arrow prefab here; should already have the 'FlamingArrow' script attached to it
var waitTime : float; //In Inspector, set this to how long we should wait between sending flaming arrows
private var isOn = false; //Just determines if it's time to start shooting arrows or not once the trigger has been hit
private var sentFirst = false; //Just determines if we've sent off the first prefab of flaming arrows so that we can begin counting towards sending the next one
private var t : float = 0.0;
function Update () 
{
	if (isOn)
	{
		Instantiate(arrow, transform.position, transform.rotation);
		arrow.GetComponent("FlamingArrow").canFire = true;
		sentFirst = true;
		t = 00;
		isOn = false;
	}
	if (!isOn && sentFirst)
	{
		t += Time.deltaTime;
		if (t >= waitTime)
		{
			isOn = true;
			t = 00;
		}
	}

}

//For the arrow spawners in the initially pitch black room, we'll need a trigger right at the start of the room that turns
// them all on; then that trigger should destroy itself