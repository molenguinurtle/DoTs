var movingTwo = false; //This determines if we need to move two different objects or not
var newPositionA : Vector3; //Set in Inspector as wherever you want objectToMoveA to end up
var newPositionB : Vector3; //Set in Inspector as wherever you want objectToMoveB to end up
var objectToMoveA : GameObject; //Set in Inspector as the first object that you'll be moving
var objectToMoveB : GameObject; //Set in Inspector as the second object that you'll be moving
var moveRate : float; //Set in Inspector for how fast you want to move objectToMoveA and objectToMoveB
//var theSoundA : AudioClip; //Set in Inspector for the sound you want to play while moving objectToMoveA and objectToMoveB
var needToDestroy = false; //Set to true in Inspector if things must be destroyed
var objectToDestroy : GameObject;
var pauseTime: float; //Set in Inspector to however long you want to wait between moving one thing then another 
private var daPlayer : GameObject; //The player
private var isOn = false;
private var doneMovingA = false;
private var doneMovingB = false;
private	var t : float = 00;

function Update ()
{
	if (isOn && !movingTwo)
	{
		MoveSomething();
	}
	if (isOn && movingTwo)
	{
		MoveStuff();
	}
}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Arnez" || other.gameObject.tag == "Jethro" || other.gameObject.tag == "Knook")
	{
		daPlayer = other.gameObject;
		isOn = true;
		//AudioSource.PlayClipAtPoint(theSoundA, objectToMoveA.transform.position);
	}
}

function MoveSomething ()
{
	var distA : float = Vector3.Distance(objectToMoveA.transform.position, newPositionA);
    if(distA > 0 && !doneMovingA)
    {
    	objectToMoveA.transform.position = Vector3.Lerp(objectToMoveA.transform.position, newPositionA, Time.deltaTime*moveRate/distA);
    	if (distA <= 0.0105)
    	{ 
    		doneMovingA = true;
    	}
    }
    if (needToDestroy)
    {
    	objectToDestroy.active = false;
    }
}
function MoveStuff ()
{
	var distA : float = Vector3.Distance(objectToMoveA.transform.position, newPositionA);
	var distB : float = Vector3.Distance(objectToMoveB.transform.position, newPositionB);
    if(distA > 0 && !doneMovingA)
    {
    	objectToMoveA.transform.position = Vector3.Lerp(objectToMoveA.transform.position, newPositionA, Time.deltaTime*moveRate/distA);
    	if (distA <= 0.0105)
    	{
    		doneMovingA = true;
    	}
    }
    if(distB > 0 && doneMovingA && !doneMovingB)
    {
    	t += Time.deltaTime;
    	if (t >= pauseTime)
		{
	    	objectToMoveB.transform.position = Vector3.Lerp(objectToMoveB.transform.position, newPositionB, Time.deltaTime*moveRate/distB);	
	    	if (distB <=0.0105)
	    	{
	    		doneMovingB = true;
	    	}
		}
    }
   	if (needToDestroy)
   	{
   		objectToDestroy.active = false;	    	
   	}
}