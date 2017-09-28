var curGuy: GameObject; //This is so we can keep track of who's currently being controlled
var daGuys: GameObject[]; //This is an array of the 3 character gameobjects; Drag those 3 here in the Inspector w/ Arnez
						  // in the top spot
var doneGuys = new Array();
var leMsg1: String; //This is the message we put onscreen when the player switches to a character that is done and only has 1 key
var leMsg2: String; //This is the message we show when the player has collected 2 keys and switches to one of the characters that already found his
var leMsg3: String; //This is the message we put onscreen when the level is over (all 3 keys collected)
var canSwitch = true; //Gets set to true when characters can be switched
var volOn: Texture;
var volOff: Texture;
var extraSteeze: GUIStyle;
private var i: int = 0; //Used to iterate thru 'daGuys' array
private var e: int = 0; //This helps keep track of who has completed their respective path
private var t: float = 00;
private var seconds: float = 00;
private var minutes: float = 00;
private var endTime : String;
private var sndOn = true;
private var wePlayin = false;
private var needEnd = true;
private var triedSwitch = false;
private var needTimer = true;
var didExtra = false;
private var showMsg1 = false;
private var showMsg2 = false;
private var showMsg3 = false;
private var switchMsg = false;
private var showNo = false; //This gets set to true when the player tries to change characters when they can't

function Update ()
{
	if(canSwitch && e<3 && wePlayin)
	{
		switchMsg = true;
		SwitchGuy();
	}
	if (e>=3 && needEnd)
	{
		EndGame();
	}
	curGuy = daGuys[i];
	if (needTimer && wePlayin)
	{
		seconds += Time.deltaTime;
		if (seconds >= 59.0)
		{
			minutes += 1;
			seconds = 00;
		}
	}
	
	if (!canSwitch)
	{
		switchMsg = false;
	}
	if (!canSwitch && Input.GetButtonUp("Change"))
	{
		triedSwitch = true;
	}
	if (triedSwitch && wePlayin)
	{
		t += Time.deltaTime;
		if (t <= 2.5)
		{
			showNo = true;
		}
		else if (t > 2.5)
		{
			showNo = false;
			t = 00;
			triedSwitch = false;
		}
	}
	if (showMsg3 && Input.GetButtonUp("Quit")) //If we press 'ESC' at end o' game...
	{
		Application.LoadLevel (0);//...load the main menu
	}
}

function SwitchGuy()
{
	if (Input.GetButtonUp("Change"))
	{
		showMsg1 = false;
		showMsg2 = false;
		curGuy.GetComponent("ThirdPersonController").enabled = false;
		curGuy.transform.Find("Camera").gameObject.active = false;
		i+=1;
		if (i>2)
		{
			i=0;
		}
		curGuy = daGuys[i];
		if (doneGuys.length > 0)
		{
			if (doneGuys.length == 1)
			{
				if (curGuy == doneGuys[0])
				{
					curGuy.SetActiveRecursively(true);
					showMsg1 = true;
				}
				else if (curGuy != doneGuys[0])
				{
					curGuy.GetComponent("ThirdPersonController").enabled = true;
					curGuy.SetActiveRecursively(true);
				}
			}
			else if (doneGuys.length == 2)
			{
				if (curGuy == doneGuys[0] || curGuy == doneGuys[1])
				{
					curGuy.SetActiveRecursively(true);
					showMsg2 = true;
				}
				else if (curGuy != doneGuys[0] || curGuy !=doneGuys[1])
				{
					curGuy.GetComponent("ThirdPersonController").enabled = true;
					curGuy.SetActiveRecursively(true);
				}
			}
		}
		else if (doneGuys.length <= 0)
		{
			curGuy.GetComponent("ThirdPersonController").enabled = true;
			curGuy.SetActiveRecursively(true);
		}
	}
}

function EndGame()
{
	GameObject.FindGameObjectWithTag("Muzik").GetComponent(MuzikMngr).needSong = false;
	GameObject.FindGameObjectWithTag("Muzik").GetComponent(MuzikMngr).needFinal = true;
	GameObject.FindGameObjectWithTag("Muzik").GetComponent.<AudioSource>().volume = 1;
	needTimer = false;
	canSwitch = false;
	curGuy.GetComponent("ThirdPersonController").enabled = false;
	curGuy.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = true;
	showMsg3 = true;
	needEnd = false;
}
function OnGUI() //This tells the player what just happened once he/she runs into this trigger
{
	if (showMsg1) //This is the 'Oh Congrats, you grabbed one key! Now go find the other 2, ya bish! (Spacebar to continue)' msg
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leMsg1);
	}
	if (showMsg2) //This is the 'Oh Congrats, you grabbed another key! Now go find the last one, ya bish! (Spacebar to continue)' msg
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leMsg2);
	}
	if (showMsg3) //This is the 'Congratulations, you grabbed all the keys and opened the door to the stash! You win!' msg
	{
		if (!didExtra)
		{
			GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leMsg3);
			myTimer = String.Format ("{0:00}:{1:00}",minutes,seconds);
			endTime = myTimer;
			GUI.Label( Rect(Screen.width/2-Screen.width/4, Screen.height/4, Screen.width, Screen.height), "COMPLETION TIME: "+ endTime);
			GUI.Label( Rect(Screen.width/2 -(Screen.width/10), Screen.height - Screen.height/20, Screen.width, Screen.height), "Press 'Esc' to Exit to Main Menu");
		}
		else if (didExtra) //If we completed the extra room, render the text using the 'extraSteeze' guiStyle
		{
			GUI.Label( Rect(Screen.width/5, Screen.height/5, Screen.width, Screen.height), leMsg3, extraSteeze);
			myTimer = String.Format ("{0:00}:{1:00}",minutes,seconds);
			endTime = myTimer;
			GUI.Label( Rect(Screen.width/2-Screen.width/4, Screen.height/4, Screen.width, Screen.height), "COMPLETION TIME: "+ endTime, extraSteeze);
			GUI.Label( Rect(Screen.width/2 -(Screen.width/10), Screen.height - Screen.height/20, Screen.width, Screen.height), "Press 'Esc' to Exit to Main Menu", extraSteeze);	
		}
	}
	if (showNo) //This simply tells the player that he/she can't switch characters right now
	{
		GUI.Label( Rect(Screen.width/3, Screen.height/2, Screen.width, Screen.height), "You can't switch characters right now!!!");
	}
	
	if (switchMsg)
	{
		GUI.Label( Rect(Screen.width/2- (Screen.width/10), Screen.height/5 - (2*Screen.height/10), Screen.width/5, Screen.height/5), "Press SPACEBAR to Switch Characters");
	}
	
	if (needTimer && wePlayin)
	{
		myTimer = String.Format ("{0:00}:{1:00}",minutes,seconds);
		GUI.Label( Rect(Screen.width/2-(Screen.width/30), Screen.height/5 - (Screen.height/10), Screen.width/15, Screen.height/5), myTimer);
	}
	if (sndOn && wePlayin && e<3)
	{
		if (GUI.Button (Rect (10,10,75,75), volOn, extraSteeze)) 
		{
			GameObject.FindGameObjectWithTag("Muzik").GetComponent.<AudioSource>().volume = 0;
			sndOn = false;
		}
	}
	if (!sndOn && wePlayin && e<3)
	{
		if (GUI.Button (Rect (10,10,75,75), volOff, extraSteeze)) 
		{
			GameObject.FindGameObjectWithTag("Muzik").GetComponent.<AudioSource>().volume = 1;
			sndOn = true;
		}
	}
}