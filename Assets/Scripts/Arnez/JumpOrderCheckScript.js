var aJump = false; //In Inspector, check either aJump, bJump, or cJump depending on which group of jumps it's in
var bJump = false;
var cJump = false;
var correct = false; //This is set to true by the order checker; set the first jump in each series to 'true' in Inspector
var orderCheck: GameObject; //In the Inspector, drag the jumpOrder Manager to this slot
function Update () 
{
}

function OnTriggerEnter(other : Collider) 
{
    if (other.gameObject.tag == "Arnez") 
    {
    
    	//If we were the right jump and got jumped to, run 'Yep'
    	if (aJump && correct) 
    	{
    		orderCheck.GetComponent("JumpOrderManager").Yep(1);
    	}
    	if (bJump && correct)
    	{
    	    orderCheck.GetComponent("JumpOrderManager").Yep(2);
    	}
    	if (cJump && correct)
    	{
    	    orderCheck.GetComponent("JumpOrderManager").Yep(3);
		}
		
		//If we were the wrong jump and got jumped to, run 'Nope'
		else if (aJump && !correct)
    	{
    		orderCheck.GetComponent("JumpOrderManager").Nope(1);
    	}
    	else if (bJump && !correct)
    	{
    	    orderCheck.GetComponent("JumpOrderManager").Nope(2);
    	}
    	else if (cJump && !correct)
    	{
    	    orderCheck.GetComponent("JumpOrderManager").Nope(3);
		}
    }
}
function OnTriggerExit(other : Collider) 
{
    if (other.gameObject.tag == "Arnez") 
    {
    	if (correct) 
    	{
    		correct = false;    	
    	}
    }
}