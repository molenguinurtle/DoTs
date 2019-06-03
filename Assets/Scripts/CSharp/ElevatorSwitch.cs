using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ElevatorSwitch : Switch
{
    [SerializeField] private bool _needElevate;
    [SerializeField] private Vector3 _originalPoint;
    public Transform endPoint; //This is the top of the elevator. The point it stops rising at 
    public Rigidbody elevatorPlatform; //This is the platform we need to raise when standing on the Switch
    public override void SwitchTriggered()
    {
        StartCoroutine(ElevatePlatform());
    }

    private IEnumerator ElevatePlatform()
    {
        while (_needElevate)
        {
            while (Vector3.Distance(elevatorPlatform.transform.position, endPoint.position) > .02f)
            {
                //elevatorPlatform.AddForce() //We want to add an upward force to the elevatorPlatform until it hits the endPoint
            }
            yield return null;
        }
        while (!_needElevate)
        {
            while (Vector3.Distance(elevatorPlatform.transform.position, _originalPoint) > .02f)
            {
                //elevatorPlatform.AddForce() //We want to add an downward force to the elevatorPlatform until it hits the originalPoint, i.e., the floor
            }
            yield return null;
        }
    }

    //We need to override the OnTriggerEnter and OnTriggerExit methods
    // Exit: We basically have to override the whole thing and set _needElevate to false
    //Enter: We basically need to call base.Enter + set _needElevate to true
    public override void OnTriggerEnter(Collider other)
    {
        _needElevate = true;
        base.OnTriggerEnter(other);
    }
    public override void OnTriggerExit(Collider other)
    {
        if (other.gameObject == _switchOccupant)
        {
            _needElevate = false;
        }
    }
    void Start()
    {
        _originalPoint = transform.position;
    }

}
