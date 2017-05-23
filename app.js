const express = require('express');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const methodOverride = require('method-override');
const app = express();
//require mongoose node module
const mongoose = require('mongoose');


const PORT = process.env.PORT || 8888;
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUTapp.use(express.static(__dirname + '/public'));
require('./routes/routes')(app);;

const typeDefinitions = `
type Author {
  id: Int! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  posts: [Post] # the list of Posts by this author
}
type Post {
  id: Int!
  title: String
  votes: Int
  author: Author
}
# the schema allows the following query:
type Query {
  posts: [Post]
  author(id: Int!): Author # author query must receive an id as argument
}
# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: Int!
  ): Post
}
# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;
const resolveFunctions = {
  Query: {
    posts() {
      return posts;
    },
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts(author) {
      return filter(posts, { authorId: author.id });
    },
  },
  Post: {
    author(post) {
      return find(authors, { id: post.authorId });
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs: typeDefinitions,
  resolvers: resolveFunctions,
});

app.use('/api', bodyParser.json(), graphqlExpress({ schema }));
app.use('/gui', bodyParser.json(), graphiqlExpress({
  endpointURL: '/api'
}));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});