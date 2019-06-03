using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Breakable : MonoBehaviour
{
    /// <summary>
    /// This is called when a StrongMan's Smash ability makes contact with this object.
    /// </summary>
    public virtual void Break()
    {
        //make Breakable object disappear
        //play Particle effect
        //play AudioClip
    }
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
