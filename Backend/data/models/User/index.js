import BuildModel from '../BuildModel';
import UserModel from './model';

class User {}

export default (db) => BuildModel(db, 'Users', UserModel, User);
