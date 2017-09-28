//All this script does is call the appropriate respawn function from the respawn manager
var needSwitch = true; //Set to false in Inspector if the player shouldn't be able to switch characters after dying here
function Update () 
{
}

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Arnez")
	{
		if (!needSwitch)
		{
			GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").letSwitch = false;
		}
		else if (needSwitch)
		{
			GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").letSwitch = true;
		}
		GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").ArnezRespawn();
	}
	if (other.gameObject.tag == "Knook")
	{		
		if (!needSwitch)
		{
			GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").letSwitch = false;
		}
		else if (needSwitch)
		{
			GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").letSwitch = true;
		}
		GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").KnookRespawn();
	}
	if (other.gameObject.tag == "Jethro")
	{
		if (!needSwitch)
		{
			GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").letSwitch = false;
		}
		else if (needSwitch)
		{
			GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").letSwitch = true;
		}
		GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").JethroRespawn();
	}
}