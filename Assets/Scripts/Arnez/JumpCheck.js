//This script's only purpose is to keep track of if Arnez's currently jumping or not; also what was he 
var isJumping = false;
var daJump: GameObject;
function Update () 
{

}
function OnTriggerEnter (other : Collider)
{	
	if (other.gameObject.tag == "Jmp")
	{
		daJump = other.gameObject;
	}
}