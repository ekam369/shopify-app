import { Schema, model } from 'mongoose';


const deliverySchema = Schema({
    isDelivery: {
        type: Boolean,
        require: true
    }
}, {
    versionKey: false,
    timestamps: true
})



export default model("delivery", deliverySchema)