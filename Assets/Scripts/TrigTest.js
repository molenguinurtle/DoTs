public var triggerToActivate : GameObject;
public var needTimer = false; //Set this to true in inspector to have a timer displayed on screen
public var startTime : float; //This is in seconds and gets set in the Inspector
private var beenHit = false;
private var minutes : float;
private var seconds : float;
private var timeSet = false; //This is set to false so that we can set the starting time of the countdown timer once
private var mainCamera : GameObject;
private var daPlayer : GameObject;

function Start () 
{
    mainCamera = GameObject.FindWithTag ("MainCamera");
    daPlayer = GameObject.FindWithTag ("Player");

}
function Update () 
{
	if (needTimer && !timeSet)
	{
	   //Only want to convert into minutes if we have more than 60 secs
	   if (startTime >= 60.0)
	   {
		   minutes = startTime/60;
	       seconds = startTime-(minutes*60);
	   }
	   else
	   {
		   	minutes = 00;
		   	seconds = startTime;
	   }
       timeSet = true;
	}
    if (needTimer && timeSet)
    {
       startTime -= Time.deltaTime;
	   seconds -= Time.deltaTime;
	   if (seconds <= 00)
	   {
		   minutes -= 1.0;
		   seconds = 59.0;
	   }
	}
	if (startTime <= 00 && !beenHit && needTimer)
	{
	   seconds = 00;
	   minutes = 00;
	   needTimer = false;
	   Debug.Log("Mission Failed");
	}
}

function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == "Player") 
    {
    	beenHit = true;
   		//Deactivate this trigger and activate the next one
   		gameObject.active = false;
   	    triggerToActivate.active = true;	
    }   	
}


function OnGUI()
{
	if (needTimer)
	{
		myTimer = String.Format ("{0:00}:{1:00}",minutes,seconds);
		GUI.Label( Rect(Screen.width/2, Screen.height/10, 300, 50), myTimer);
	}
}