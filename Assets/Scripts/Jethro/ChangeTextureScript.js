//This script goes on the purifying water switches in the 'ToxicWaterRoom' along Jethro's path
var theWater : GameObject[]; //The array of all the water pieces/gameobjects that this switch affect; Set in Inspector
var newColor : Material; //This is the clean water texture/material; Set in Inspector
var swimStuff : GameObject; //set this to the pool entry/exit triggers in inspector
var dirtTrig : GameObject; //the trigger that says you don't want to go in the water
var trigSnd : AudioClip; //This is the sound we play when trigger is touched
function Update ()
{
}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Jethro")
	{
		for (var wawa in theWater)
		{
			wawa.GetComponent.<Renderer>().material = newColor;
		}
		AudioSource.PlayClipAtPoint(trigSnd, transform.position);
		Destroy (dirtTrig);
		swimStuff.SetActiveRecursively(true);
		GetComponent.<Renderer>().enabled = false;
		Destroy(this);
	}
}