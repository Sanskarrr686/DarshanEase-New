const Darshan = require("../models/Darshan");

exports.getDarshanSlots = async (req, res) => {

  const slots = await Darshan.find({ temple: req.params.templeId });

  res.json(slots);

};

exports.createDarshan = async (req, res) => {

  const darshan = await Darshan.create(req.body);

  res.json(darshan);

};

exports.deleteDarshan = async (req, res) => {

  await Darshan.findByIdAndDelete(req.params.id);

  res.json({ message: "Slot removed" });

};
