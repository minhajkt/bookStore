import mongoose, { Schema, Document } from "mongoose";

export interface IRevenue extends Document {
  authorId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  purchaseId: mongoose.Types.ObjectId;
  amount: number;
  createdAt: Date; 
  updatedAt: Date; 
}

const RevenueSchema = new Schema<IRevenue>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    purchaseId: {
      type: Schema.Types.ObjectId,
      ref: "Purchase",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<IRevenue>("Revenue", RevenueSchema);
