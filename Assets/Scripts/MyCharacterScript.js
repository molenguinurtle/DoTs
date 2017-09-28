var walkSpeed : float;

function FixedUpdate()
{
	if (Input.GetAxis("Vertical"))
	{
		GetComponent.<Rigidbody>().AddForce (Vector3.forward * walkSpeed);
	}
}