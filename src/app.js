import "dotenv/config.js";
import handlebars from 'express-handlebars'

import * as path from 'path';
import express, { json, urlencoded } from 'express';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorhandler.js';
import { sequelize } from './models/index.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

//Loads the handlebars module
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.join(__dirname, '../public')


//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars({
    layoutsDir: path.join(publicDirectory, '../src/views/layouts/'),
    extname: 'hbs',
    partialsDir: path.join(publicDirectory, '../src/views/partials/')
}));

// setup static directory to serve 
app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', { layout: 'index' });
});

const port = process.env.PORT || 3000
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/', routes);
app.use(errorHandler);
sequelize.sync();
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}).on('error', (error) => {
    console.log(error)
});
