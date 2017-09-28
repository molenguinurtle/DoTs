private var isOccupied = false;
private var canOccupy = false;
private var daPlayer: GameObject;

function Update ()
{
	if (canOccupy && !isOccupied)
	{
		OccupyCart();
	}
	if (!canOccupy && isOccupied && GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy.tag == "Knook")
	{
		UnOccupyCart();
	}
}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Knook" && GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy.tag == "Knook")
	{
		canOccupy = true;
		daPlayer = other.gameObject;
	}
}

function OnTriggerExit(other: Collider)
{
	if (other.gameObject.tag == "Knook")
	{
		canOccupy = false;
	}
}

function OccupyCart()
{
	if(Input.GetButtonUp("Fire1") && !isOccupied)
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = false; //Take Knook's control away
		isOccupied = true;
		canOccupy = false;
	}
}

function UnOccupyCart()
{
	if(Input.GetButtonUp("Fire1") && isOccupied) 
	{
		daPlayer.GetComponent("ThirdPersonController").enabled = true; //Give Knook's control back
		isOccupied = false;
	}
}

function OnGUI() //This tells the player the button to press to enter and exit the cart
{
	if (canOccupy && !isOccupied && GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy.tag == "Knook")
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to enter the cart!");
	}
	if (!canOccupy && isOccupied && GameObject.FindWithTag("Character").GetComponent("ChrMngr").curGuy.tag == "Knook")
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to exit the cart!");
	} 
}