public var triggerToActivate : GameObject;
public var needTimer = false; //Set this to true in inspector to have a timer displayed on screen
public var startTime : float; //This is in seconds and gets set in the Inspector
public var beenHit = false;
public var needPan = false; //Set this to true in inspector to pan the camera when trigger is entered
private var minutes : float;
private var seconds : float;
private var timeSet = false; //This is set to false so that we can set the starting time of the countdown timer once
private var mainCamera : GameObject;
private var daPlayer : GameObject;
var startOfPan : Transform;
var endOfPan : Transform;
var moveTime : float; //Set this in editor to determine how long you want it to take camera to move from spot to spot
private var tranTime : float;
private var updatePan = false;
private var havePannedA = false;
private var havePannedB = false;
var targets : Transform[]; //Just seeing if we could set up an array of points we want the PanCam to look at; Could be epic iterating through it

function Start () 
{
    mainCamera = GameObject.FindWithTag ("MainCamera");
    daPlayer = GameObject.FindWithTag ("Player");

}
function Update () 
{
	if (updatePan)
	{
		//So basically we're gonna try doing this camera pan a different way. We're going to activate another camera
		//once we hit this trigger. That camera will pull the mainCamera's transform as its startOfPan and since we
		//won't actually be moving the mainCamera, that position will never change. So then we'll basically do what
		//I've already written here but just in another script and on a seperate object(PanCam), and all this script will do is
		//tell that camera when to activate/instantiate the PanCam prefab accordingly. We will probably just make the PanCam
		//a prefab because it'll allow us to re-use the same thing with various variables. Also, we'll look into trying
		//to write into the PanCam script the ability to pan to/between more than 2 points. Should be much easier with the
		//initialPan position not moving (because we're pulling it from an inactive MainCamera). Yeah I like this.
		var playControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
 	    playControl.enabled = false;
		if (!havePannedA)
		{
			tranTime += Time.deltaTime;
			mainCamera.transform.position = Vector3.Lerp(startOfPan.position, endOfPan.position, tranTime/moveTime);
			if (tranTime >= moveTime)
			{
				havePannedA = true;
				tranTime = 00;
			}
		}
		if (havePannedA && !havePannedB)
		{
			tranTime += Time.deltaTime;
			mainCamera.transform.position = Vector3.Lerp(endOfPan.position, gameObject.transform.position, tranTime/moveTime);
			if (tranTime >= moveTime)
			{
				havePannedB = true;
				tranTime = 00;
			}
		}
		if (havePannedA && havePannedB)
		{
			 mainCamera.GetComponent("SmoothFollow").enabled = true;
 		     playControl.enabled = true;
 	         gameObject.active = false;
 	         triggerToActivate.active = true;
		}		
	}		
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
    	if (needPan)
    	{
    		//var theDistanceA = Vector3.Distance(startOfPan.position, endOfPan.position);
            tranTime = 00;
            startOfPan = mainCamera.transform;
 	        mainCamera.GetComponent("SmoothFollow").enabled = false; //This disables the camera follow script
    		updatePan = true;
    	}
    	if (!needPan)
    	{
    		//Deactivate this trigger and activate the next one
    		gameObject.active = false;
    	    triggerToActivate.active = true;
    	}
    		
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