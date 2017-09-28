var go = false;
var dest: Vector3;
var leKey: GameObject;

function Start()
{
	leKey = GameObject.Find("KeyJ");
}

function Update ()
{
	if (go)
	{
		var dist : float = Vector3.Distance(transform.position, dest);
		if (dist > 0)
		{
		    transform.position = Vector3.Lerp(transform.position, dest, Time.deltaTime*.75/dist);
		}
		else if (dist <= 0)
		{
			Destroy(gameObject);
		}

	}
}

function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == "Jethro") 
    {
    	AudioSource.PlayClipAtPoint(GameObject.FindGameObjectWithTag("Respawn").GetComponent(RespawnManagerScript).roScream, transform.position);
		leKey.GetComponent("JethroKey").needReset = true;
    }
}