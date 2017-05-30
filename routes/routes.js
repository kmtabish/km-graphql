
const createTask = require('./../controller/create');
const addUser = require('./../controller/addUser');
const getTask = require('./../controller/getData');
const getUser = require('./../controller/getUser');
//GraphQL Routs
const bodyParser = require('body-parser');
const typeDefinitions = require('./../graphql/schema');
const resolveFunctions = require('./../graphql/resolver');
const { makeExecutableSchema } = require('graphql-tools');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');

module.exports = function(app) {
  app.post('/create',createTask.post);
  app.post('/adduser',addUser.post);  
  app.get('/get',getTask.get);  
  app.get('/getuser',getUser.get); 

  //GraphQL Codes
  const schema = makeExecutableSchema({
  typeDefs: typeDefinitions,
  resolvers: resolveFunctions,
  });
  //GraphiQL URL
  app.use('/api', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/gui', bodyParser.json(), graphiqlExpress({
   endpointURL: '/api'
  }));

   //Default route   
   app.get('*', function(req, res) {
      res.sendFile('index.html', { root: '/home/ttnd/testProjects/km-graphql/public/'});
    });
    
}