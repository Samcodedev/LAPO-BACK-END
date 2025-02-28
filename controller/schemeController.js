const express = require("express");
const Scheme = require("../models/schemeModel");


// Create Scheme
const createScheme = async (req, res) => {
  try {
    const { schemeName, panLength } = req.body;
    const { id } = req.user;

    if (!schemeName || !panLength) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const scheme = new Scheme({ schemeName, panLength, user: id });
    await scheme.save();
    if (scheme) {
      res.status(201).json({ message: "Scheme created successfully" });
    } else {
      res.status(400).json({ message: "Scheme creation failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Update Scheme
const updateScheme = async (req, res) => {
  try {
    const { id } = req.user;
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, { ...req.body, user: id }, { new: true });

    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.status(200).json(scheme);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Get All Schemes
const getAllSchemes = async (req, res) => {
  try {
    const { id } = req.user;
    const schemes = await Scheme.find({ user: id });
    if (!schemes) {
      return res.status(404).json({ message: "No schemes found" });
    }
    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Delete Scheme
const deleteScheme = async (req, res) => {
  try {
    const { id } = req.user;
    const scheme = await Scheme.findByIdAndDelete(req.params.id, { user: id });
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.status(200).json({ message: "Scheme deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createScheme, updateScheme, deleteScheme, getAllSchemes };
