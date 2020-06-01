module.exports = {
	// Jwt secret key
	key: 'MiclaveUltrasecreta',

	// mongo db host ip
	MongoUrl: process.env.MONGODB_SERVER || 'mongodb://localhost:27017/Todo',

	// AWS s3 credentials
	S3: {
		AWS_ACCESS_KEY: 'AKIAJFN6SZ2WBKCJRLIA',
		AWS_SECRET_ACCESS_KEY: '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',
		Bucket: 'andgir',
	},
};
