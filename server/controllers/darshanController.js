const Darshan = require("../models/Darshan");

exports.getDarshanDetails = async (req, res) => {
  try {
    const darshan = await Darshan.findById(req.params.id).populate("temple");
    if (!darshan) {
      return res.status(404).json({ message: "Darshan not found" });
    }
    res.json(darshan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
