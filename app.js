const express = require('express');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const PORT = process.env.PORT || 8888;

const app = express();

const schema = makeExecutableSchema({
  // typeDefs,
  // resolvers
});

app.use('/api', bodyParser.json(), graphqlExpress({ schema }));
app.use('/gui', bodyParser.json(), graphiqlExpress({
  endpointURL: '/api'
}));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});