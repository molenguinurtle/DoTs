private var isWarning = false;
function Update () 
{
}
function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Jethro" && GameObject.FindGameObjectWithTag("Character").GetComponent("ChrMngr").curGuy.tag== "Jethro")
	{
		isWarning = true;
	}
}
function OnTriggerExit(other : Collider)
{
	if (other.gameObject.tag == "Jethro")
	{
		isWarning = false;
	}
}
function OnGUI()
{
	if (isWarning)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Trust me, you don't wanna swim in that...");
	}
}