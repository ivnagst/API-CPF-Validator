// import { Promise } from "bluebird";
import mongoose from "mongoose";
// Promise.promisifyAll(mongoose);

const cpfSchema = new mongoose.Schema(
    {
        id: { type: String },
        cpf: {
            type: Number,
            required: true,
        }
    }
);

const cpfModel = mongoose.model('cpfDenyList', cpfSchema);

export default cpfModel;