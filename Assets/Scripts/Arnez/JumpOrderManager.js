var jumpsA : GameObject[]; //The first array of triggers that the player needs to jump to; Set to the desired order in Inspector;
						   //Should match the order of the array set on the jump order trigger
var jumpsB : GameObject[]; //The second array of triggers that the player needs to jump to; Set to the desired order in Inspector;
						   //Should match the order of the array set on the jump order trigger
var jumpsC : GameObject[]; //The third array of triggers that the player needs to jump to; Set to the desired order in Inspector;
						   //Should match the order of the array set on the jump order trigger
var jumpTrig : GameObject; //In the Inspector, drag the jumpOrder trig to this slot
var camTrig: GameObject; //In Inspector, drag the camPan trig to this slot
var failSnd: AudioClip; //In Inspector, drag the 'Wrong!' audioclip to this slot
var goodSnd: AudioClip; //In Inspector, drag the 'Bell' audioclip to this slot
private var hasJumpedA = false;
private var hasJumpedB = false;
private var hasJumpedC = false;
private var i: int = 0;
function Update ()
{
}

function Yep(setNum: int) //This function is only run if the player hit the correct trigger; otherwise, we run 'Nope()'
{
	if (setNum == 1) //JumpsA
	{
		if (jumpsA[i] == jumpsA[jumpsA.length-1]) //If this is the last jump in the set...
		{
			jumpsA[i].active = false;
			i = 0;
			for (var jmpA in jumpsA) //This is disabling all of jumpsA before we move on to jumpsB
			{
    			jmpA.active = false;
			}
			jumpTrig.GetComponent("JumpOrder").jumpsA[6].active = false;
			jumpTrig.GetComponent("JumpOrder").jumpsA[7].active = false;
			jumpTrig.GetComponent("JumpOrder").jumpsA[8].active = false;
			jumpTrig.GetComponent("JumpOrder").completedA = true; //Telling JumpOrder that we completed jumpsA so it can start showing jumpsB
			jumpTrig.GetComponent("JumpOrder").isOn = true;
			jumpTrig.GetComponent("JumpOrder").isPlaying = false;
		}
		if (jumpsA[i] != jumpsA[jumpsA.length-1] && !jumpTrig.GetComponent("JumpOrder").completedA && jumpTrig.GetComponent("JumpOrder").isPlaying) //Essentially, we only add 1 to i if we aren't done with the array yet
		{
			i+=1;
			jumpsA[i].GetComponent("JumpOrderCheckScript").correct = true;
		}
		AudioSource.PlayClipAtPoint(goodSnd, transform.position);
	}
	
	if (setNum == 2) //JumpsB
	{
		jumpsB[1].active = true;
		if (jumpsB[i] == jumpsB[jumpsB.length-1]) //If this is the last jump in the set... 
		{
			jumpsB[i].active = false;
			i = 0;
			for (var jmpB in jumpsB) //This is disabling all of jumpsB before we move on to jumpsB
			{
    			jmpB.active = false;
			}
			jumpTrig.GetComponent("JumpOrder").jumpsB[7].active = false;
			jumpTrig.GetComponent("JumpOrder").jumpsB[8].active = false;
			jumpTrig.GetComponent("JumpOrder").jumpsB[9].active = false;
			jumpTrig.GetComponent("JumpOrder").completedB = true; //Telling JumpOrder that we completed jumpsB so it can start showing jumpsC
			jumpTrig.GetComponent("JumpOrder").isOn = true;
			jumpTrig.GetComponent("JumpOrder").isPlaying = false;
		}
		else if (jumpsB[i] != jumpsB[jumpsB.length-1] && !jumpTrig.GetComponent("JumpOrder").completedB && jumpTrig.GetComponent("JumpOrder").isPlaying) //Essentially, we only add 1 to i if we aren't done with the array yet
		{
			i+=1;
			if (i >= 4)
			{
				jumpsB[4].active = true;
				jumpsB[2].active = false;
			}
			jumpsB[i].GetComponent("JumpOrderCheckScript").correct = true;
		}
		AudioSource.PlayClipAtPoint(goodSnd, transform.position);
	}
	
	if (setNum == 3) //JumpsC
	{
		jumpsC[7].active = true;
		if (jumpsC[i] == jumpsC[jumpsC.length-1])
		{
			i = 0;
			for (var jmpC in jumpsC) //This is disabling all of jumpsC
			{
			    jmpC.active = false;
				jmpC.GetComponent("JumpOrderCheckScript").correct = false;
			}
			jumpTrig.GetComponent("JumpOrder").jumpsC[8].active = false;
			jumpTrig.GetComponent("JumpOrder").completedC = true; //Telling JumpOrder that we completed jumpsC so it can destroy itself
			jumpTrig.GetComponent("JumpOrder").isPlaying = false;
		}
		if (jumpsC[i] != jumpsC[jumpsC.length-1] && !jumpTrig.GetComponent("JumpOrder").completedC && jumpTrig.GetComponent("JumpOrder").isPlaying) //Essentially, we only add 1 to i if we aren't done with the array yet
		{
			i+=1;
			jumpsC[i].GetComponent("JumpOrderCheckScript").correct = true;
		}
		AudioSource.PlayClipAtPoint(goodSnd, transform.position);
	}
}

