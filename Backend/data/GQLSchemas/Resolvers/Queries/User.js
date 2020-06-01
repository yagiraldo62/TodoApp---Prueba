import { Me as me } from '../../../modules/Authentication';
const Me = (root, params, { decoded }) => {
	return new Promise(async (resolve, reject) => {
		const UserId = decoded.sub;
		const user = await me(UserId);
		resolve(user);
	});
};

export default { Me };
