var leBoxes= new Array(); //Array of boxes on switch
var curBx: GameObject; //This is le box that fell on switch last
var door: GameObject; //The door this switch operates
private var daBars: GameObject;
private var newPosY: float;
private var newPos: Vector3;
var leNum: int; //This is the amount of boxes needed to fully weigh switch down; Set in Inspector
var leCount: int; //This is the amount of boxes currently on the switch
var start: Transform; //Where the bars start (fully closed door)
var end: Transform; //Where the bars end (fully open door)
var needAdd = false;
private var needSub = false;

function Start()
{
	daBars = door.transform.Find("Bars").gameObject;

}
function Update ()
{
	if (needAdd)
	{
		AddBox();
	}
	
	if (needSub)
	{
		SubBox();
	}
	
	if (leCount >= leNum)
	{
		door.GetComponent("DoorScript").enabled = true;
	}
	if (leCount < leNum)
	{
		door.GetComponent("DoorScript").enabled = false;
	}
}

function OnTriggerEnter (other: Collider)
{
	if (other.gameObject.tag == "Weight")
	{
		curBx = other.gameObject;
		newPosY = daBars.transform.position.y+((end.position.y-start.position.y)/leNum);
		newPos= Vector3(daBars.transform.position.x, newPosY, daBars.transform.position.z);
		needAdd = true;
	}
}

function AddBox()
{ 
	var dist: float  = Vector3.Distance(daBars.transform.position, newPos);
	if (dist > 0)
	{
		daBars.transform.position = Vector3.Lerp(daBars.transform.position, newPos, Time.deltaTime*.1/dist);
	}
	if (dist <= .01 || daBars.transform.position.y == end.position.y)
	{
		GetComponent.<Collider>().center = Vector3(0, GetComponent.<Collider>().center.y+2.5, 0);
		leCount +=1;
		needAdd = false;
	}
}

function SubBox()
{ 
	var dist: float  = Vector3.Distance(daBars.transform.position, newPos);
	if (dist > 0)
	{
		daBars.transform.position = Vector3.Lerp(daBars.transform.position, newPos, Time.deltaTime*.1/dist);
	}
	if (dist <= .01 || daBars.transform.position.y == start.position.y)
	{
		GetComponent.<Collider>().center = Vector3(0, GetComponent.<Collider>().center.y-2.5, 0);
		leCount -=1;
		needSub = false;
	}
}