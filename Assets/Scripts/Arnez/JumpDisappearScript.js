private var disPlats = new Array ();; //The array/list of the platforms that have been jumped from
private var playerJmps: int = -1; //This is the count of how many times the player has jumped
function Update ()
{
	if (playerJmps >= 3)
	{
		SubtractFromArray();
		playerJmps = 2;
	}
}
//This function takes the platform that was just jumped from and adds it to the array; then it deactivates the platform & all its children
//This function will be called by the platform that is jumped from; That platform will also add 1 to playerJmps at that time
function AddToArray(larry: GameObject)
{
	disPlats.Add(larry);
	larry.SetActiveRecursively(false);
	
}
//This function takes the platform that was jumped from 3 jumps ago and reactivates it and all its children; then it is subtracted from the array
function SubtractFromArray()
{
	disPlats[0].SetActiveRecursively(true);
	disPlats.RemoveAt(0);
}

//This function takes the last platform that was jumped from and reactivates it with all its children; it also subtracts 1 from playerJmps
//This function is only used in the disappearing platform room if the player falls; it will be called by the fall trigger in le room
function LeaveArray()
{
	disPlats[disPlats.length-1].SetActiveRecursively(true);
	disPlats.RemoveAt(disPlats.length-1);
	playerJmps -= 1;
}