function Nope(setNum: int) //This function is only run if the player DIDN'T hit the correct trigger; otherwise, we run 'Yep()'
{
	if (setNum == 1) //JumpsA
	{
		AudioSource.PlayClipAtPoint(failSnd, transform.position);
		i = 0;
		for (var jmpA in jumpsA) //This is disabling all of jumpsA because the player failed and will need to step back on le switch
		{
			jmpA.active = false;
			jmpA.GetComponent("JumpOrderCheckScript").correct = false;
		}
		for (var trg in jumpTrig.GetComponent("JumpOrder").jmpTrgs)
		{
			trg.GetComponent(JumpScript).needSwitch = true;
		}
		jumpTrig.GetComponent("JumpOrder").jumpsA[6].active = false;
		jumpTrig.GetComponent("JumpOrder").jumpsA[7].active = false;
		jumpTrig.GetComponent("JumpOrder").jumpsA[8].active = false;
		jumpTrig.GetComponent("JumpOrder").death.GetComponent(RespawnScript).needSwitch = true;
		jumpTrig.GetComponent("JumpOrder").isPlaying = false;
		jumpTrig.GetComponent("JumpOrder").q = 00;
		jumpTrig.GetComponent("JumpOrder").needPan = true;
		jumpTrig.GetComponent.<Renderer>().enabled = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		camTrig.transform.GetComponent.<Collider>().isTrigger = true;
		jumpsA[i].GetComponent("JumpOrderCheckScript").correct = true;
		jumpsB[i].GetComponent("JumpOrderCheckScript").correct = true;
		jumpsC[i].GetComponent("JumpOrderCheckScript").correct = true;
		jumpsA[jumpsA.length-1].GetComponent("JumpOrderCheckScript").correct = false;
		jumpsB[jumpsB.length-1].GetComponent("JumpOrderCheckScript").correct = false;
		jumpsC[jumpsC.length-1].GetComponent("JumpOrderCheckScript").correct = false;
	}
	
	if (setNum == 2) //JumpsB
	{
		AudioSource.PlayClipAtPoint(failSnd, transform.position);
		i = 0;
		for (var jmpB in jumpsB) //This is disabling all of jumpsB because the player failed and will need to step back on le switch
		{
			jmpB.GetComponent("JumpOrderCheckScript").correct = false;
			jmpB.active = false;
		}
		for (var trg in jumpTrig.GetComponent("JumpOrder").jmpTrgs)
		{
			trg.GetComponent(JumpScript).needSwitch = true;
		}
		jumpTrig.GetComponent("JumpOrder").jumpsB[7].active = false;
		jumpTrig.GetComponent("JumpOrder").jumpsB[8].active = false;
		jumpTrig.GetComponent("JumpOrder").jumpsB[9].active = false;
		jumpTrig.GetComponent("JumpOrder").death.GetComponent(RespawnScript).needSwitch = true;
		jumpTrig.GetComponent("JumpOrder").completedA = false;
		jumpTrig.GetComponent("JumpOrder").isPlaying = false;
		jumpTrig.GetComponent("JumpOrder").q = 00;
		jumpTrig.GetComponent("JumpOrder").needPan = true;
		jumpTrig.GetComponent.<Renderer>().enabled = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		camTrig.transform.GetComponent.<Collider>().isTrigger = true;
		jumpsA[i].GetComponent("JumpOrderCheckScript").correct = true;
		jumpsB[i].GetComponent("JumpOrderCheckScript").correct = true;
		jumpsC[i].GetComponent("JumpOrderCheckScript").correct = true;
		jumpsA[jumpsA.length-1].GetComponent("JumpOrderCheckScript").correct = false;
		jumpsB[jumpsB.length-1].GetComponent("JumpOrderCheckScript").correct = false;
		jumpsC[jumpsC.length-1].GetComponent("JumpOrderCheckScript").correct = false;
	}
	
	if (setNum == 3) //JumpsC
	{
		AudioSource.PlayClipAtPoint(failSnd, transform.position);
		i = 0;
		for (var jmpC in jumpsC) //This is disabling all of jumpsC because the player failed and will need to step back on le switch
		{
			jmpC.GetComponent("JumpOrderCheckScript").correct = false;
			jmpC.active = false;
		}
		for (var trg in jumpTrig.GetComponent("JumpOrder").jmpTrgs)
		{
			trg.GetComponent(JumpScript).needSwitch = true;
		}
		jumpTrig.GetComponent("JumpOrder").jumpsC[8].active = false;
		jumpTrig.GetComponent("JumpOrder").death.GetComponent(RespawnScript).needSwitch = true;
		jumpTrig.GetComponent("JumpOrder").completedA = false;
		jumpTrig.GetComponent("JumpOrder").completedB = false;
		jumpTrig.GetComponent("JumpOrder").isPlaying = false;
		jumpTrig.GetComponent("JumpOrder").q = 00;
		jumpTrig.GetComponent("JumpOrder").needPan = true;
		jumpTrig.GetComponent.<Renderer>().enabled = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		camTrig.transform.GetComponent.<Collider>().isTrigger = true;
		jumpsA[i].GetComponent("JumpOrderCheckScript").correct = true;
		jumpsB[i].GetComponent("JumpOrderCheckScript").correct = true;
		jumpsC[i].GetComponent("JumpOrderCheckScript").correct = true;
		jumpsA[jumpsA.length-1].GetComponent("JumpOrderCheckScript").correct = false;
		jumpsB[jumpsB.length-1].GetComponent("JumpOrderCheckScript").correct = false;
		jumpsC[jumpsC.length-1].GetComponent("JumpOrderCheckScript").correct = false;
	}
}
