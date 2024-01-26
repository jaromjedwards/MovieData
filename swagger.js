const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: "Movies Api",
        description: "Movies Api",
        contact: {
            name: "Jarom Edwards",
            email: "jaromjedwards@gmail.com",
            url: "https://github.com/jaromjedwards?tab=repositories"
        }
    },
    host: 'localhost:3000',
    schemes: ['http']
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Validate the required information for Swagger documentation
if (!doc.info.title || !doc.info.description || !doc.info.contact || !doc.host || !doc.schemes) {
    console.error('Error: Insufficient information for Swagger documentation. Please provide title, description, contact, host, and schemes.');
    process.exit(1); // Exit the application if there's insufficient information
}

swaggerAutogen(outputFile, endpointsFiles, doc);
