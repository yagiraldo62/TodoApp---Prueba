import mongoose from 'mongoose';
const { ObjectId } = mongoose;
export default {
	Name: String,
	Description: String,
	DueDate: Date,
	Priority: {
		type: Number,
		enum: [1, 2, 3],
	},
	Completed: {
		type: Boolean,
		default: false,
	},
	CreatedAt: Date,
	CreatedBy: ObjectId,
};
