var rPnt: Transform; //This is the rise point, which is the spot we'll be lerping the player to
private var canRise = false;
private var daPlayer: GameObject;
function Update ()
{
	if (canRise)
	{
		Rise();
	}
}

function OnTriggerEnter(other: Collider)
{
	if (other.gameObject.tag == "Jethro" && GameObject.FindWithTag("Character").curGuy.tag == "Jethro")
	{
		canRise = true;
		daPlayer = other.gameObject;
	}
}

function OnTriggerExit(other: Collider)
{
	if (other.gameObject.tag == "Jethro")
	{
		canRise = false;
	}
}

function Rise()
{
	//Player presses a button then we take player control and lerp Jethro up to 'rPnt'
}