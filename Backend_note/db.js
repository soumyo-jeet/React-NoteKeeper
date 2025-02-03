const mongoose = require('mongoose');
const MONGOOSE_URI = 'mongodb://localhost:27017/iNoteDB?readPreference=primary&retryWrites=true&w=majority&appName=MongoDB%20Compass&directConnection=true&ssl=false';

const connectToMongo = () => {
    mongoose.connect(MONGOOSE_URI).then(() =>
        console.log("Connected to mongo")).catch((e) => console.log(e.message));
}

module.exports = connectToMongo;



// const MONGOOSE_URI = 'mongodb://localhost:27017/?readPreference=primary&retryWrites=true&w=majority&appName=MongoDB%20Compass&directConnection=true&ssl=false';
