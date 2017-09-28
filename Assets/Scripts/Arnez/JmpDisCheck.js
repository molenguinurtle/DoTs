var disMngr: GameObject; //In Inspector, drag the jump disappear manager to this slot
private var hasJmped = false;
private var t: float = 0.0;
function Update () 
{
	if (hasJmped)
	{
		t += Time.deltaTime;
		if (t >= 0.75)
		{
			disMngr.GetComponent("JumpDisappearScript").AddToArray(transform.parent.gameObject);
			hasJmped = false;
		}
	}
}
function OnTriggerExit(other : Collider) 
{
	hasJmped = true;
	t = 00;
	disMngr.GetComponent("JumpDisappearScript").playerJmps += 1;
}