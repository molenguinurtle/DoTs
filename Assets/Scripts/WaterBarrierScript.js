
function Update () {
}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez" || other.gameObject.tag == "Knook")
	{
		GetComponent.<Collider>().isTrigger = false;
	}
	else
	{
		GetComponent.<Collider>().isTrigger = true;
	}
}

function OnCollisionEnter (other : Collision)
{
	if (other.gameObject.tag == "Jethro")
	{
		GetComponent.<Collider>().isTrigger = true;
	}
	else
	{
		GetComponent.<Collider>().isTrigger = false;
	}
}