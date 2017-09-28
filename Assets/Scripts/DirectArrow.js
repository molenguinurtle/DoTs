
function Update () {
	var destination = GameObject.FindWithTag ("Destination");
	if (destination == null){
		GetComponent.<Renderer>().enabled = false;
	}
	if (destination){
		GetComponent.<Renderer>().enabled = true;
		transform.LookAt(destination.transform);
	}
	
}