var songs: AudioClip[]; //This is the array of the level's songs;
var needSong = false;
var needFinal = false;
function Update () 
{
	if (needSong)
	{
		GetComponent.<AudioSource>().clip = songs[Random.Range(0, 2)];
		GetComponent.<AudioSource>().loop = true;
		GetComponent.<AudioSource>().Play();
		needSong = false;
	}
	
	if (needFinal && !needSong)
	{
		GetComponent.<AudioSource>().clip = songs[songs.length-1];
		GetComponent.<AudioSource>().loop = true;
		GetComponent.<AudioSource>().Play();
		needFinal = false;
	}
}