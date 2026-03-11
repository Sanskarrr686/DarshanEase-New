const Temple = require("../models/Temple");

exports.getTemples = async (req, res) => {

  const temples = await Temple.find();

  res.json(temples);

};

exports.getTempleById = async (req, res) => {

  const temple = await Temple.findById(req.params.id);

  res.json(temple);

};

exports.createTemple = async (req, res) => {

  const temple = await Temple.create(req.body);

  res.json(temple);

};

exports.updateTemple = async (req, res) => {

  const temple = await Temple.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(temple);

};

exports.deleteTemple = async (req, res) => {

  await Temple.findByIdAndDelete(req.params.id);

  res.json({ message: "Temple deleted" });

};
