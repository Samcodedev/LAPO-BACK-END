const express = require("express");
const Card = require("../models/cardModel");

const router = express.Router();

// Create Card
const createCard = async (req, res) => {
  try {
    const { 
      cardName, 
      cardScheme, 
      description, 
      branchBlacklist, 
      blacklist,
      binPrefix, 
      expiration, 
      currency,
      fee
    } = req.body;

    const { id } = req.user;

    // Check required fields based on the model
    if (!cardName || !cardScheme || !binPrefix || !currency) {
      return res.status(400).json({ message: "Required fields: cardName, cardScheme, binPrefix, and currency must be provided" });
    }

    // Check if card with binPrefix already exists
    const cardExists = await Card.findOne({ binPrefix });
    if (cardExists) {
      return res.status(400).json({ message: "Card already exists" });
    }

    // Validate expiration date if provided
    if (expiration) {  
      const expirationDate = new Date(expiration);
      if (expirationDate < new Date()) {
        return res.status(400).json({ message: "Expiration date cannot be in the past" });
      }
    }

    // Create new card with all possible fields from the model
    const card = new Card({ 
      cardName, 
      cardScheme, 
      description, 
      branchBlacklist,
      blacklist: blacklist || false,
      binPrefix, 
      expiration, 
      currency,
      fee: fee || null, // Handle null fee
      user: id 
    });

    await card.save();

    if (card) {
      res.status(201).json({ message: "Card created successfully" });
    } else {
      res.status(400).json({ message: "Card creation failed" });
    }
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Card
const updateCard = async (req, res) => {
  try {
    const { id } = req.user;
    const card = await Card.findByIdAndUpdate(req.params.id, { ...req.body, user: id }, { new: true }); 

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    if (card) {
      res.status(200).json({ message: "Card updated successfully" });
    } else {
      res.status(400).json({ message: "Card update failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Get All Cards
const getAllCards = async (req, res) => {
  try {
    const { id } = req.user;
    const cards = await Card.find({ user: id });
    if (!cards) {
      return res.status(404).json({ message: "No cards found" });
    }
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}


// Delete Card
const deleteCard = async (req, res) => {
  try {
    const { id } = req.user;
    const card = await Card.findByIdAndDelete(req.params.id, { user: id });
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.json({ message: "Card deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = { createCard, updateCard, deleteCard, getAllCards };
