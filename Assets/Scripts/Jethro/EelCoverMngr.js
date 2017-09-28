var holesA: GameObject[]; //This is an array of all the holes to cover if a red switch is stepped on
var holesB: GameObject[]; //This is an array of all the holes to cover if a blue switch is stepped on

function Update ()
{
}

function CoverA ()
{
	for (var hA in holesA)
	{
		hA.GetComponent("RespawnScript").enabled = false;
		hA.Find("gate").active = true;
	}
	for (var hB in holesB)
	{
		hB.GetComponent("RespawnScript").enabled = true;
		hB.Find("gate").active = false;
	}
}
function CoverB ()
{
	for (var hB in holesB)
	{
		hB.GetComponent("RespawnScript").enabled = false;
		hB.Find("gate").active = true;
	}
	for (var hA in holesA)
	{
		hA.GetComponent("RespawnScript").enabled = true;
		hA.Find("gate").active = false;
	}
}
