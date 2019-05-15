using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DoorSwitch : Switch
{
    public Door doorToOpen; //This is the door this Switch should open when triggered


    public override void SwitchTriggered()
    {
        //We'll make a call to the doorToOpen's DoorOpen coroutine and a call to the CameraManager to show the door opening
        StartCoroutine(doorToOpen.OpenDoor());
        //CamManager.Instance.PanCamera(doorToOpen.transform.position); //WE NEED TO WRITE OUR CAMMANAGER
        Debug.Log(doorToOpen.name + " was opened.");

    }


}
