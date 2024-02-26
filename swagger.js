const swaggerAutogen = require('swagger-autogen')();

// swagger config
const doc = {
	info: {
		title: 'GVM Task API',
		description: 'Swagger Documentation for GVM Task API',
	},
	schemes: ['http', 'https'],
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./routes/tasks.js', './routes/upload.js', './routes/auth.js']; // Update with the correct paths

swaggerAutogen(outputFile, endpointsFiles, doc);
