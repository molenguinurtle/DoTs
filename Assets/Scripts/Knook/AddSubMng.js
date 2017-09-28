var topLayer : GameObject; //This is the top layer of breakable objects in le room
var nxtOne : GameObject; //In Inspector, drag the desired layer/group of breakable boxes prefab here
var spwnPnt : Transform; //This is the spot where the breakable objects will be initialized from; Also where the removed objects
						 //move up to
var cloneLyr : GameObject;
var fallSnd : AudioClip; //Sound we play when dropping boxes
var noSnd: AudioClip; //Sound we play when there are no boxes to pick up and when we can't add any more
var boxLmt: int = 4; //The number of layers of boxes we're allowed to have in the room
var boxCnt: int = 1; //The number of layers of boxes we currently have in the room
private var layers = new Array(); //The array/list of the layers of breakable objects in le room 
private var daPlayer : GameObject; //The player; set by switches
private var letsAdd = false;
private var letsSub = false;
private var haveGrnd = true;
private var boxSpwn = false;
private var t: float = 00;

function Update () 
{
	if (letsSub)
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
	if (letsAdd) 
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