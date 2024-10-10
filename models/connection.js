const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://amiryakdi:ZQnw7yLIBGdRwKup@myfirstdatabase.voinl.mongodb.net/twitter';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
    .then(() => console.log('Database connected'))

    .catch(error => console.error(error));
