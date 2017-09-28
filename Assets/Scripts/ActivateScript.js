var objectToAffect : GameObject; //Set in Inspector to the object(s) to be activated
var needSound = false;
var activate = false;
var deactivate = false;
var soundToPlay : AudioClip;
function Update ()
{
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez" || other.gameObject.tag == "Jethro" || other.gameObject.tag == "Knook" && activate && !deactivate)
	{
		objectToAffect.SetActiveRecursively(true);
		if (needSound)
		{
			AudioSource.PlayClipAtPoint(soundToPlay, transform.position);
		}
		Destroy (this);	
	}
	if (other.gameObject.tag == "Arnez" || other.gameObject.tag == "Jethro" || other.gameObject.tag == "Knook" && deactivate && !activate)
	{
		objectToAffect.SetActiveRecursively(false);
		if (needSound)
		{
			AudioSource.PlayClipAtPoint(soundToPlay, transform.position);
		}
		Destroy (this);	
	}
}