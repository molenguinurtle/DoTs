var theWords : GUIText; //Drag the GUI Text gameobject with the phrase you want into this slot in Inspector
private var daPlayer : GameObject;
private var canTalk = false;
private var isTalking = false;
private var goAway = false;
function Update () 
{
	if (canTalk)
	{
		Conversate();
	}
}

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Player")
	{
		daPlayer = other.gameObject;
		canTalk = true;
	}
}

function OnTriggerExit(other : Collider)
{
	if (other.gameObject == daPlayer)
	{
		goAway = false;
		canTalk = false;
	}
}

function Conversate()
{
    var playerControl : ThirdPersonController = daPlayer.GetComponent("ThirdPersonController");
    var speech : SpeechTextScript = theWords.GetComponent("SpeechTextScript");
    if (Input.GetButtonUp ("Fire1"))
    {
    	playerControl.enabled = false;
    	isTalking = true;
    	speech.Speak();
    }
    if (speech.doneTalking)
    {
    	goAway = true;
    	if (Input.GetButtonUp ("Change"))
    	{
    		theWords.GetComponent.<GUIText>().enabled = false;
    		playerControl.enabled = true;
    		goAway = false;
    		isTalking = false;
    		speech.doneTalking = false;
    	}
    }
}
function OnGUI() //This tells the player the button to press to talk to folks
{
	if (canTalk && !isTalking)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to speak with citizen!");
	}
	if (goAway)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Press Space Bar to end conversation!");
	}
}