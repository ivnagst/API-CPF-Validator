import mongoose, { Schema, Document, model } from 'mongoose';
export interface cpfInterface extends Document {
	cpf: Number;
}

const cpfSchema: Schema = new Schema({
	id: { type: String },
	cpf: {
		type: Number,
		required: true,
	},
});

let cpfModel = mongoose.model<cpfInterface>('cpfdenylists', cpfSchema);

export default cpfModel;
