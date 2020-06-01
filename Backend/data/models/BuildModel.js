/**
 * @function
 * @param db mongoose Instance
 * @param name Model - Collection Name
 * @param SchemaModel collection model as json structure
 * @param LoadableClass Class to apply to the collection model
 * @returns Mongoose Model with class applied
 *
 * - DBModels are functions that take a mongoose Instance
 * - Builds the Schema passing the model as a json structure to the constructor
 * - Apply logic actions to model by loading a class with the required features
 * - Returns Model with adiccional logic Fuctions
 */
export default (db, name, SchemaModel, LoadableClass = null) => {
	const Schema = db.Schema;
	const model = db.model;
	let schema = new Schema(SchemaModel);

	// Apply logic actions to mongoose Schema by loading a class with the required features
	if (LoadableClass) schema.loadClass(LoadableClass);

	return model(name, schema);
};

// Apply UpdatedAt and UpdatedBy fields
export const updatedAtInfo = (doc, user) => {
	doc.UpdatedAt = Date.now();
	doc.UpdatedBy = user;
	return doc;
};

// Apply CreatedAt and CreatedBy fields
export const createdAtInfo = (doc, user) => {
	doc.CreatedAt = Date.now();
	doc.CreatedBy = user;
	return doc;
};
