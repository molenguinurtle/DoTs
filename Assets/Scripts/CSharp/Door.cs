using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Door : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public IEnumerator OpenDoor()
    {
        //Basically we want to play an Animation of the door opening. The yield will be WaitForSeconds(animation's duration)
        // After that, maybe we disable the collider on the door? Or enable the trigger that sends the Player to another room/"thru the door"
        yield return null;
    }
}
