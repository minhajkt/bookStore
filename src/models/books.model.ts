import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  bookId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  authors: mongoose.Types.ObjectId[]; 
  sellCount: number;
}

const BookSchema = new Schema<IBook>(
  {
    bookId: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true, min: 100, max: 1000 },
    authors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    sellCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", BookSchema);
