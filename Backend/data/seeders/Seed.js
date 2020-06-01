export default (SeedClass) => {
	return new Promise((resolve, reject) => {
		const seed = new SeedClass();
		console.log(`\n--- Starting ${SeedClass.name}`);
		console.log(`---- ShouldRun?`);

		seed.shouldRun()
			.then((shouldRun) => {
				if (shouldRun) {
					console.log('----- Yes');
					console.log(`---- Running ${SeedClass.name}`);
					seed.run()
						.then((res) => {
							console.log(`----- ${SeedClass.name} ran successfully.`);
							console.log(`--- ${SeedClass.name} Finished.`);
							resolve(true);
						})
						.catch((err) => {
							console.log('Seedind process crashed');
							console.error(err);
							resolve(false);
						});
				} else {
					console.log('----- No');
					console.log(`--- ${SeedClass.name} Finished.`);
					return resolve(true);
				}
			})
			.catch((err) => {
				console.log('Seedind process crashed');
				console.error(err);
				resolve(false);
			});
	});
};
