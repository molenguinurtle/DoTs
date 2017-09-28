var lockPos : float; //Set this in Inspector to lock rotation of camera at set point in y axis
function LateUpdate ()
{
	transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x, lockPos, transform.rotation.eulerAngles.z);
}

function Update ()
{
	transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x, lockPos, transform.rotation.eulerAngles.z);
}