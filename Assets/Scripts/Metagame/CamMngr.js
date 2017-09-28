// *** = 'gets set by script that calls this function into action'
var targets: Transform[]; //This is where we'll be panning the camera to; ***
var waitTime : float; //This is the amount of time we will wait at each point we pan to before continuing; ***
var moveTime : float;  //Set this in the Inspector to determine how long it should take to pan from point to point; ***
private var tranTime : float; //This is just to monitor movement of camera; Gets set to 00 at beginning of 'PanCam()'
var start : Transform; //This is the transform prefab that will be instantiated to mark beginning and end of pan;Set in Inspector
private var mainCamera : GameObject; //The camera we are moving; Gets set by function 'PanCam()'
private var daPlayer : GameObject; //The player; Gets set by function 'PanCam()'
private var startPan : Transform; //Gets set to the position the camera is at when 'PanCam()' function is called
private var endPan : Transform;   //Gets set to the position of the last point the cam pans to in the targets array
private var charMngr: GameObject; //The character manager
private var donePanning = false; //***
private var pannedBack = false; //***
private var pannedOnce = false; //***
private var weSet = false;
private var setStart = false;
private var letSwitch = true;
private var pointA : Transform;
private var pointB : Transform;
private var i : int = 0;
private var t : float = 0.0;
private var letSkip = true;
private var updatePan = false; //This is the boolean the starts the whole process; ***
private var skipPan = false;
function Start () 
{
    charMngr = GameObject.FindWithTag("Character");
}
function Update ()
{
	if (updatePan)
	{
		if (letSkip)
		{
			skipPan = true;
		}
		PanCam();
	}
	if (skipPan)
	{
		if (Input.GetButtonUp("Next") && weSet)
		{
			donePanning = true;
			skipPan = false;
		}
	}
	
}

function PanCam()
{
	if (!weSet)
	{
	    tranTime = 00;
	    i = 0;
	    t = 00;
	    donePanning = false;
	    pannedBack = false;
	    pannedOnce = false;
	    charMngr.GetComponent("ChrMngr").canSwitch = false;
	    daPlayer = charMngr.GetComponent("ChrMngr").curGuy;
	    daPlayer.GetComponent("ThirdPersonController").enabled = false;
	    mainCamera = daPlayer.transform.Find("Camera").gameObject;
	    mainCamera.GetComponent(CameraScript).enabled = false;
	    if (!setStart)
	    {
	    	startPan = Instantiate(start, mainCamera.transform.position, mainCamera.transform.rotation);
	    }
	    else if (setStart)
	    {
	    	startPan = Instantiate(start, Vector3(daPlayer.transform.position.x, mainCamera.transform.position.y, daPlayer.transform.position.z), mainCamera.transform.rotation);
	    	Debug.Log(startPan.position);
	    	Debug.Log(daPlayer.transform.position);
	    }
	    endPan = Instantiate(start, targets[targets.length-1].position, targets[targets.length-1].rotation);
	    weSet = true;
    }
    if (!donePanning && weSet)
	{
			if (!pannedOnce) //This is to make sure we first pan the camera from its original position/rotation when it hits the trigger
			{
				pointA = targets[i];
				tranTime += Time.deltaTime;
				mainCamera.transform.position = Vector3.Lerp(startPan.position, pointA.position, tranTime/moveTime);
				mainCamera.transform.rotation = Quaternion.Slerp(startPan.rotation, pointA.rotation, tranTime/moveTime);
				//mainCamera.transform.position != endPan.position
				if (tranTime >= moveTime && targets.Length != 1)
				{
					t += Time.deltaTime;
					if (t >= waitTime)
					{
						tranTime = 00;
						pannedOnce = true;
						t = 00;
					}
				}
				//mainCamera.transform.position == endPan.position
				if (tranTime >= moveTime && targets.Length == 1) //If this is the last pan point/we're only panning once...
				{
					t += Time.deltaTime;
					if (t >= waitTime)
					{
						tranTime = 00;
						donePanning = true; //...we're done panning
					}
				}
			}
			if (pannedOnce && !donePanning) //This is the loop for panning to each point after the initial one in the array (if necessary)
			{
				pointA = targets[i];
				pointB = targets[i+1];
				tranTime += Time.deltaTime;
				mainCamera.transform.position = Vector3.Lerp(pointA.position, pointB.position, tranTime/moveTime);
				mainCamera.transform.rotation = Quaternion.Slerp(pointA.rotation, pointB.rotation, tranTime/moveTime);
				if (tranTime >= moveTime && mainCamera.transform.position != endPan.position)
				{
					t += Time.deltaTime;
					if (t >= waitTime)
					{
						i +=1;
						tranTime = 00;
						t = 00;
					}
				}
				if (tranTime >= moveTime && mainCamera.transform.position == endPan.position)
				{
					t += Time.deltaTime;
					if (t >= waitTime)
					{
						tranTime = 00;
						t = 00;
						donePanning = true;
					}
				}
			}
	}
	if (donePanning && !pannedBack)
	{
		tranTime += Time.deltaTime;
		mainCamera.transform.position = Vector3.Lerp(endPan.position, startPan.position, tranTime/moveTime);
		mainCamera.transform.rotation = Quaternion.Slerp(endPan.rotation, startPan.rotation, tranTime/moveTime);
		if (tranTime > moveTime)
		{
			pannedBack = true;
			//tranTime = 00;
		}
	}
	if (donePanning && pannedBack)
	{
		 daPlayer.GetComponent("ThirdPersonController").enabled = true;
		 if (letSwitch)
		 {
		 	charMngr.GetComponent("ChrMngr").canSwitch = true;
		 }
		 mainCamera.GetComponent(CameraScript).enabled = true;
		 charMngr.GetComponent("ChrMngr").wePlayin = true;
		 setStart = false;
		 letSkip = true;
		 skipPan = false;
		 weSet = false;
		 updatePan = false;
	}		
}