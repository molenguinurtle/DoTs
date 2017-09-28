var daDoor: GameObject; //This is the final/main door to the stash wit the gold bars; Set in Inspector
var camPnt: Transform[]; //This is where the camera pans to at the beginning and end to look at the door
var leMngr: Component; //This is the character mngr; set in Start()
var leCam: Component; //This is the cam mngr; set in Start()
var leMuzik: Component; //This is the music mngr; set in Start()
var aPic: Texture;
var kPic: Texture;
var jPic: Texture;
var roTxt: GUIStyle;
var nezTxt: GUIStyle;
var knookTxt: GUIStyle;
var sentence1a: String; //The expository first message we show the player
var sentence1b: String; //The controls
var sentence1c: String; //Why switching characters is necessary
var sentence2a: String; //The second message we show the player; explains what each character does
var sentence2b: String; //The second message we show the player; explains what each character does
var sentence2c: String; //The second message we show the player; explains what each character does
var sentence3: String; //"Use these abilities together to navigate through the Dungeon and find the Treasure (Left Click to Begin)"
var sentence4: String; 
var sentence5: String; 
var sentence6: String; 
private var t: float = 00;
private var a: float = 00;
private var u: float = 00;
private var letsGo = false; //This is set to true in Start(); this starts off everything
private var startUs = false;
private var instruct1 = false;
private var instruct2 = false;
private var instruct3 = false;
private var instruct4 = false;
private var firstScreen = true;
private var secondScreen = false;
private var thirdScreen = false;
private var fourthScreen = false;

function Start ()
{
	leMngr = GameObject.FindGameObjectWithTag("Character").GetComponent(ChrMngr);
	leCam = GameObject.FindGameObjectWithTag("Cam").GetComponent(CamMngr);
	leMuzik = GameObject.FindGameObjectWithTag("Muzik").GetComponent(MuzikMngr);
	letsGo = true;
}

function Update ()
{
	if (letsGo && startUs && !leMngr.wePlayin)
	{
		leMngr.curGuy.transform.Find("BlackScreen").renderer.material.color.a -= 1.5*Time.deltaTime;			
		if (leMngr.curGuy.transform.Find("BlackScreen").renderer.material.color.a <= 0)
		{
			leMngr.curGuy.transform.Find("BlackScreen").renderer.enabled = false;
			leMngr.curGuy.transform.Find("BlackScreen").renderer.material.color.a = 1;
			leCam.targets = camPnt;
			leCam.waitTime = 4.0;
			leCam.moveTime = 2.5;
			leCam.letSwitch = true;
			leCam.weSet = false;
			leCam.updatePan = true;
			letsGo = false;
			//startUs = false;
		}
	}

	if (letsGo && !startUs)
	{
			u += Time.deltaTime;
			if (u >= .75)
			{
				if (!instruct4)
				{
					instruct4 = true;
					u = 00;
				}
				else if (instruct4)
				{
					instruct4 = false;
					u = 00;
				}
			}
			leMngr.canSwitch =false;
			leMngr.curGuy.GetComponent(ThirdPersonController).enabled = false;
			leMngr.curGuy.transform.Find("BlackScreen").renderer.enabled = true;			
			if (firstScreen)
			{
				instruct1 = true;
				t += Time.deltaTime;
				if (t >= 7) 
				{
					instruct2 = true;
					a += Time.deltaTime;
					if (a >= 7)  
					{
						instruct3 = true;
						if (Input.GetButtonUp("Next"))
						{
							instruct1 = false;
							instruct2 = false;
							instruct3 = false;
							firstScreen = false;
							secondScreen = true;
						}
					}
				}
			}
			else if (secondScreen)
			{
				if (Input.GetButtonUp("Next"))
				{
					secondScreen = false;
					thirdScreen = true;
				}
			}
			else if (thirdScreen)
			{
				if (Input.GetButtonUp("Next"))
				{
					thirdScreen = false;
					fourthScreen = true;
				}
			}
			else if (fourthScreen)
			{
				if (Input.GetButtonUp("Fire1"))
				{
					fourthScreen = false;
					startUs = true;
				}
				else if (Input.GetButtonUp("Next"))
				{
					fourthScreen = false;
					secondScreen = true;
				}	
			}
			if (Input.GetButtonUp("Fire1"))
			{
				instruct1 = false;
				instruct2 = false;
				instruct3 = false;
				instruct4 = false;
				secondScreen = false;
				thirdScreen = false;
				fourthScreen = false;
				startUs = true;
			}
	
	}
	if (leMngr.wePlayin && !letsGo)
	{
		leMuzik.needSong = true;
		letsGo = true;
	}
}
function OnGUI() //This tells the player how to start playing the game
{
	if (instruct1) 	//Your goal is to blah, and the controls are blah
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/7, Screen.width, Screen.height), sentence1a);
		GUI.Label( Rect(Screen.width/5, Screen.height/7 + Screen.height/20, Screen.width, Screen.height), sentence1b);
		GUI.Label( Rect(Screen.width/5, Screen.height/7 + (2*Screen.height/20), Screen.width, Screen.height), sentence1c);
	}
	
	if (instruct2) 	//Arnez does blah, Jethro does woo, and Knook does haha
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/7+ (3*Screen.height/20), Screen.width, Screen.height), sentence2a, nezTxt);
		GUI.Label( Rect(Screen.width/5, Screen.height/7 + (4*Screen.height/20), Screen.width, Screen.height), sentence2b, roTxt);
		GUI.Label( Rect(Screen.width/5, Screen.height/7+ (5*Screen.height/20), Screen.width, Screen.height), sentence2c, knookTxt);
	}
	if (instruct3) 	//Press 'N' to learn how to use these abilities
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/7 + (6*Screen.height/20), Screen.width, Screen.height), sentence3);
	}
	if (instruct4) //Left Click to get this shit started
	{
		GUI.Label( Rect(Screen.width/2 -(Screen.width/10), Screen.height - Screen.height/20, Screen.width, Screen.height), "Left Click To Begin");
	}
	if (secondScreen) //Showing how to Jump
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/7, Screen.width, Screen.height), sentence4, nezTxt);
  		GUI.DrawTexture(Rect(Screen.width/6, Screen.height/7 + Screen.height/20, Screen.width/1.5, 300), aPic, ScaleMode.ScaleToFit, false, 0);
		GUI.Label( Rect(Screen.width/5, Screen.height/7 + (5*Screen.height/10), Screen.width, Screen.height), "Press 'N' to view Jethro's Swim ability");
	}
	if (thirdScreen) //Showing how to Swim
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/7, Screen.width, Screen.height), sentence5, roTxt);
  		GUI.DrawTexture(Rect(Screen.width/6, Screen.height/7 + Screen.height/20, Screen.width/1.5, 300), jPic, ScaleMode.ScaleToFit, false, 0);
		GUI.Label( Rect(Screen.width/5, Screen.height/7 + (5*Screen.height/10), Screen.width, Screen.height), "Press 'N' to view Knook's Smash ability");
	}
	if (fourthScreen) //Showing how to Smash
	{
		GUI.Label( Rect(Screen.width/5, Screen.height/7, Screen.width, Screen.height), sentence6, knookTxt);
  		GUI.DrawTexture(Rect(Screen.width/6, Screen.height/7 + Screen.height/20, Screen.width/1.5, 300), kPic, ScaleMode.ScaleToFit, false, 0);
		GUI.Label( Rect(Screen.width/5, Screen.height/7 + (5*Screen.height/10), Screen.width, Screen.height), "Press 'N' to view Arnez's Jump ability");
	}

}