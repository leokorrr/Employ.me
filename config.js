const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    networkUrl: process.env.NETWORK_URL,
    frontendUrl: process.env.FRONTEND_URL
}