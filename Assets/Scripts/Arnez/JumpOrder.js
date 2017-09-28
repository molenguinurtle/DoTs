//NOTE: All this script does is show the player the order they should jump on the platforms. Also, when the player
// has jumped through one set, we tell this script, and it shows the next set.
var jumpsA : GameObject[]; //The first array of triggers that the player needs to jump to; Set to the desired order in Inspector
var jumpsB : GameObject[]; //The second array of triggers that the player needs to jump to; Set to the desired order in Inspector
var jumpsC : GameObject[]; //The third array of triggers that the player needs to jump to; Set to the desired order in Inspector
var jmpTrgs : GameObject[]; //This is the array of 'jumpStart' triggers in the 'jumpOrder' room; Set in Inspector
var pans : Transform[];
var death : GameObject; //This is the 'DeathPit' gameobject in 'jumpOrder' room; Set in Inspector
var waitTimeA : float; //This is the amount of time we will show each jump point before continuing [jumpsA]
var waitTimeB : float; //This is the amount of time we will show each jump point before continuing [jumpsB]
var waitTimeC : float; //This is the amount of time we will show each jump point before continuing [jumpsC]
var completedA = false; //This is the variable we set to true once jumpsA has been successfully completed
var completedB = false; //This is the variable we set to true once jumpsB has been successfully completed
var completedC = false; //This is the variable we set to true once jumpsC has been successfully completed
var leDoor: GameObject; //The door we open once this puzzle is completed
var trigSnd: AudioClip; //The sound we play when the trig is run into
private var daPlayer : GameObject; //The player
private var isOn = false;
private var isPlaying = false;
private var i : int = 0;
private var t : float = 0.0;
private var q : float = 00;
private var shownA = false;
private var shownB = false;
private var shownC = false;
private var needPan = true;


