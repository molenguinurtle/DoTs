var go = false;
var rate: float; //Set in Inspector to how fast you want walls to be moving
var dest: Vector3; //Set in Inspector
var leKey: GameObject; //The 'KeyK' gameobject; Set in Inspector
var initPos: Vector3;
function Start()
{
	initPos = transform.position;
}

function Update ()
{
	if (go)
	{
		var dist : float = Vector3.Distance(transform.position, dest);
		if (dist > 0)
		{
		    transform.position = Vector3.Lerp(transform.position, dest, Time.deltaTime*rate/dist);
		}
		else if (dist <= 0)
		{
			go = false;
		}

	}
}

function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == "Knook") 
    {
    	AudioSource.PlayClipAtPoint(GameObject.FindGameObjectWithTag("Respawn").GetComponent(RespawnManagerScript).knookYell, transform.position);
		leKey.GetComponent("KnookKey").needReset = true;
    }
}