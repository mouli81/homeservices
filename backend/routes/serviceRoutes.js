import express from "express";
import multer from "multer";
import {
  addService,
  getServices,
  getSingleService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

/*  MULTER CONFIG */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES */
router.get("/", getServices);
router.get("/:id", getSingleService);
router.post("/", upload.single("image"), addService);

//  THIS IS WHAT YOU WERE MISSING
router.put("/:id", upload.single("image"), updateService);

router.delete("/:id", deleteService);

export default router;
