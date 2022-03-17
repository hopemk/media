const mongoose = require('mongoose')

const url = `mongodb+srv://sample_user:<password>@my-sample-cluster-b3ugy.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

async function connectToDatabase(){
   return await mongoose.connect(url,connectionParams)
    .then( () => {
        return 'Connected to database '
    })
    .catch( (err) => {
        return `Error connecting to the database. \n${err}`
    })
}
module.exports = connectToDatabase