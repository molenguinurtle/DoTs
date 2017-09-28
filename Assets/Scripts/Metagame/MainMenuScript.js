var leSteezeA: GUIStyle;
var leSteezeB: GUIStyle;
var nezTxt: GUIStyle;
var roTxt: GUIStyle;
var knookTxt: GUIStyle;
var aPic: Texture;
var jPic: Texture;
var kPic: Texture;
var logo: Texture;
var startPic: Texture;
var controlsPic: Texture;
private var needControl = false;
private var secondScreen = true;
private var thirdScreen = false;
private var fourthScreen = false;

function Update () 
{
	if (!needControl)
	{
		GetComponent.<Camera>().backgroundColor = Color.white;
	}
	if (needControl)
	{
		GetComponent.<Camera>().backgroundColor = Color.black;

		if (secondScreen)
		{
			if (Input.GetButtonUp("Next"))
			{
				secondScreen = false;
				thirdScreen = true;
			}
			else if (Input.GetButtonUp("Change"))
			{
				needControl = false;
			}	
		}
		else if (thirdScreen)
		{
			if (Input.GetButtonUp("Next"))
			{
				thirdScreen = false;
				fourthScreen = true;
			}
			else if (Input.GetButtonUp("Change"))
			{
				needControl = false;
			}	
		}
		else if (fourthScreen)
		{
			if (Input.GetButtonUp("Next"))
			{
				fourthScreen = false;
				secondScreen = true;
			}
			else if (Input.GetButtonUp("Change"))
			{
				needControl = false;
			}	
		}

	}
}
function OnGUI() //This displays the logo and 'start' button and 'controls' button
{
	if (!needControl)
	{
	  	GUI.DrawTexture(Rect(Screen.width/2-(logo.width/4), Screen.height/2-(logo.height/4), logo.width/2, logo.height/2), logo, ScaleMode.ScaleToFit, false, 0);

		if (GUI.Button (Rect (Screen.width/2-(startPic.width/4),Screen.height/2, startPic.width/2, startPic.height/2), startPic, leSteezeA)) //If we press the 'start' button...
		{
	  		Application.LoadLevel (1); //...load the level
		}
		
		if (GUI.Button (Rect (Screen.width/2 - (controlsPic.width/4),Screen.height/2+ Screen.height/5, controlsPic.width/2, controlsPic.height/2), controlsPic, leSteezeB)) //If we press the 'controls' button...
		{
	  		needControl = true; //...load the controls
		}
	}
	if (needControl)
	{
		//Left Click to go back to main menu
		GUI.Label( Rect(Screen.width/2 -(Screen.width/10), Screen.height - Screen.height/20, Screen.width, Screen.height), "Press SpaceBar To Return to Main Menu");

		if (secondScreen) //Showing how to Jump
		{
			GUI.Label( Rect(Screen.width/5, Screen.height/7, Screen.width, Screen.height), "To Jump, simply approach a chasm, and Arnez will Jump across", nezTxt);
	  		GUI.DrawTexture(Rect(Screen.width/6, Screen.height/7 + Screen.height/20, Screen.width/1.5, 300), aPic, ScaleMode.ScaleToFit, false, 0);
			GUI.Label( Rect(Screen.width/5, Screen.height/7 + (5*Screen.height/10), Screen.width, Screen.height), "Press 'N' to view Jethro's Swim ability");
		}
		if (thirdScreen) //Showing how to Swim
		{
			GUI.Label( Rect(Screen.width/5, Screen.height/7, Screen.width, Screen.height), "To Swim, approach any body of water and Left Click", roTxt);
	  		GUI.DrawTexture(Rect(Screen.width/6, Screen.height/7 + Screen.height/20, Screen.width/1.5, 300), jPic, ScaleMode.ScaleToFit, false, 0);
			GUI.Label( Rect(Screen.width/5, Screen.height/7 + (5*Screen.height/10), Screen.width, Screen.height), "Press 'N' to view Knook's Smash ability");
		}
		if (fourthScreen) //Showing how to Smash
		{
			GUI.Label( Rect(Screen.width/5, Screen.height/7, Screen.width, Screen.height), "To Smash, walk up to a yellow box and Left Click", knookTxt);
	  		GUI.DrawTexture(Rect(Screen.width/6, Screen.height/7 + Screen.height/20, Screen.width/1.5, 300), kPic, ScaleMode.ScaleToFit, false, 0);
			GUI.Label( Rect(Screen.width/5, Screen.height/7 + (5*Screen.height/10), Screen.width, Screen.height), "Press 'N' to view Arnez's Jump ability");
		}
	}
}