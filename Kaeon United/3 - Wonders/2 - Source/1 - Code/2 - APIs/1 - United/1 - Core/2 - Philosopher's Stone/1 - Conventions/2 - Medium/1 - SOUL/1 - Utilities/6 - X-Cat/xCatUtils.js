function activation(x) {
	return ((1 / (1 + Math.pow(Math.E, -x))) * 2) - 1;
}

function create(degree, random) {

	let matrix = [];

	for(let i = 0; i < degree; i++) {

		let vector = [];
		matrix.push(vector);
		
		for(let j = 0; j < degree; j++)
			vector.push({ weight: random ? ((Math.random() * 2 - 1)) : 0 });
	}

	let vector = [];
	
	for(let j = 0; j < degree; j++)
		vector.push({ state: random ? ((Math.random() * 2 - 1)) : 0 });

	return { matrix, vector };
}

function expand(model, degree) {

	degree += model.matrix.length;

	while(model.matrix.length < degree)
		model.matrix.push([]);

	for(let i = 0; i < model.matrix.length; i++) {

		while(model.matrix[i].length < degree)
			model.matrix[i].push({ weight: random ? Math.random() : 0 });
	}

	return model;
}

function scatter(model, degree) {

	for(let i = 0; i < model.matrix.length; i++) {

		for(let j = 0; j < model.matrix.length; j++) {

			model.matrix[j][i].weight =
				activation(
					model.matrix[j][i].weight +
						(((Math.random() * 2) - 1) * degree)
				);
		}
	}

	return model;
}

function step(model) {

	let result = [];

	for(let i = 0; i < model.vector.length; i++) {

		result.push({ });
		Object.apply(model.vector[i], result[i]);

		result[i].state = 0;

		for(let j = 0; j < model.vector.length; j++)
			result[i].state += model.vector[j].state * model.matrix[j][i].weight;

		result[i].state = activation(result[i].state);
	}

	return { matrix: model.matrix, vector: result };
}

module.exports = {
	activation,
	create,
	expand,
	scatter,
	step
};