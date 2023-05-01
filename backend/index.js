const http = require('http');
const app = require('./src/server/app');
const connectDB = require('./src/config/db.config');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3005;

// Connect to database
connectDB();

const server = http.createServer(app);

server.listen(port, (error) => {
    if (error) return console.log(error);
    console.log(`Server listening on port: ${port}`);
});
