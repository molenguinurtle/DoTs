using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Door : MonoBehaviour
{
    private Collider _myCollider;
    // Start is called before the first frame update
    void Start()
    {
        _myCollider = GetComponent<Collider>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void ResetDoor()
    {
        //Either play door closing animation or just reset door to default position. Then enable the collider
        _myCollider.enabled = true;
    }

    public IEnumerator OpenDoor()
    {
        //Basically we want to play an Animation of the door opening. The yield will be WaitForSeconds(animation's duration)
        // After that, maybe we disable the collider on the door?
        _myCollider.enabled = false;
        yield return null;
    }
}
