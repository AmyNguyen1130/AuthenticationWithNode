
// //Import các thư viện cần dùng
// var express = require('express');
// var { graphqlHTTP } = require('express-graphql');
// var { buildSchema } = require('graphql');

// // Xây dựng một Schema, sử dụng ngôn ngữ Schema GraphQL
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   },

//   type Character {
//     apple: String
//   }
// `);

// // Root cung cấp chức năng phân giải cho mỗi endpoint API
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
//   apple: () => {
//     return 'this is apple';
//   }
// };

// //Tạo server với express
// var app = express();

// //Khai báo API graphql
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true, //sử dụng công cụ GraphiQL để đưa ra các query GraphQL theo cách thủ công
// }));

// // Khởi tạo server tại port 4000
// app.listen(4000);
// console.log('Running a GraphQL API server at http://localhost:4000/graphql');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/APIauthentication').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

//declare server
const app = express();
app.use(cors());

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
//routes
app.use('/users', require('./routes/users'));
//start the server
const port = process.env.port || 5000;
app.listen(port);
console.log('Server listens to ${port}', port);