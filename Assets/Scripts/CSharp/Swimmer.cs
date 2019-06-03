using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Swimmer : Player
{
    /// <summary>
    /// This method is called whenever we enter 'Swimmable' terrain. Could also just be a state change where we change our animations up 
    /// and allow the Dive and Water Jump actions to be taken
    /// </summary>
    public void Swim()
    {

    }

    /// <summary>
    /// This method is only available when Swimming is active. Moves the player to the bottom of whatever body of 'Swimmable' she is currently in. 
    /// Once down there, player will be able to walk around as if they were on normal ground. Might also allow Water Jump while in the Dive state. Button Press
    /// </summary>
    public void Dive()
    {

    }
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
