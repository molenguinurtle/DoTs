var leCam: GameObject; //The camera looking at the shuffle; Drag here in Inspector
private var needShuffA = false;
private var needShuffB = false;
private var needShuffC = false;
private var a: float = 00;
private var b: float = 00;
private var c: float = 00;
private var d: float = 100;
private var q: float = 00;


function Update () 
{
	if (needShuffA)
	{
		iShuffleHard();
	}
	
	if (needShuffB)
	{
		iShuffleDaily();
	}
	
	if (needShuffC)
	{
		iShuffleWork();
	}
}

function iShuffleHard()
{
	leCam.active = true;
	q += Time.deltaTime;
	if (q >=4.0)
	{
		a +=Time.deltaTime;
		if (a < 4.0)
		{
			transform.Rotate(Vector3.up * Time.deltaTime * 200.0);
		}
		if (a >=4.0)
		{
			b += Time.deltaTime;
			if (b < 3.0)
			{
				transform.Rotate(Vector3.up * Time.deltaTime * -100.0);
			}
			if (b >= 3.0)
			{
				transform.rotation.eulerAngles.y+=20*Time.deltaTime;
				if (transform.rotation.eulerAngles.y >= 180)
				{
					a = 00;
					b = 00;
					q = 00;
					leCam.active = false;
					GameObject.FindGameObjectWithTag("Knook").transform.Find("Camera").GetComponent.<Camera>().enabled = true;
					GameObject.FindGameObjectWithTag("Knook").GetComponent("ThirdPersonController").enabled = true;
					needShuffA = false;
				}
			}
		}
	}

}

function iShuffleDaily()
{
	leCam.active = true;
	q += Time.deltaTime;
	if (q >=4.0)
	{
		a +=Time.deltaTime;
		if (a < 4.0)
		{
			transform.Rotate(Vector3.forward * Time.deltaTime * -200.0);
		}
		if (a >=4.0)
		{
			b += Time.deltaTime;
			if (b < 4.0)
			{
				transform.Rotate(Vector3.forward * Time.deltaTime * 300.0);
			}
			if (b >= 4.0)
			{
				c += 20*Time.deltaTime;
				transform.Rotate(Vector3.forward * Time.deltaTime * c);
				if (transform.rotation.eulerAngles.z >= 359)
				{
					a = 00;
					b = 00;
					q = 00;
					c = 00;
					leCam.active = false;
					GameObject.FindGameObjectWithTag("Knook").transform.Find("Camera").GetComponent.<Camera>().enabled = true;
					GameObject.FindGameObjectWithTag("Knook").GetComponent("ThirdPersonController").enabled = true;
					needShuffB = false;
				}
			}
		}
	}
}

function iShuffleWork()
{
	leCam.active = true;
	q += Time.deltaTime;
	if (q >=4.0)
	{
		a +=Time.deltaTime;
		if (a < 3.0)
		{
			transform.Rotate(Vector3.up * Time.deltaTime * 400.0);
		}
		if (a >=3.0)
		{
			b += Time.deltaTime;
			if (b < 6.0)
			{
				transform.Rotate(Vector3.up * Time.deltaTime * 0.0);
				transform.Rotate(Vector3.forward * Time.deltaTime * -400.0);
			}
			if (b >= 6.0)
			{
				c += 20*Time.deltaTime;
				transform.Rotate(Vector3.forward * Time.deltaTime * c);
				if (transform.rotation.eulerAngles.z >= 180)
				{
					c = 00;
					transform.Rotate(Vector3.forward * Time.deltaTime * 0.0);
					d -= 15*Time.deltaTime;
					transform.Rotate(Vector3.up * Time.deltaTime * d);
					if (transform.rotation.eulerAngles.y <= 180)
					{
						a = 00;
						b = 00;
						q = 00;
						c = 00;
						d = 100;
						leCam.active = false;
						GameObject.FindGameObjectWithTag("Knook").transform.Find("Camera").GetComponent.<Camera>().enabled = true;
						GameObject.FindGameObjectWithTag("Knook").GetComponent("ThirdPersonController").enabled = true;
						needShuffC = false;
					}
				}
			}
		}
	}
}