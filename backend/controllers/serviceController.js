import Service from "../models/Service.js";

/*  ADD SERVICE */
export const addService = async (req, res) => {
  try {
    const { name, desc } = req.body;

    if (!name || !desc) {
      return res.status(400).json({ message: "Name and description required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const service = await Service.create({
      name,
      desc,
      image: `http://localhost:5000/uploads/${req.file.filename}`,
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*  GET ALL SERVICES */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*  GET SINGLE SERVICE */
export const getSingleService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res.status(404).json({ message: "Service not found" });

    res.json(service);
  } catch {
    res.status(400).json({ message: "Invalid service ID" });
  }
};

/*  UPDATE SERVICE (NAME / DESC / IMAGE) */
export const updateService = async (req, res) => {
  try {
    const { name, desc } = req.body;

    const updateData = {
      name,
      desc,
    };

    //  Update image ONLY if new image uploaded
    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*  DELETE SERVICE */
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
