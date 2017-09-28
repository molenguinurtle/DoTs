private var daPlayer : GameObject;
private var letsCam = false;
var camToActivate : GameObject;
private var t : float;
var waitTime : float;
function Update ()
{
	if (letsCam)
	{
		daPlayer.SetActiveRecursively(false);
		t += Time.deltaTime;		
		if (t < waitTime)
		{
			camToActivate.active = true;
		}
		if (t >= waitTime)
		{
			camToActivate.active = false;
			daPlayer.SetActiveRecursively(true);
			this.enabled = false;		
		}
	}

}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez" || other.gameObject.tag == "Knook" || other.gameObject.tag == "Jethro")
	{
		daPlayer = other.gameObject;
		t = 00;
		letsCam = true;
	}
}