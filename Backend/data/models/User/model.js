export default {
	Name: {
		type: String,
	},
	Email: {
		type: String,
		unique: true,
	},
	Password: {
		type: String,
	},
};
