import deliveryModel from "../model/delivery.js";

export const createDelivery = async (req, res) => {
    const { isDelivery } = req.body;
    try {
        const data = new deliveryModel({ isDelivery });
        const newDelivery = await data.save();
        res.status(201).json({ delivery: newDelivery });
    } catch (error) {
        console.log(error, "error");
        res.status(400).json({ error: error.message });
    }
};

export const getAllDelivery = async (req, res) => {
    try {
        const allDelivery = await deliveryModel.find({
        }).sort({
            createdAt: -1
        });
        res.status(200).json({ delivery: allDelivery });
    } catch (error) {
        res.status(400).json({ error: error?.message });
    }
};

export const updateDelivery = async (req, res) => {
    const { id } = req.params;
    const { isDelivery } = req.body;
    try {
        const updateDelivery = await deliveryModel.updateOne(
            { _id: id },
            { $set: { isDelivery } }
        );
        res.status(200).json({ delivery: updateDelivery });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
