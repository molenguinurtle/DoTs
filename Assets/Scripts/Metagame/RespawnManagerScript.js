var nezYell: AudioClip;
var knookYell: AudioClip;
var roScream: AudioClip;
var letSwitch = true;
private var arnezPos : Transform; //This is the spot we'll be respawning Arnez if he falls/dies; updated by triggers throughout dungeon
private var knookPos : Transform; //This is the spot we'll be respawning Knook if he falls/dies; updated by triggers throughout dungeon
private var jethroPos : Transform; //This is the spot we'll be respawning Jethro if he falls/dies; updated by triggers throughout dungeon
private var theHero : GameObject; //Arnez
private var thePatna : GameObject; //Knook
private var theClown : GameObject; //Jethro

function Start ()
{
	theHero = GameObject.FindWithTag("Arnez");
	thePatna = GameObject.FindWithTag("Knook");
	theClown = GameObject.FindWithTag("Jethro");
}

function Update ()
{

}
//These functions are called by the various objects throughout dungeon that count as a fall or death; i.e., the spiked plungers, flaming arrows, and bottomless pits
function ArnezRespawn ()
{
	AudioSource.PlayClipAtPoint(nezYell, arnezPos.position);
	if (theHero.GetComponent(JumpCheck).isJumping)
	{
		theHero.GetComponent(JumpCheck).daJump.GetComponent(JumpScript).canJump = false;
		theHero.GetComponent(ThirdPersonController).enabled = true;
		theHero.GetComponent(JumpCheck).isJumping = false;
	}
	if (letSwitch)
	{
		GameObject.FindWithTag("Character").GetComponent(ChrMngr).canSwitch = true;	
	}
	else if (!letSwitch)
	{
		GameObject.FindWithTag("Character").GetComponent(ChrMngr).canSwitch = false;	
	}
	theHero.transform.position = Vector3.Lerp(theHero.transform.position, arnezPos.position, Time.time);
}
function KnookRespawn ()
{
	if (letSwitch)
	{
		GameObject.FindWithTag("Character").GetComponent(ChrMngr).canSwitch = true;	
	}
	else if (!letSwitch)
	{
		GameObject.FindWithTag("Character").GetComponent(ChrMngr).canSwitch = false;	
	}
	AudioSource.PlayClipAtPoint(knookYell, knookPos.position);
	thePatna.transform.position = Vector3.Lerp(thePatna.transform.position, knookPos.position, Time.time);
}
function JethroRespawn ()
{
	if (letSwitch)
	{
		GameObject.FindWithTag("Character").GetComponent(ChrMngr).canSwitch = true;	
	}
	else if (!letSwitch)
	{
		GameObject.FindWithTag("Character").GetComponent(ChrMngr).canSwitch = false;	
	}
	AudioSource.PlayClipAtPoint(roScream, jethroPos.position);
	theClown.transform.position = Vector3.Lerp(theClown.transform.position, jethroPos.position, Time.time);
}