var triggerToActivate : GameObject; //The trigger that will be activated after the pan has been completed
var moveTime : float;  //Set this in the Inspector to determine how long it should take to pan from point to point
var start : Transform; //This is the transform prefab that will be instantiated to mark beginning and end of pan
var targets : Transform[]; //The array of points the camera will be panning to; set in Inspector
var waitTime : float; //This is the amount of time we will wait at each point we pan to before continuing
private var daPlayer : GameObject; //The player
private var startPan : Transform; //Gets set to the position the camera is at when it touches the trigger
private var endPan : Transform;   //Gets set to the position of the last point the cam pans to in the targets array
private var mainCamera : GameObject; //The camera we are moving
private var tranTime : float;
private var updatePan = false; //This determines if we need to be panning the camera or not
private var donePanning = false;
private var pannedBack = false;
private var pannedOnce = false;
private var pointA : Transform;
private var pointB : Transform;
private var i : int = 0;
private var t : float = 0.0;

function Start () 
{
    mainCamera = GameObject.FindWithTag ("MainCamera");
    daPlayer = GameObject.FindWithTag ("Player");
}

function Update ()
{
	if (updatePan)
	{
		var playControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
 	    playControl.enabled = false;
		if (!donePanning)
		{
			if (!pannedOnce) //This is to make sure we first pan the camera from its original position/rotation when it hits the trigger
			{
				pointA = targets[i];
				tranTime += Time.deltaTime;
				mainCamera.transform.position = Vector3.Lerp(startPan.position, pointA.position, tranTime/moveTime);
				mainCamera.transform.rotation = Quaternion.Slerp(startPan.rotation, pointA.rotation, tranTime/moveTime);
				if (tranTime >= moveTime && mainCamera.transform.position != endPan.position)
				{
					t += Time.deltaTime;
					if (t >= waitTime)
					{
						tranTime = 00;
						pannedOnce = true;
						t = 00;
					}
				}
				if (tranTime >= moveTime && mainCamera.transform.position == endPan.position)
				{
					t += Time.deltaTime;
					if (t >= waitTime)
					{
						tranTime = 00;
						donePanning = true;
					}
				}
			}
			if (pannedOnce) //This is the loop for panning to each point after the initial one in the array (if necessary)
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
			if (tranTime >= moveTime)
			{
				pannedBack = true;
				tranTime = 00;
			}
		}
		if (donePanning && pannedBack)
		{
			 mainCamera.GetComponent("SmoothFollow").enabled = true;
 		     playControl.enabled = true;
 	         gameObject.active = false;
 	         triggerToActivate.active = true;
		}		
	}		

}
function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == "Player") 
    {
        tranTime = 00;
        startPan = Instantiate(start, mainCamera.transform.position, mainCamera.transform.rotation);
        endPan = Instantiate(start, targets[targets.length-1].position, targets[targets.length-1].rotation);
        mainCamera.GetComponent("SmoothFollow").enabled = false; //This disables the camera follow script
 	    updatePan = true;
    }
}