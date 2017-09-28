var letterPause = 0.2;
private var phrase : String;
var doneTalking = false;
function Speak() 
{
    phrase = GetComponent.<GUIText>().text;
    GetComponent.<GUIText>().text = "";
    TypeText ();
}

function TypeText () 
{
	gameObject.GetComponent.<GUIText>().enabled = true;
    for (var word in phrase.Split(" "[0])) 
    {
        GetComponent.<GUIText>().text += word + " ";
        yield WaitForSeconds (letterPause);
    }
    doneTalking = true;   
}