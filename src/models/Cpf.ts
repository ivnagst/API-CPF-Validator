import  mongoose, { model, Schema, Model, Document } from "mongoose";

export interface cpfInterface  {
  cpf: Number;
  createdAt?: Date;
  id?: string;
}

export const cpfSchema = new mongoose.Schema<cpfInterface>({
  cpf: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  id: { type: String, required: false },
});


export const cpfModel = model("cpfDenyList", cpfSchema);

// const cpfModel = model<cpfInterface>(
//   "cpfDenyList",
//   new mongoose.Schema({
//     cpf: { type: Number, required: true },
//     createdAt: { type: Date, default: Date.now },
//     id: { type: String, required: false },
//   })
// );

export default cpfModel;
