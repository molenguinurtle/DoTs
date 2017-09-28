private var theTarget : GameObject;
function Start()
{
	theTarget = gameObject.FindWithTag("Player");
}
function Update ()
{
	if (transform.gameObject.tag == "SloMo")
	{
		Time.timeScale = .5;
		transform.LookAt(theTarget.transform);
	}
	if (transform.gameObject.tag != "SloMo")
	{
		Debug.Log("Change the tag to SloMo");
	}
}