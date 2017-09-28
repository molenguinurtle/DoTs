var leKey: GameObject; //The 'KeyK' gameobject in question; Set in Inspector
var canChange = true;
function Update () 
{

}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Knook" && canChange)
	{
		leKey.GetComponent("KnookKey").i += 2;
		leKey.GetComponent("KnookKey").needNext = true;
		canChange = false;
	}
}