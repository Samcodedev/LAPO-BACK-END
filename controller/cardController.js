const express = require("express");
const Card = require("../models/cardModel");
const { findCardWithBinPrefix, findCardById, getAllCard, deleteSingleCard } = require("../models/modelsController/cardModelController");
const { expirationDate } = require("../logic/logics");

// Create Card
const createCard = async (req, res, next) => {
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

    if (await findCardWithBinPrefix(binPrefix)) {
        res.status(400);
        next(new Error("Card already exists"));
    }

    if (expiration) {  
      if (expirationDate(expiration) < new Date()) {
        res.status(400);
        next(new Error("Expiration date cannot be in the past"));
      }
    }

    const card = new Card({ 
      cardName, 
      cardScheme, 
      description, 
      branchBlacklist,
      blacklist: blacklist || false,
      binPrefix, 
      expiration, 
      currency,
      fee: fee || null,
      user: id 
    })

    if (!await card.save()) {
      res.status(400);
      next(new Error("A problem was encountered while creating card try again"));
    }

    res.status(201).json({ 
      success: true,
      message: "Card created successfully" 
    });

  } catch (error) {
    res.status(500);
    next(new Error(error.message));
  }
};

// Update Card
const updateCard = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!await findCardById(req.params.id)) {
      res.status(404);
      next(new Error("Card not found"));
    }

    if (!await Card.findByIdAndUpdate(req.params.id, { ...req.body, user: id }, { new: true })) {
      res.status(404).json({
        success: true,
        message: "Card not found" 
      });
    }
    res.status(200).json({ 
      success: true,
      message: "Card updated successfully" 
    });

  } catch (error) {
    res.status(500);
    next(new Error(error.message));
  }
}

// Get All Cards
const getAllCards = async (req, res, next) => {
  try {
    const { id } = req.user;

    const cards = await getAllCard(id)
    if (!cards) {
      res.status(404);
      next(new Error("No cards found"));
    }

    res.status(200).json({
      success: true,
      data: cards
    })
  } catch (error) {
    res.status(500);
    next(new Error(error.message));
  }
}


// Delete Card
const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    if (!await deleteSingleCard(req.params.id, id)) {
      res.status(404);
      next(new Error("Card not found"));
    }

    res.status(200).json({
      success: true,
      message: "Card deleted"
    })
    
  } catch (error) {
    res.status(500);
    next(new Error(error.message));
  }
}


module.exports = { createCard, updateCard, deleteCard, getAllCards };
