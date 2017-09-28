//This is just a slight variation of the 'addsubmng' to make it able to deal with weighted switches and the like
var topLayer : GameObject; //This is the top layer of weighted objects in le room
var nxtOne : GameObject; //In Inspector, drag the desired layer/group of weighted boxes prefab here
var spwnPnt : Transform; //This is the spot where the weighted objects will be initialized from; Also where the removed objects
						 //move up to
var panPoints : Transform[]; //Where the camera will be panning to when we show what's goin on with the door
var cloneLyr : GameObject;
var fallSnd : AudioClip; //Sound we play when dropping boxes
var noSnd: AudioClip; //Sound we play when there are no boxes to pick up
var leSwitch: GameObject; //the Weighted Switch in question; Drag here in Inspector
var boxLmt: int = 4; //The number of layers of boxes we're allowed to have in the room
var boxCnt: int = 1; //The number of layers of boxes we currently have in the room
private var daScript: Component;
private var layers = new Array(); //The array/list of the layers of weighted objects in le room 
private var daPlayer : GameObject; //The player; set by switches
private var leMngr: Component; //The 'CamMngr' script; gets set in the Start function
private var letsAdd = false;
private var letsSub = false;
private var subCam = false;
private var haveGrnd = true;
private var boxSpwn = false;
private var firstTime = true;
private var t: float = 00;
function Start()
{
	daScript = leSwitch.GetComponent("WeightedSwitch");
	leMngr = GameObject.FindGameObjectWithTag("Cam").GetComponent("CamMngr");
}
function Update () 
{
	if (letsSub)
	{
		if (!firstTime)
		{
			if (layers.length == 0 && topLayer == null)
			{
				daPlayer.GetComponent("ThirdPersonController").enabled = true;
				AudioSource.PlayClipAtPoint(noSnd, transform.position);
				letsSub = false;
			}
			if (layers.length == 0 && topLayer != null)
			{
				RemoveTopLayer(topLayer);
			}
			else if (layers.length != 0)
			{
				cloneLyr = layers[layers.length-1];
				RemoveLayer(cloneLyr);
			}
		}
		else if (firstTime) //This calls the functions that don't give player control/switching back because the 'cammngr' is handling that
		{
			if (layers.length == 0 && topLayer == null)
			{
				daPlayer.GetComponent("ThirdPersonController").enabled = true;
				AudioSource.PlayClipAtPoint(noSnd, transform.position);
				subCam = false;
			}
			else if (layers.length == 0 && topLayer != null)
			{
				//daScript.needSub = true;
				RemoveTopCam(topLayer);
			}
			else if (layers.length != 0)
			{
				cloneLyr = layers[layers.length-1];
				//daScript.needSub = true;
				RemoveCam(cloneLyr);
			}
		}
	}
	if (letsAdd)
	{
		if (!firstTime)
		{
			if (boxCnt < boxLmt)
			{
				AddLayer(nxtOne);
			}
			else if (boxCnt >= boxLmt)
			{
					daPlayer.GetComponent("ThirdPersonController").enabled = true;
					AudioSource.PlayClipAtPoint(noSnd, transform.position);
					letsAdd = false;
			}
		}
		if (firstTime) //This calls the functions that don't give player control/switching back because the 'cammngr' is handling that
		{
			if (boxCnt < boxLmt)
			{
				AddCam(nxtOne);
			}
			else if (boxCnt >= boxLmt)
			{
				daPlayer.GetComponent("ThirdPersonController").enabled = true;
				AudioSource.PlayClipAtPoint(noSnd, transform.position);
				letsAdd = false;
			}
		}
	}
}

function RemoveTopLayer (lyr : GameObject)
{
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		var distA : float = Vector3.Distance(lyr.transform.position, spwnPnt.position);
		Destroy(lyr.GetComponentInChildren(Rigidbody));//Removing the rigidbody from each of the boxes in the layer
		t += Time.deltaTime;
		if (distA > 0 && t > 1.5)
		{
		    lyr.transform.position = Vector3.Lerp(lyr.transform.position, spwnPnt.position, Time.deltaTime*2.0/distA);
		}
		if (distA <= 0.01)
		{
			daScript.needSub = true;
			if (layers.length != 0)
			{
				layers.RemoveAt(layers.length-1);
			}
			Destroy(lyr);
			daPlayer.GetComponent("ThirdPersonController").enabled = true;
			GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
			t = 00;
			boxCnt -=1;
			letsSub = false;
		}
}

