const express = require("express");
const Scheme = require("../models/schemeModel");
const { creatingSchema, updatingSchema, gettingAllSchema, deletingSchema } = require("../models/modelsController/schemaModelController");


// Create Scheme
const createScheme = async (req, res, next) => {
  try {
    const { schemeName, panLength } = req.body;
    const { id } = req.user;

    if (!creatingSchema(schemeName, panLength, id)) {
      res.status(404)
      next(new Error("Scheme creation failed"));
    }

    res.status(201).json({ 
      success: true,
      message: "Scheme created successfully" 
    });
  } catch (error) {
    res.status(500);
    next(new Error(error.message));
  }
}

// Update Scheme
const updateScheme = async (req, res, next) => {
  try {
    const { id } = req.user;
    const scheme = updatingSchema(req.params.id, ...req.body, id)

    if (!scheme) {
      res.status(404)
      next(new Error("Scheme not found"));
    }

    res.status(200).json({
      success: true,
      data: [
        scheme
      ]
    });

  } catch (error) {
    res.status(500);
    next(new Error(error.message));
  }
}

// Get All Schemes
const getAllSchemes = async (req, res) => {
  try {
    const { id } = req.user;

    const schemes = gettingAllSchema(id)
    if (!schemes) {
      res.status(404)
      next(new Error("No schemes found"));
    }

    res.status(200).json({
      success: true,
      data: [
        schemes
      ]
    });

  } catch (error) {
    res.status(500);
    next(new Error(error.message));
  }
}

// Delete Scheme
const deleteScheme = async (req, res) => {
  try {
    const { id } = req.user;
    if (!deletingSchema(req.params.id, id )) {
      res.status(404)
      next(new Error("Scheme not found"));
    }
    res.status(200).json({ 
      success: true,
      message: "Scheme deleted" 
    });
  } catch (error) {
    res.status(500);
    next(new Error(error.message));
  }
}

module.exports = { createScheme, updateScheme, deleteScheme, getAllSchemes };
