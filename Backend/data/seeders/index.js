import Seed from './Seed';
const Seeders = {};
export default async () => {
	const seeder = process.argv[2];
	console.log('Seed v1 \n');

	if (!Seeders[seeder]) {
		console.log(`\nSeeder ${seeder} is not registered\n`);
		console.log('\nProcess Finished.\n');

		process.exit();
	}

	console.log('Starting Seeding Process.... \n');
	await Seed(Seeders[seeder]);
	console.log('\nSeeding Process Finished.\n');
	process.exit();
};
