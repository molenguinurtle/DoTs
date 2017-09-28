//All this script does is move the group of platforms from left to right across the screen after they've been instantiated
var dest : Vector3; //This is where the platform group is being moved to; This will be set by the trigger that instantiates the platforms
var canGo = false; //This determines if the platforms can move or not; is set to true by trigger that instantiates the platforms
private var t : float = 0.0; //This is our counter for destroying the group of platforms
function Update () 
{
	if (canGo)
	{
		var dist : float = Vector3.Distance(transform.position, dest);
		if (dist > 0)
		{
			t += Time.deltaTime;
		    transform.position = Vector3.Lerp(transform.position, dest, Time.deltaTime*1.4/dist);
		    if (t >= 40.0) //So once the platforms have been out for 30 secs, destroy them; This can obviously be tweaked
		    {
		    	Destroy(gameObject);
		    }
		}
		else if (dist <= 0)
		{
			Destroy(gameObject);
		}

	}
}

//Couple things: we will use a column/line of the spiked plungers as the impending hazard in this room.
//With that being said, we will have to sync up the the speed of these moving plats so that at around whatever time we determine
// they'll be destroyed, the last of them have been crushed by the spiked plungers
//Also, the trigger in this room is what instantiates prefabs of these moving plats. Will have to set up a moving plat prefab for
// this room. Then, at intervals we'll determine later, we will spawn these prefabs from there. That trigger will handle where
//  to spawn the prefabs and the setting of the variables 'dest' and 'canGo'
// BOW!