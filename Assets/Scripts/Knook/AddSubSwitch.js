var downClr : Material; //Drag the texture/material for the switch when it's in down state
var upClr : Material;  //Drag the texture/material for the switch when it's in up state
var leManager : GameObject; //In Inspector, drag le addsub manager object here
var leWeight : GameObject; //In Inspector, drag le weighted switch here
var switchTime : float; //Set in Inspector to however long the trigger should wait between switching its states
var isWeight = false; //Set in Inspector to differentiate between switches that drop boxes on weighted switches or not
private var bringDown = false;
private var takeUp = true;
private var isOn = false;
private var canChng = true;
private var o : float = 00;
private var  t : float = 00; 

function LateUpdate () 
{
	if (!isOn && canChng)
	{
		t += Time.deltaTime;
		if (t >= switchTime)
		{
			if (takeUp)
			{
				bringDown = true;
				takeUp = false;
				t = 00;
			}
			else if (bringDown)
			{
				takeUp = true;
				bringDown = false;
				t = 00;
			}
		}
	}
	if (!canChng && isOn)// This is to turn the switch back on 5 secs after it's been hit
	{
		o += Time.deltaTime;
		if (o >= 5.0)
		{
			GetComponent.<Renderer>().enabled = true;
			isOn = false;
			canChng = true;
			o = 00;
		}
	}
	if (bringDown)
	{
		gameObject.GetComponent.<Renderer>().material = downClr;
	}
	if (takeUp)
	{
		gameObject.GetComponent.<Renderer>().material = upClr;
	}
}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == "Knook" && !isOn)
	{
		GetComponent.<Renderer>().enabled = false;
		other.gameObject.GetComponent("ThirdPersonController").enabled = false;
		if (takeUp && !isWeight)
		{
			leManager.GetComponent("AddSubMng").daPlayer = other.gameObject;
			leManager.GetComponent("AddSubMng").letsSub = true;
			isOn = true;
		}
		if (bringDown && !isWeight)
		{
			leManager.GetComponent("AddSubMng").daPlayer = other.gameObject;
			leManager.GetComponent("AddSubMng").letsAdd = true;
			isOn = true;
		}

		if (takeUp && isWeight)
		{
			leManager.GetComponent("AddSubWMng").daScript.newPosY = leManager.GetComponent("AddSubWMng").daScript.daBars.transform.position.y-((leManager.GetComponent("AddSubWMng").daScript.end.position.y-leManager.GetComponent("AddSubWMng").daScript.start.position.y)/leManager.GetComponent("AddSubWMng").daScript.leNum);
			leManager.GetComponent("AddSubWMng").daScript.newPos= Vector3(leManager.GetComponent("AddSubWMng").daScript.daBars.transform.position.x, leManager.GetComponent("AddSubWMng").daScript.newPosY, leManager.GetComponent("AddSubWMng").daScript.daBars.transform.position.z);
			leManager.GetComponent("AddSubWMng").daPlayer = other.gameObject;
			leManager.GetComponent("AddSubWMng").letsSub = true;
			isOn = true;
		}
		if (bringDown && isWeight)
		{
			leManager.GetComponent("AddSubWMng").daPlayer = other.gameObject;
			leManager.GetComponent("AddSubWMng").letsAdd = true;
			isOn = true;
		}
	}	
}
function OnTriggerExit (other : Collider)
{
	if (other.gameObject.tag == "Knook" && isOn)
	{
		canChng = false;
	}
}