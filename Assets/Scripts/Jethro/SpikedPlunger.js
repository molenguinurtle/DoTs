var dropRate : float; //Set in Inspector for how fast you want plunger to drop
var riseRate : float; //Set in Inspector for how fast you want plunger to rise
private var canDrop = false; //This determines if the plunger can drop or not; is set to true by trigger that starts the plungers
private var weDown = false;
private var initialPos : Vector3; //This is the spot the plunger starts at
private var dropPoint : Vector3; //This is the spot where the plunger will be dropping to
function Start () 
{
	initialPos = transform.position;
	dropPoint = Vector3(transform.position.x, transform.position.y-1.5, transform.position.z);
}

function Update () 
{
	if (canDrop && !weDown)
	{
		var distA : float = Vector3.Distance(transform.position, dropPoint);
		if (distA > 0)
		{
		    transform.position = Vector3.Lerp(transform.position, dropPoint, Time.deltaTime*dropRate/distA);
		}
		if (distA <= 0.01)
	    {
	    	weDown = true;
	    }

	}
	if (canDrop && weDown)
	{
		var distB : float = Vector3.Distance(transform.position, initialPos);
		if (distB > 0)
		{
		    transform.position = Vector3.Lerp(transform.position, initialPos, Time.deltaTime*riseRate/distB);
		}
		if (distB <= 0.01)
	    {
	    	weDown = false;
	    }
	}
}

//Will need to attach a trigger to the plunger object that says to respawn Arnez or Jethro if he touches it; then save that into the prefab