function Update ()
{
	//Showing the order of the first set of jumps
	if (isOn && !completedA && !completedB && !isPlaying)
	{
		for (var trg in jmpTrgs)
		{
			trg.GetComponent(JumpScript).needSwitch = false;
		}
		death.GetComponent(RespawnScript).needSwitch = false;
		if (!shownA)
		{
			t += Time.deltaTime;
			if (jumpsA[i] != jumpsA[jumpsA.length-3])
			{
				jumpsA[i].active = true;
				jumpsA[i].GetComponent.<Renderer>().enabled = true;
				if (t >= waitTimeA)
				{
					jumpsA[i].GetComponent.<Renderer>().enabled = false;
					i +=1;
					t = 00;
				}
			}
			if (jumpsA[i] == jumpsA[jumpsA.length-3])
			{
				if (t >= waitTimeA)
				{
					t = 00;
					i = 0;
					jumpsA[6].active = true;
					jumpsA[7].active = true;
					jumpsA[8].active = true;
					shownA = true;
					isPlaying = true;
					isOn = false;
				}
			}
			else if (Input.GetButtonUp("Next")) //If we skip the camera pan
			{
				for (var jmpA in jumpsA)
				{
					if (jmpA.GetComponent.<Renderer>() != null)
					{
						jmpA.GetComponent.<Renderer>().enabled = false;
					}
					jmpA.active = true;
				}
				t = 00;
				i = 0;
				jumpsA[6].active = true;
				jumpsA[7].active = true;
				jumpsA[8].active = true;
				shownA = true;
				isPlaying = true;
				isOn = false;
			}
		}	
	}
	//Showing the order of the second set of jumps
	if (isOn && completedA && !completedB && !isPlaying)
	{
	 	q += Time.deltaTime;
		if (needPan && q >= .5)
		{
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").targets = pans;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").waitTime = 12.25;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").moveTime = 1;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").letSwitch = false;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").weSet = false;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").updatePan = true;
	 	 	needPan = false;
	 	}
		if (!shownB && !needPan)
		{

			t += Time.deltaTime;
			if (jumpsB[i] != jumpsB[jumpsB.length-3])
			{
				jumpsB[i].active = true;
				jumpsB[i].GetComponent.<Renderer>().enabled = true;
				if (t >= waitTimeB)
				{
					jumpsB[i].GetComponent.<Renderer>().enabled = false;
					i +=1;
					t = 00;
				}
			}
			if (jumpsB[i] == jumpsB[jumpsB.length-3])
			{
				jumpsB[1].active = false;
				jumpsB[4].active = false;
				if (t >= waitTimeB)
				{
					t = 00;
					i = 0;
					jumpsB[7].active = true;
					jumpsB[8].active = true;
					jumpsB[9].active = true;
					shownB = true;
					isPlaying = true;
					needPan =true;
					q = 00;
					isOn = false;
				}
			}
			else if (Input.GetButtonUp("Next")) //If we skip the camera pan
			{
				for (var jmpB in jumpsB)
				{
					if (jmpB.GetComponent.<Renderer>() != null)
					{
						jmpB.GetComponent.<Renderer>().enabled = false;
					}
					jmpB.active = true;
				}
				jumpsB[1].active = false;
				jumpsB[4].active = false;
				t = 00;
				i = 0;
				jumpsB[7].active = true;
				jumpsB[8].active = true;
				jumpsB[9].active = true;
				shownB = true;
				isPlaying = true;
				needPan =true;
				q = 00;
				isOn = false;
			}
		}	
	}
	//Showing the order of the last/third set of jumps
	if (isOn && completedA && completedB && !isPlaying)
	{
	 	q += Time.deltaTime;
		if (needPan && q >= .5)
		{
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").targets = pans;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").waitTime = 12;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").moveTime = 1;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").letSwitch = false;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").weSet = false;
	 	    GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr").updatePan = true;
	 	 	needPan = false;
	 	}
		if (!shownC && !needPan)
		{
			t += Time.deltaTime;
			if (jumpsC[i] != jumpsC[jumpsC.length-1])
			{
				jumpsC[i].active = true;
				jumpsC[i].GetComponent.<Renderer>().enabled = true;
				if (t >= waitTimeC)
				{
					jumpsC[i].GetComponent.<Renderer>().enabled = false;
					i +=1;
					t = 00;
				}
			}
			if (jumpsC[i] == jumpsC[jumpsC.length-1])
			{
				jumpsC[7].active = false;
				if (t >= waitTimeC)
				{
					t = 00;
					i = 0;
					jumpsC[8].active = true;
					shownC = true;
					isPlaying = true;
					needPan = true;
					q = 00;
					isOn = false;
				}
			}
			else if (Input.GetButtonUp("Next")) //If we skip the camera pan
			{
				for (var jmpC in jumpsC)
				{
					if (jmpC.GetComponent.<Renderer>() != null)
					{
						jmpC.GetComponent.<Renderer>().enabled = false;
					}
					jmpC.active = true;
				}
				jumpsC[7].active = false;
				t = 00;
				i = 0;
				jumpsC[8].active = true;
				shownC = true;
				isPlaying = true;
				needPan = true;
				q = 00;
				isOn = false;
			}
		}	
	}
	if (completedA && completedB && completedC)
	{
		for (var trg in jmpTrgs)
		{
			trg.GetComponent(JumpScript).needSwitch = true;
		}
		death.GetComponent(RespawnScript).needSwitch = true;
		GameObject.FindGameObjectWithTag("Door").GetComponent("DoorMngr").daDoor = leDoor;
		GameObject.FindGameObjectWithTag("Door").GetComponent("DoorMngr").needOpen = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		Destroy(this); //We no longer need this trigger once the puzzle's been completed so destroy it
	}

}

function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == "Arnez" && !isOn) 
    {
    	AudioSource.PlayClipAtPoint(trigSnd, transform.position);
		daPlayer = other.gameObject;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		GetComponent.<Renderer>().enabled = false;
 	    isOn = true;
 	    shownA = false;
 	    shownB = false;
 	    shownC = false;
 	    i = 00;
    }
}