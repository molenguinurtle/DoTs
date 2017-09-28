var ceilings : GameObject[]; //This is the array of ceilings that are going to fall on the player; Set in Inspector
var ceilSpds : float[]; //This is the array of speeds that the ceilings will fall at; Set in Inspector
var fallPnt : Transform; //This is the spot the ceilings are dropping to; They will disappear at this point
var leInitializer : GameObject; //In Inspector, drag the switch that starts the puzzle to this slot
var fallSnd : AudioClip; //In Inspector, drag the sound you want for the ceiling starting to fall here
private var isOn = false; //This gets set to true by the switch the player steps on to start this puzzle
private var daCeil : GameObject; //This is just a variable to keep track of which ceiling is currently falling; May not be necessary
private var i : int = 0;
private var ceilSet = false;
function Update () 
{
	if (isOn)
	{
		if (!ceilSet)
		{
			ceilings[i].SetActiveRecursively(true);
			daCeil = ceilings[i];
			AudioSource.PlayClipAtPoint(fallSnd, transform.position);
			ceilSet = true;
		}
		var distA : float = Vector3.Distance(daCeil.transform.position, fallPnt.position);
		if (distA > 0 && ceilSet)
		{
		    daCeil.transform.position = Vector3.Lerp(daCeil.transform.position, fallPnt.position, Time.deltaTime*ceilSpds[i]/distA);
		}
		if (distA <= 0.01)
		{
			ceilings[i].SetActiveRecursively(false);
			if (i != ceilings.Length-1)
			{
				ceilSet = false;
				i += 1;
			}
			else if (i == ceilings.Length-1)
			{
				isOn = false;
				leInitializer.GetComponent("FallingCeilInit").puzzleDone = true;
			}
		}

	}
}