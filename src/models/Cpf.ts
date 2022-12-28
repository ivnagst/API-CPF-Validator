import mongoose, { Schema, Document } from 'mongoose';
export interface cpfInterface extends Document {
	cpf: number;
}

const cpfSchema: Schema = new Schema({
	id: { type: String },
	cpf: {
		type: Number,
		required: true,
	},
});

const cpfModel = mongoose.model<cpfInterface>('cpfdenylists', cpfSchema);

export default cpfModel;
