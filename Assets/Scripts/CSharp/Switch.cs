using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public abstract class Switch : MonoBehaviour
{
    //This is the base class of all Switch objects in the game. 

    [SerializeField] private int _numToActivate = 1; //This is the amount of Players that need to be standing on a Switch for it to activate
    [SerializeField] private int _currentNumOn; //This is the amount of Players that are currently standing on a Switch. We can update this with Unity Events
    [SerializeField] private bool _isActive = true; //This determines if the Switch is active or not. Set to false in DeactivateSwitch
    public GameObject _switchOccupant; //This is the player that stepped on the Switch. Used to determine if we should activate the Switch again once it's stepped off of
    public UnityEvent switchSteppedOn; //Invoke this once a Switch is stepped on to tell any other potential Switches linked to this one
    public UnityEvent switchSteppedOff; //Invoke this once a Switch is stepped off to tell any other potential Switches linked to this one
    public UnityEvent switchTriggered; //Invoke this once a Switch is triggered to tell any other potential Switches linked to this one. This will cause those Switches to call DeactivateSwitch


    public virtual void OnTriggerEnter(Collider other)
    {
        if (other.GetComponent<Player>() && _isActive)
        {
            _switchOccupant = other.gameObject;
            _currentNumOn++;
            if (_numToActivate > 1)
            {
                if (_currentNumOn == _numToActivate - 1)
                {
                    //This means this Switch is the last one that needed to be stepped on. Call SwitchTriggered and invoke the Event of the same name
                    switchTriggered.Invoke();
                    SwitchTriggered();
                }
                else
                {
                    //This means we just need to iterate _currentNumOn and tell any linked Switches to do the same
                    switchSteppedOn.Invoke();
                }
            }
            else
            {
                //Regular ole 1 person Switch. Just call SwitchTriggered and deactivate the Switch
                SwitchTriggered();
            }
            DeactivateSwitch();

        }
        Debug.Log(other.gameObject.name + " walked onto the switch");
    }

    public virtual void OnTriggerExit(Collider other)
    {
        if (_currentNumOn != _numToActivate && other.gameObject == _switchOccupant)
        {
            //This means we have NOT triggered the Switch yet. Need to subtract from _currentNumOn and tell any linked Switches to do the same. Then set the Switch back to active
            _currentNumOn--;
            switchSteppedOff.Invoke();
            ActivateSwitch();
        }
    }

    public void ActivateSwitch()
    {
        _isActive = true;
    }

    public void DeactivateSwitch()
    {
        _isActive = false;
    }

    public void ResetSwitch()
    {
        _isActive = true;
        _switchOccupant = null;
        _currentNumOn = 0;
    }

    //This method is called whenever the Switch is triggered. Meaning, if 3 people are supposed to be standing on 3 separate switches, we call SwitchTriggered once the 3rd one
    //  steps on. The specific types of Switches (Door, Trap, Puzzle, Camera(?), etc.) will implement their specific Activate methods
    public abstract void SwitchTriggered();
}
