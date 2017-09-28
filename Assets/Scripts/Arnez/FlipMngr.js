var daCount: int; //The tally of the number of plats that are grey/the correct/same color
var daNum: int; //This is the amount of plats that need to be lit up/turned grey for that one jump to be active;Set this to
				// the number of plats in room in Inspector
var leJump: GameObject; //The jump that connects mainland to the puzzle
var leChr: Component;
var leCam: Component;
var panPnt: Transform[]; //Set to an empty transform in Inspector that's looking down at the 'KeyJump' gameObject
var firstTimeA = false;
var firstTimeB = true;
private var t: float = 00;
private var needPanA = true;
private var needPanB = true;

function Start ()
{
	leCam = GameObject.FindGameObjectWithTag("Cam").GetComponent(CamMngr);
	leChr = GameObject.FindGameObjectWithTag("Character").GetComponent(ChrMngr);

}
function Update ()
{
	if (leChr.curGuy.tag == "Arnez")
	{
		if (daCount == daNum && firstTimeA)
		{
			t +=Time.deltaTime;
			if (t >= .5 && needPanA)
			{
				leCam.targets = panPnt;
				leCam.waitTime = 1.5;
				leCam.moveTime = 1.5;
				leCam.letSwitch = true;
				leCam.letSkip = false;
				leCam.letSwitch = false;
				leCam.weSet = false;
				leCam.updatePan = true;
				needPanA = false;
			}
			if (t >= 2 && !needPanA)
			{
				leJump.SetActiveRecursively(true);
				t = 00;
				firstTimeA = false;
			}
		}
		if (daCount == daNum && !firstTimeA)
		{
			leJump.SetActiveRecursively(true);
		}
		if (daCount != daNum && !firstTimeB)
		{
			leJump.SetActiveRecursively(false);
		}
		if (daCount != daNum && firstTimeB)
		{
			t +=Time.deltaTime;
			if (t >= .5 && needPanB)
			{
				leCam.targets = panPnt;
				leCam.waitTime = 2;
				leCam.moveTime = 1;
				leCam.letSwitch = true;
				leCam.letSkip = false;
				leCam.letSwitch = false;
				leCam.weSet = false;
				leCam.updatePan = true;
				needPanB = false;
			}
			if (t >= 2 && !needPanB)
			{
				leJump.SetActiveRecursively(false);
				t = 00;
				firstTimeB = false;
			}
		}
	}	
}