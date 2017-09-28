var downRotation = Quaternion.identity;
var upRotation = Quaternion.identity;
var leftRotation = Quaternion.identity;
var rightRotation = Quaternion.identity;

function Update ()
{
	if (Input.GetButton ("Up"))
	{
		transform.rotation.eulerAngles = Vector3(0, 0, 0);
		if (transform.localRotation == upRotation)
		{
			transform.Translate(Vector3.forward * Time.deltaTime);
		}
	}
	if (Input.GetButton ("Down"))
	{
		transform.rotation.eulerAngles = Vector3(0, 180, 0);
		if (transform.localRotation == downRotation)
		{
			transform.Translate(Vector3.forward * Time.deltaTime);
		}
	}
	if (Input.GetButton ("Left"))
	{
		transform.rotation.eulerAngles = Vector3(0, 270, 0);
		if (transform.localRotation == leftRotation)
		{
			transform.Translate(Vector3.forward * Time.deltaTime);
		}
	}
	if (Input.GetButton ("Right"))
	{
		transform.rotation.eulerAngles = Vector3(0, 90, 0);
		if (transform.localRotation == rightRotation)
		{
			transform.Translate(Vector3.forward * Time.deltaTime);
		}
	}
	if (Input.GetButton ("Left") && Input.GetButton("Up"))
	{
		transform.rotation.eulerAngles = Vector3(0, 270, 0);
		if (transform.localRotation == leftRotation)
		{
			transform.Translate(Vector3.forward * Time.deltaTime);
		}
	}
	if (Input.GetButton ("Left") && Input.GetButton("Down"))
	{
		transform.rotation.eulerAngles = Vector3(0, 270, 0);
		if (transform.localRotation == leftRotation)
		{
			transform.Translate(Vector3.forward * Time.deltaTime);
		}
	}
	if (Input.GetButton ("Right") && Input.GetButton("Up"))
	{
		transform.rotation.eulerAngles = Vector3(0, 90, 0);
		if (transform.localRotation == rightRotation)
		{
			transform.Translate(Vector3.forward * Time.deltaTime);
		}
	}
	if (Input.GetButton ("Right") && Input.GetButton("Down"))
	{
		transform.rotation.eulerAngles = Vector3(0, 90, 0);
		if (transform.localRotation == rightRotation)
		{
			transform.Translate(Vector3.forward * Time.deltaTime);
		}
	}

}

