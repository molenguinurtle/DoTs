var otherSide: GameObject; //The trigger on the other side of the sesaw
var landPoint: Transform; //Where we put the player after le launch
var standPoint: Transform; //This is where we place Arnez in the trigger on the Sesaw
var leavePoint: Transform; //This is where we place Arnez if he leaves the trigger on the Sesaw
private var isOccupied = false; //Set to true if Arnez is in trigger
private var canOccupy = false;
private var daPlayer: GameObject; //Le player
function Update ()
{
	if (canOccupy && !isOccupied)
	{
		Occupy();
	}
	if (!canOccupy && isOccupied)
	{
		UnOccupy();
	}
}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Boulder")
	{
		Destroy(other.gameObject); //Destroy the boulder once it lands on the sesaw
		//Reserved for flipping the sesaw gameobject, which is the parent to the trigger; we'll do this via rotation
		if (otherSide.GetComponent("SeSawTrigScript").isOccupied)
		{
			otherSide.GetComponent("SeSawTrigScript").daPlayer.transform.position = landPoint.position;//This is us
			//changing Arnez's position via launching him from the other side of the sesaw once the boulder hits this side
			//Eventually, this will play an animation of Arnez flying through the air first 
			otherSide.GetComponent("SeSawTrigScript").isOccupied = false; //Turning isOccupied back to false
			//This is giving play control back to Arnez after he's been launched
			GameObject.FindGameObjectWithTag("Arnez").GetComponent("ThirdPersonController").enabled = true;
		}
	}
	if (other.gameObject.tag == "Arnez" && GameObject.FindWithTag("Character").curGuy.tag == "Arnez")
	{
		daPlayer = other.gameObject;
		canOccupy = true;
	}
}
function OnTriggerExit(other : Collider)
{
	if (other.gameObject.tag == "Arnez") 
    {
		canOccupy = false;
    }
}
function Occupy()
{
	if(Input.GetButtonUp("Fire1") && !isOccupied) //If we press the button...
	{
		daPlayer.transform.position = standPoint.position; //...change Arnez's position to one thats on the sesaw; eventually, an animation
		isOccupied = true;
		daPlayer.GetComponent("ThirdPersonController").enabled = false; //Take Arnez's control away
		canOccupy = false;
	}
}
function UnOccupy()
{
	if(Input.GetButtonUp("Fire1") && isOccupied) //If we press the button...
	{
		daPlayer.transform.position = leavePoint.position; //...change Arnez's position to one thats off the sesaw; eventually, an animation
		isOccupied = false;
		daPlayer.GetComponent("ThirdPersonController").enabled = true; //Give Arnez's control back
	}
}
function OnGUI() //This tells the player the button to press to enter and exit the sesaw triggers
{
	if (canOccupy && !isOccupied) //Need to add in a check for making sure the current character is Arnez
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to stand on the sesaw!");
	}
	if (!canOccupy && isOccupied) //Need to add in a check for making sure the current character is Arnez
	{
		GUI.Label( Rect(Screen.width/2, Screen.height/5, Screen.width, Screen.height), "Left Click to exit the sesaw!");
	} 
}