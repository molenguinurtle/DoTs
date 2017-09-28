var leGuy: String; //This is the character that has to touch the trig to activate it; Set/write in Inspector
var leMngr: GameObject; //This is the character manager gameobject; Drag to this slot in Inspector
var leSnd: AudioClip; //This is the 'tada'-like trumpet sound; Drag to this slot in Inspector
var leLock: GameObject; //This is the lock that gets hidden once this trig is touched
private var needEnd = false;
private var daPlayer: GameObject;
private var showMsg1 = false;
private var showMsg2 = false;

function Update ()
{
	if(needEnd)
	{
		EndPath();
	}
}
function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag == leGuy && leMngr.GetComponent("ChrMngr").curGuy.tag == leGuy)
	{
		leMngr.GetComponent("ChrMngr").canSwitch = false;
		daPlayer = other.gameObject;
		leLock.SetActiveRecursively(false);
		needEnd = true;
	}
}

function EndPath()
{
    daPlayer.GetComponent("ThirdPersonController").enabled = false;
    daPlayer.transform.Find("BlackScreen").GetComponent.<Renderer>().enabled = true;
    if (leMngr.GetComponent("ChrMngr").e < 3)
    {
    	leMngr.GetComponent("ChrMngr").e +=1;
    	leMngr.GetComponent("ChrMngr").doneGuys.Add(daPlayer);
    	if (leMngr.GetComponent("ChrMngr").e == 1)
    	{
			AudioSource.PlayClipAtPoint(leSnd, transform.position);
    		leMngr.GetComponent("ChrMngr").showMsg1 = true;
        	leMngr.GetComponent("ChrMngr").canSwitch = true;
        }
        else if (leMngr.GetComponent("ChrMngr").e == 2)
    	{
			AudioSource.PlayClipAtPoint(leSnd, transform.position);
    		leMngr.GetComponent("ChrMngr").showMsg2 = true;
        	leMngr.GetComponent("ChrMngr").canSwitch = true;
        }
        needEnd = false;
    }

}