function RemoveLayer (lyr : GameObject)
{
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		var distA : float = Vector3.Distance(lyr.transform.position, Vector3(spwnPnt.position.x, spwnPnt.position.y+3, spwnPnt.position.z));
		Destroy(lyr.GetComponentInChildren(Rigidbody)); //Removing the rigidbody from each of the boxes in the layer
		t += Time.deltaTime;
		if (distA > 0 && t > 1.5)
		{
		    lyr.transform.position = Vector3.Lerp(lyr.transform.position, Vector3(spwnPnt.position.x, spwnPnt.position.y+3, spwnPnt.position.z), Time.deltaTime*2.0/distA);
		}
		if (distA <= 0.01)
		{
			daScript.needSub = true;
			if (layers.length != 0)
			{
				layers.RemoveAt(layers.length-1);
			}
			Destroy(lyr);
			daPlayer.GetComponent("ThirdPersonController").enabled = true;
			GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
			t = 00;
			boxCnt -=1;
			letsSub = false;
		}
}

function AddLayer (newlyr : GameObject)
{
	if (!boxSpwn)
	{
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		cloneLyr = Instantiate(newlyr, spwnPnt.position, spwnPnt.rotation);
		AudioSource.PlayClipAtPoint(fallSnd, transform.position);
		boxSpwn = true;
	}
	t+=Time.deltaTime;
	if (t>=3.0 && boxSpwn)
	{
		layers.Add(cloneLyr);
		daPlayer.GetComponent("ThirdPersonController").enabled = true;
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = true;
		t = 00;
		boxCnt +=1;
		boxSpwn = false;
		letsAdd = false;
	}
}

//None of the next three functions give player control or character switching back; they rely on the 'camMngr' to handle that
function RemoveTopCam (lyr : GameObject)
{
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		var distA : float = Vector3.Distance(lyr.transform.position, spwnPnt.position);
		Destroy(lyr.GetComponentInChildren(Rigidbody));//Removing the rigidbody from each of the boxes in the layer
		if (!subCam)
		{
			leMngr.targets = panPoints;
			leMngr.waitTime = 3;
			leMngr.moveTime = .75;//1
			leMngr.letSwitch = false;
			leMngr.weSet = false;
			leMngr.letSkip = false;
	    	leMngr.updatePan = true;
	    	daScript.needSub = true;
			subCam = true;
		}
		if (distA > 0 && subCam)
		{
		    lyr.transform.position = Vector3.Lerp(lyr.transform.position, spwnPnt.position, Time.deltaTime*1.25/distA);//2.0
		}
		if (distA <= 0.01)
		{
			if (layers.length != 0)
			{
				layers.RemoveAt(layers.length-1);
			}
			Destroy(lyr);
			t = 00;
			boxCnt -= 1;
			firstTime = false;
			letsSub = false;
		}
}

function RemoveCam (lyr : GameObject)
{
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		var distA : float = Vector3.Distance(lyr.transform.position, Vector3(spwnPnt.position.x, spwnPnt.position.y+3, spwnPnt.position.z));
		Destroy(lyr.GetComponentInChildren(Rigidbody)); //Removing the rigidbody from each of the boxes in the layer
		if (distA > 0)
		{
		    lyr.transform.position = Vector3.Lerp(lyr.transform.position, Vector3(spwnPnt.position.x, spwnPnt.position.y+3, spwnPnt.position.z), Time.deltaTime*1.25/distA);//2.0
		}
		if (distA <= 0.01)
		{
			if (layers.length != 0)
			{
				layers.RemoveAt(layers.length-1);
			}
			Destroy(lyr);
			t = 00;
			boxCnt -= 1;
			firstTime = false;
			letsSub = false;
		}
}

function AddCam (newlyr : GameObject)
{
	if (!boxSpwn)
	{
		GameObject.FindWithTag("Character").GetComponent("ChrMngr").canSwitch = false;
		cloneLyr = Instantiate(newlyr, spwnPnt.position, spwnPnt.rotation);
		AudioSource.PlayClipAtPoint(fallSnd, transform.position);
		leMngr.targets = panPoints;
		leMngr.waitTime = 3;
		leMngr.moveTime = .75;//1
		leMngr.letSwitch = false;
		leMngr.weSet = false;
		leMngr.letSkip = false;
    	leMngr.updatePan = true;
		boxSpwn = true;
	}
	t+=Time.deltaTime;
	if (t>=3.0 && boxSpwn)
	{
		layers.Add(cloneLyr);
		t = 00;
		boxCnt +=1;
		firstTime = false;
		boxSpwn = false;
		letsAdd = false;
	}
}
