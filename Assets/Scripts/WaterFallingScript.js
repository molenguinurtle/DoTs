var placeToRespawn : Transform;
var theYell : AudioClip;
var theScream : AudioClip;
private var daPlayer : GameObject;
private var needRespawn = false;
var weBrown = false;
function Update ()
{
	if (needRespawn)
	{
		Respawn();
	}
}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez")
	{
		AudioSource.PlayClipAtPoint(theYell, transform.position);
		daPlayer = other.gameObject;
		needRespawn = true;
	}
	if (other.gameObject.tag == "Knook")
	{
		AudioSource.PlayClipAtPoint(theScream, transform.position);
		daPlayer = other.gameObject;
		needRespawn = true;
	}
	if (other.gameObject.tag == "Jethro" && weBrown)
	{
		AudioSource.PlayClipAtPoint(theYell, transform.position);
		daPlayer = other.gameObject;
		needRespawn = true;
	}	

}

function Respawn()
{
	daPlayer.transform.position = Vector3.Lerp(daPlayer.transform.position, placeToRespawn.position, Time.time); //This is where we move the player out of water
	needRespawn = false;
}

function OnGUI()
{
	if (needRespawn)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height-20, Screen.width, Screen.height), "You fell into the water!");
	}
}