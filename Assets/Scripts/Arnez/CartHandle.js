var cart: GameObject; //This is the cart Knook has to get to that this handle controls
var origPos: Transform; //Where the cart starts at
var endPos: Transform; //Where the cart moves to
var showTime: float; //This is the amount of time we show Knook after we've operated the cart; set in Inspector
private var areUsing = false;
private var canUse = false;
private var hasMoved = false;
private var daPlayer: GameObject;
private var t: float = 00;

function Update ()
{
	if (canUse)
	{
		UseHandle();
	}
}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Arnez" && GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy.tag == "Arnez")
	{
		canUse = true;
		daPlayer = other.gameObject;
	}
}

function OnTriggerExit(other: Collider)
{
	if(other.gameObject.tag == "Arnez")
	{
		canUse = false;
	}
}

function UseHandle()
{
	//If we haven't moved the cart before, move it to endPos
	if (cart.GetComponent("Cart").isOccupied && Input.GetButtonUp("Fire1") && !hasMoved && !areUsing)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		daPlayer.Find("Camera").active = false;
		GameObject.FindWithTag("Knook").Find("Camera").active = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		GameObject.FindWithTag("Knook").transform.position = endPos.position;
		areUsing = true;
	}
	
	//If we have moved the cart before, move it back to origPos
	if (cart.GetComponent("Cart").isOccupied && Input.GetButtonUp("Fire1") && hasMoved && !areUsing)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false;
		daPlayer.Find("Camera").active = false;
		GameObject.FindWithTag("Knook").Find("Camera").active = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		GameObject.FindWithTag("Knook").transform.position = origPos.position;
		areUsing = true;
	}
	
	if (areUsing && !hasMoved)
	{
		t += Time.deltaTime;
		if (t>= showTime)
		{
			cart.GetComponent("Cart").isOccupied = false;
			GameObject.FindWithTag("Knook").Find("Camera").active = false;
			daPlayer.Find("Camera").active = true;
			GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
			daPlayer.GetComponent("ThirdPersonController").enabled = true;
			hasMoved = true;
			t = 00;
			areUsing = false;
		}
	}
	if (areUsing && hasMoved)
	{
		t += Time.deltaTime;
		if (t>= showTime)
		{
			cart.GetComponent("Cart").isOccupied = false;
			GameObject.FindWithTag("Knook").Find("Camera").active = false;
			daPlayer.Find("Camera").active = true;
			GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
			daPlayer.GetComponent("ThirdPersonController").enabled = true;
			hasMoved = false;
			t = 00;
			areUsing = false;
		}
	}
}

function OnGUI() //This tells the player the button to press to start the eel chase sequence
{
	if (canUse && !areUsing && cart.GetComponent("Cart").isOccupied)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to move the cart with Knook in it!");
	}
	if (canUse && !areUsing && !cart.GetComponent("Cart").isOccupied)
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Knook has to be in the cart before you can move it!");
	}
}