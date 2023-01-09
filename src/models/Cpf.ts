import mongoose, { Schema } from 'mongoose';
import { ICpf } from 'src/interfaces/cpf.interface';
// export interface cpfInterface extends Document {
// 	cpf: number;
// }

const cpfSchema: Schema = new Schema({
	id: { type: String },
	cpf: {
		type: Number,
		required: true,
	},
});

const cpfModel = mongoose.model<ICpf>('cpfdenylists', cpfSchema);

export default cpfModel;
