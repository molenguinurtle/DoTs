var boxes : GameObject[];
var objectToActivate : GameObject;
var ring : AudioClip;
var deathCount : int;
var deathToll : int;
var endOfGame = false;
function Update ()
{
	if (deathCount == deathToll && !endOfGame)
	{
	    AudioSource.PlayClipAtPoint(ring, transform.position);
		objectToActivate.SetActiveRecursively(true);		
		Destroy (transform.gameObject);
	}
	if (deathCount == deathToll && endOfGame)
	{
		var theEnd : GameManagerScript = GameObject.Find("GameManager").GetComponent("GameManagerScript");
		theEnd.EndGame();
		Destroy(transform.gameObject);
	}
}