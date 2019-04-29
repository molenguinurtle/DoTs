using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public int lootCollected; //This keeps track of the amount of Loot a Player has collected on the current level.

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {

    }
    /// <summary>
    /// This is the basic 4-way movement of every class
    /// </summary>
    private void Walk()
    {

    }

    /// <summary>
    /// This is called whenever a player runs into a hazard and we need to place them back where they were prior
    /// </summary>
    /// <param name="resetPosition">The position we reset the Player to</param>
    public void Reset(Vector3 resetPosition)
    {

    }

    /// <summary>
    /// Updates the Player's lootCollected by a given amount of Loot
    /// </summary>
    /// <param name="amount">The amount of Loot to add or subtract from lootCollected. To subtract Loot, pass in a negative number.</param>
    public void UpdateLoot(int amount)
    {
        lootCollected += amount;
    }
}
