var movePlats : GameObject; //In Inspector, drag the moving plats prefab here; should already have 'JumpMovingScript' attached to it
var startPoint : Transform; //In Inspector, set this using an empty transform gameobject; this is where we'll be starting the platforms from
var endPoint : Transform; //In Inspector, set this using an empty transform gameobject; this is where we'll be sending the platforms to
var waitTime : float; //In Inspector, set this to how long we should wait between sending moving plats
var trigSnd : AudioClip; //Sound we play when trigger is touched
private var isOn = false; //Just determines if it's time to start moving stuff or not once the trigger has been hit
private var sentFirst = false; //Just determines if we've sent off the first prefab of moving plats so that we can begin counting towards sending the next one
private var t : float = 0.0;
function Update () 
{
	if (isOn)
	{
		Instantiate(movePlats, startPoint.position, startPoint.rotation);
		movePlats.GetComponent("JumpMovingScript").dest = endPoint.position;
		movePlats.GetComponent("JumpMovingScript").canGo = true;
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
		}
	}

}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez" && isOn == false && sentFirst == false)
	{
	    AudioSource.PlayClipAtPoint(trigSnd, transform.position);
	    GetComponent.<Renderer>().enabled = false;
		isOn = true;
	}
}

