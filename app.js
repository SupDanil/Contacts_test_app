const  express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./Routes/auth.routes'))

const PORT = config.get('port') || 4000;

async function start(uri, callback){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        app.listen(PORT, () => console.log(PORT , "port"));
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
}

start();



