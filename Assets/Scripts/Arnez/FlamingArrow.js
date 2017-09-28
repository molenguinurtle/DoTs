private var dest : Vector3; //This is where the flaming arrow is flying to; This will be set by the spawner that instantiates the arrows
var canFire = false; //This determines if the arrows can fly or not; is set to true by spawner that instantiates the arrows
private var t : float = 0.0; //This is our counter for destroying the arrows
function Start () 
{
	if (transform.rotation.y != 00)
	{
		dest = Vector3(transform.position.x, transform.position.y, transform.position.z-7.5);
	}
	else if (transform.rotation.y == 00)
	{
		dest = Vector3(transform.position.x, transform.position.y, transform.position.z+7.5);
	}
}
function Update () 
{
	if (canFire)
	{
		t += Time.deltaTime;
		var dist : float = Vector3.Distance(transform.position, dest);
		if (dist > 0)
		{
		    transform.position = Vector3.Lerp(transform.position, dest, Time.deltaTime*2.0/dist);
		}
		else if (dist <= 0)
		{
			Destroy(gameObject);
		}

	}
}

