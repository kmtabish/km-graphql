const express = require('express');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');

const PORT = process.env.PORT || 8888;

const app = express();
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
// const typeDefs = typeDefinitions
// const resolvers = resolveFunctions

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