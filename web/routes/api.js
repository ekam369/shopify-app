import express from "express";
import { createDelivery, getAllDelivery, updateDelivery } from "../controllers/deliveryController.js";

const api = express.Router();

api.get('/', getAllDelivery)
api.post('/', createDelivery)
api.put('/:id', updateDelivery)


export default api