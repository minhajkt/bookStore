import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
  purchaseId: string;
  bookId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  purchaseDate: Date;
  price: number;
  quantity: number;
}

const PurchaseSchema = new Schema<IPurchase>(
  {
    purchaseId: { type: String, required: true, unique: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    purchaseDate: { type: Date, required: true, default: Date.now },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPurchase>(
  "Purchase",
  PurchaseSchema
);


