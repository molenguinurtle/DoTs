using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Loot : MonoBehaviour
{
    public int lootAmount = 50; //This is the amount of Loot we will award the Player when this is collected
    [SerializeField] private bool _isActive = true;
    [SerializeField] private Renderer _lootRenderer;
    void Start()
    {
        _lootRenderer = GetComponent<Renderer>();
    }

    public virtual void OnTriggerEnter(Collider other)
    {
        if (other.GetComponent<Player>() && _isActive)
        {
            other.GetComponent<Player>().UpdateLoot(lootAmount);
            DeactivateLoot();
        }
        Debug.Log(other.gameObject.name + " collected " + lootAmount + " Loot!");
    }

    private void DeactivateLoot()
    {
        _lootRenderer.enabled = false;
        _isActive = false;
    }

    public void ActivateLoot()
    {
        _lootRenderer.enabled = true;
        _isActive = true;
    }
}
