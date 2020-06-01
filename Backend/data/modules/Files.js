import { S3 } from '../../config';
// AWS Credentials
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, Bucket } = S3;
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
	accessKeyId: AWS_ACCESS_KEY,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

// File Upload
export const FileUpload = ({ data, name }) => {
	const type = fileType(name);
	const Key = generateFileName(type);
	const params = {
		Bucket, // bucket name
		Key, // file will be saved as [bucket name]/[key]
		Body: data,
	};
	s3.upload(params, function (s3Err, data) {
		if (s3Err) throw s3Err;
	});

	return Key;
};

export const GetFile = (img) => {
	return new Promise((resolve, reject) => {
		var params = { Bucket, Key: img };
		s3.getObject(params, function (err, data) {
			if (err) reject(err);
			console.log(data);
			resolve(data);
		});
	});
};

// generates a random name to file
const generateFileName = (type, length = 8) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	const unixDate = Math.round(new Date().getTime() / 1000);
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	result += `${unixDate}.${type}`;
	return result;
};

// get the file extension
const fileType = (name) => name.split('.')[1];
