var isGrey = true;
var leManager: GameObject; //This is the flipColorMngr gameobject; Drag here in Inspector
var gCol: Material; //Drag the texture/material for the platform when it's grey
var oCol: Material; //Drag the texture/material for the platform when it's orange

function Update ()
{

}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Arnez" && isGrey)
	{
		transform.parent.gameObject.GetComponent.<Renderer>().material = oCol;
		leManager.GetComponent("FlipMngr").daCount -=1;
		isGrey = false;
	}
	else if (other.gameObject.tag == "Arnez" && !isGrey)
	{
		transform.parent.gameObject.GetComponent.<Renderer>().material = gCol;
		leManager.GetComponent("FlipMngr").daCount +=1;
		isGrey = true;
	}
}