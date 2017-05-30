
const typeDefinitions = `
type User {
  id:Int
  name: String
  DOB: String
  mobile: String
  gender: String
  userId: Int
  tasks : [Task]
},
type Task {
  id: Int
  name: String
  date: String
  isCompleted: Boolean
  priority: Int
  userId: Int
  user: User
  users(id: Int) : [User]
},
type Query {
  tasks(userId: Int): [Task]
  users(id: Int):[User]
},
type Mutation{
  addTask(
    id: Int
    name: String
    date: String
    isCompleted: Boolean
    priority: Int
    userId: Int
  ):[Task]
}
schema {
  query: Query,
  mutation: Mutation
}
`;

module.exports = typeDefinitions;
