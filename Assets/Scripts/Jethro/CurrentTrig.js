var needPush = false;
private var daPlayer: GameObject;
function Update ()
{
	if (needPush)
	{
		daPlayer.GetComponent.<Rigidbody>().AddForce(Vector3.forward*10);
	}
}
function FixedUpdate()
{

}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Jethro" && GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy.tag == "Jethro")
	{
		daPlayer = other.gameObject;
		daPlayer.AddComponent.<Rigidbody>();
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		daPlayer.GetComponent("CharacterController").enabled = false;
		needPush = true;
	}
}

function OnTriggerExit(other: Collider)
{
	if (other.gameObject.tag == "Jethro" && GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy.tag == "Jethro")
	{
		Destroy(other.gameObject.GetComponent.<Rigidbody>());
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		daPlayer.GetComponent("CharacterController").enabled = true;
		needPush = false;
	}
}