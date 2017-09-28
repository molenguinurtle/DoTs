var objectToRotate : GameObject; //Set this to whatever object is being rotated by this particular wheel
var fromPoint : Transform; //Set this to an empty transform at the starting rotation of the 'objectToRotate'
var toPoint : Transform; //Set this to an empty transform that is rotated to whatever point you want the 'objectToRotate'
						 //to be at
var rotateSpd : float; //Set this to how fast you want the object to rotate
private var canRotate = false; //This variable gets set to true when we're ready to rotate 'objectToRotate'
private var blue = true;
private var red = false;
private var daPlayer : GameObject; //The player

function Update ()
{
	if (canRotate && blue)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		objectToRotate.transform.rotation = Quaternion.Slerp(objectToRotate.transform.rotation, toPoint.rotation, Time.time*rotateSpd);
		if (objectToRotate.transform.rotation.y == toPoint.rotation.y)
		{
			daPlayer.GetComponent("ThirdPersonController").enabled = true;
			red = true;
			blue = false;
			canRotate = false;
		}
	}
	if (canRotate && red)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		objectToRotate.transform.rotation = Quaternion.Slerp(objectToRotate.transform.rotation, fromPoint.rotation, Time.time*rotateSpd);
		if (objectToRotate.transform.rotation.y == fromPoint.rotation.y)
		{
			daPlayer.GetComponent("ThirdPersonController").enabled = true;
			blue = true;
			red = false;
			canRotate = false;
		}
	}
}
function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == "Knook") 
    {
    	daPlayer = other.gameObject; 
		canRotate = true;
    }
}