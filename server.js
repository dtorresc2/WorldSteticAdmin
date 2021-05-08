const handler = require('serve-handler');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/world-stetic-app'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/world-stetic-app/index.html'));
    return handler(request, response);
});

// const server = http.createServer((request, response) => {
//   // You pass two more arguments for config and middleware

//   // More details here: https://github.com/vercel/serve-handler#options
//   return handler(request, response);
// })
app.listen(process.env.PORT || 8080);

// server.listen(process.env.PORT || 8080, () => {
//   console.log('Running at http://localhost:3000');
// });