var fredHealth : float = 1;
var lossRate : float; //This is the rate of health loss; make it less than 1
var pos : Vector2;
var size : Vector2;
var healthBarEmpty : Texture2D; //Picture of empty health bar
var healthBarFull : Texture2D; //Picture of full health bar
var healthBarHalf : Texture2D; //Picture of half health bar
var healthNearDeath : Texture2D; //Picture of almost dead health bar
var trigHealth : GameObject;
var endOfMission : GameObject; //This is the last trigger of the mission; it ends the mission
private var needHthBar = false;

function Start()
{
	pos.x = Screen.width-150;
}
function Update()
{
	if (trigHealth.GetComponent("TrigTest").beenHit && !needHthBar) //If we hit the trigger to activate the health bar...
	{
		endOfMission.active = true; //Activates the trigger at the end of the level; make sure this is tagged as a Destination in Inspector
		needHthBar = true;
	}
	if (needHthBar)
	{
		fredHealth -= lossRate;
		if (fredHealth <= 00 && !endOfMission.GetComponent("TrigTest").beenHit)
		{
			Debug.Log("Mission Failed"); //Will need to come back and actually add in a function for failing a mission
			needHthBar = false;
		}
		if (fredHealth <= .5 && .2 < fredHealth) //This is just to change the color of the health bar as it goes down
		{
			healthBarFull = healthBarHalf;
		}
		if (fredHealth <= .2 && 00 < fredHealth) //This is just to change the color of the health bar as it goes down
		{
			healthBarFull = healthNearDeath;
		}
	}
	if (needHthBar && endOfMission.GetComponent("TrigTest").beenHit)
	{
		Debug.Log("Mission Complete!"); //Will need to come back and actually add in a function for completing a mission
		needHthBar = false;
	}
}
function OnGUI()
{
	if (needHthBar)
	{
	    // draw the background:
	    GUI.BeginGroup (new Rect (pos.x, pos.y, size.x, size.y));
	        GUI.Box (Rect (0,0, size.x, size.y),healthBarEmpty);
	
	        // draw the filled-in part:
	        GUI.BeginGroup (new Rect (0, 0, size.x * fredHealth, size.y)); //All this is doing is scaling the full health texture in the x axis
	            GUI.Box (Rect (0,0, size.x, size.y),healthBarFull);
	        GUI.EndGroup ();
	
	    GUI.EndGroup ();
	}
} 
