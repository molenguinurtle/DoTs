var go = false;
var dest: Vector3;
var leKey: GameObject;

function Start()
{
	leKey = GameObject.Find("KeyA");
}

function Update ()
{
	if (go)
	{
		var dist : float = Vector3.Distance(transform.position, dest);
		if (dist > 0)
		{
		    transform.position = Vector3.Lerp(transform.position, dest, Time.deltaTime*.6/dist);
		}
		else if (dist <= 0)
		{
			Destroy(gameObject);
		}

	}
}

function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == "Arnez") 
    {
    	AudioSource.PlayClipAtPoint(GameObject.FindGameObjectWithTag("Respawn").GetComponent(RespawnManagerScript).nezYell, transform.position);
		leKey.GetComponent("NezKey").needReset = true;
    }
}