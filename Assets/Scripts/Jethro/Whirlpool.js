var poolTo : Transform; //In Inspector, set this to an empty tranform gameobject at the place you want the player teleported to
var whoosh : AudioClip; //In Inspector, set this to an audio clip of whirlpooling H2O
var letSwitch = false; //Set to true in Inspector if you want to allow switching after the whirlpooling
private var canPool = false;
private var letsMove = false;
private var daPlayer : GameObject; //The player
private var t : float = 0.0;

function Update () 
{
	//Basically, we want to take player control away, lower Jethro underwater completely out of sight, lerp him to the poolTo spot,
	// and then bring him back up into view; Finally, return player control
	if (canPool && !letsMove)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		daPlayer.GetComponent("WhirlCheck").isPooling = true;
		daPlayer.transform.Rotate(Vector3.up * Time.deltaTime * 25.0);
		t += Time.deltaTime;
		if (t >= 2.0)
		{
			daPlayer.GetComponent.<Renderer>().enabled = false;
			letsMove = true;
		}
	}
	//Now that we've taken player control and spinned Jehthro around a little, we can move him to the spot
	if (canPool && letsMove)
	{
		var dist : float = Vector3.Distance(daPlayer.transform.position, poolTo.position);
		if (dist > 0)
		{
		    daPlayer.transform.position = Vector3.Lerp(daPlayer.transform.position, poolTo.position, Time.deltaTime*3.0/dist);
		}
		if (dist <= 0.01)
	    {
	    	daPlayer.GetComponent.<Renderer>().enabled = true;
	    	daPlayer.GetComponent("ThirdPersonController").enabled = true;
	    	if (letSwitch)
	    	{
	    		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
	    	}
	    	t = 00; 
	    	daPlayer.GetComponent("WhirlCheck").isPooling = false;
	    	canPool = false;
	    	letsMove = false;
	    }
	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Jethro" && !other.gameObject.GetComponent("WhirlCheck").isPooling)
	{
		AudioSource.PlayClipAtPoint(whoosh, transform.position);
		daPlayer = other.gameObject;
		canPool = true;
	}
}

