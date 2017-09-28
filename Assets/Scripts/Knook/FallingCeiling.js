//This script is attached to the falling ceiling and all it does is tell the switch to reset the puzzle if it collides w/ Knook
var leInitializer : GameObject; //In Inspector, drag the switch that starts the puzzle to this slot


function Update () 
{

}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Knook")
	{
		AudioSource.PlayClipAtPoint(GameObject.FindGameObjectWithTag("Respawn").GetComponent(RespawnManagerScript).knookYell, transform.position);
		leInitializer.GetComponent("FallingCeilInit").needReset = true;
	} 
}