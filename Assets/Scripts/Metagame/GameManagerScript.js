var havePressed = false;
var knook : GameObject;
var arnez : GameObject;
var jethro : GameObject;
var activeGuy : GameObject;
private var endTime : String;
private var t : float;
private var minutes : float;
private var seconds : float;
private var gameStarted = false;
private var gameOver = false;
private var instruct = false;
private var letsPlay = false;
function Update ()
{
	if (!gameStarted && !gameOver)
	{
		activeGuy.SetActiveRecursively(false);		
		instruct = true;
		t += Time.deltaTime;
		if (t>=1)
		{
			letsPlay = true;
			if (Input.GetButtonUp("Fire1"))
			{
				activeGuy.SetActiveRecursively(true);
				t = 00;
				instruct = false;
				letsPlay = false;		
				gameStarted = true;
			}
		}
	}	
	if (gameStarted)
	{
		seconds += Time.deltaTime;
		if (seconds >= 59.0)
		{
			minutes += 1;
			seconds = 00;
		}
		if (Input.GetButtonUp("Change"))
		{
			havePressed = true;
		}
		if (havePressed && activeGuy.gameObject.tag == "Arnez")
		{
			knook.SetActiveRecursively(true);			
			activeGuy = GameObject.FindWithTag("Knook");
			GameObject.FindWithTag("Arnez").gameObject.SetActiveRecursively(false);
			havePressed = false;
		}
		if (havePressed && activeGuy.gameObject.tag == "Knook")
		{
			jethro.SetActiveRecursively(true);			
			activeGuy = GameObject.FindWithTag("Jethro");
			GameObject.FindWithTag("Knook").gameObject.SetActiveRecursively(false);
			havePressed = false;
		}
		if (havePressed && activeGuy.gameObject.tag == "Jethro")
		{
			arnez.SetActiveRecursively(true);			
			activeGuy = GameObject.FindWithTag("Arnez");
			GameObject.FindWithTag("Jethro").gameObject.SetActiveRecursively(false);
			havePressed = false;
		}
	}
	
}
function EndGame()
{
	arnez.SetActiveRecursively(false);
	knook.SetActiveRecursively(false);
	jethro.SetActiveRecursively(false);
	gameOver = true;
	gameStarted = false;
	Debug.Log(endTime);
}
function OnGUI()
{
	if (instruct)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, 300, 100), "Try to complete the dungeon as quickly as possible.");
		GUI.Label( Rect(Screen.width/2, Screen.height/3, 300, 100), "Use WASD to move and SpaceBar to switch characters!");
	}
	if (letsPlay)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/2, 300, 100), "Left Click to begin!");
	}
	if (gameStarted)
	{
		myTimer = String.Format ("{0:00}:{1:00}",minutes,seconds);
		GUI.Label( Rect(Screen.width/2, Screen.height/10, 300, 50), myTimer);
		endTime = myTimer;
	}
	if (gameOver && !gameStarted)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/3, 300, 50), "You completed the dungeon in "+ endTime);
	}
		
}