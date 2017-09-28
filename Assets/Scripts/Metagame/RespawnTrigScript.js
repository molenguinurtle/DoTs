//This script gets attached to the Respawn update triggers throughout the dungeon
//Its only purpose is to keep the Respawn Manager updated with respawn positions for the 3 characters
function Update () 
{
}
function OnTriggerEnter(other : Collider)
{
	//All this says is if it's Arnez, update Arnez's respawn position, if it's Knook, Knook's; Jethro, Jethro's
	if (other.gameObject.tag == "Arnez")
	{
		GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").arnezPos = transform;
	}
	if (other.gameObject.tag == "Knook")
	{
		GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").knookPos = transform;
	}
	if (other.gameObject.tag == "Jethro")
	{
		GameObject.FindWithTag("Respawn").GetComponent("RespawnManagerScript").jethroPos = transform;
	}
}