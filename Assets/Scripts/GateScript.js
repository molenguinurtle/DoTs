var placeToSpawn : Transform;
var townName : String; //Type in the name of the town in the Inspector
var enter : System.Boolean;
var exit : System.Boolean;
private var daPlayer : GameObject;
private var canMove = false;
function Update ()
{
	if (canMove)
	{
		LeaveRoom();
	}
}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Player")
	{
		daPlayer = other.gameObject;
		canMove = true;
	}
}
function OnTriggerExit(other : Collider)
{
	if (other.gameObject == daPlayer)
	{
		canMove = false;
	}
}
function LeaveRoom()
{
	var havePressed = false;
	if (Input.GetButtonUp ("Fire1")) 
	{	
		havePressed= true;
		if (havePressed) //If we left click, we move to the placeToSpawn
		{
			daPlayer.transform.position = Vector3(placeToSpawn.position.x, placeToSpawn.position.y, placeToSpawn.position.z);
			canMove = false;
		}
	}
}
function OnGUI() //This tells the player the button to climb ladder
{
	if (canMove && enter)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to enter "+ townName+"!");
	}
	if (canMove && exit)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to exit "+ townName+"!");
	}
}