//Basically this script will say 'OnTriggerEnter', if the player presses left click, tell the object with 'ShellGameCheck'
// attached to it that a. this box is 'theChoice'; b. needCheck is true
// The rest should be handled by the ShellGameCheck script
var leChecker : GameObject; //Drag the object w/ 'ShellGameCheck' attached to it here in the Inspector
var flashClr: Material; //The color we flash the box to be real quick to indicate it's the correct choice
var origClr: Material; //the original color of the box; Set in Inspector
var isPlaying = false;
var first = false;
var second = false;
var third = false;
private var canChoose = false;
private var oYeah = false;
private var t: float = 00;
private var count: int = 0;
function Update () 
{
	if (canChoose)
	{
		MakeChoice();
	}
	
	if (oYeah)
	{
		ItsAMe();
	}
}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Knook" && isPlaying) 
	{
		canChoose = true;
	}

}
function OnTriggerExit (other : Collider)
{
	if (other.gameObject.tag == "Knook" && isPlaying)
	{
		canChoose = false;
	}
}

function MakeChoice()
{
	if (Input.GetButtonUp ("Fire1"))
	{
		leChecker.GetComponent("ShellGameCheck").theChoice = transform.parent.gameObject;
		leChecker.GetComponent("ShellGameCheck").needCheck = true;
		canChoose = false;
	}
}

function ItsAMe()
{
	
		t += Time.deltaTime;
		if (t >= 1.0 && count == 0)
		{
			transform.parent.gameObject.GetComponent.<Renderer>().material = flashClr;
			count +=1;
			t = 00;
		}
		if (t >= 1.0 && count == 1)
		{
			transform.parent.gameObject.GetComponent.<Renderer>().material = origClr;
			count +=1;
			t = 00;
		}
		if (t >= 1.0 && count == 2)
		{
			transform.parent.gameObject.GetComponent.<Renderer>().material = flashClr;
			count +=1;
			t = 00;
		}
		if (t >= 1.0 && count == 3)
		{
			transform.parent.gameObject.GetComponent.<Renderer>().material = origClr;
			count =0;
			t = 00;
			oYeah = false;
		}
		
}

function OnGUI() //This tells the player the button to press to choose the box in question
{
	if (canChoose &&  first && !second && !third)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to choose this box! You only get 3 Guesses though!");
	}
	if (canChoose &&  !first && second && !third)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to choose this box! You only get 2 Guesses though!");
	}
	if (canChoose &&  !first && !second && third)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to choose this box! You only get 1 Guess though!");
	}
}