//All this script does is parent Arnez to the moving group of platforms when he enters it and unparents him when he exits it
//The script's purpose is to allow Arnez to move sideways with the platforms w/o having to worry about constant forces and shit
//Attach this to a giant Box Collider Trigger that is a component of the parent gameobject of the MovingJmps prefab

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez")
	{
		other.gameObject.transform.parent = transform;
	}
}
function OnTriggerExit (other : Collider)
{
	if (other.gameObject.tag == "Arnez")
	{
		other.gameObject.transform.parent = null;
	}
}