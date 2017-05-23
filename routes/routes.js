const createTask = require('./../controller/create');
const getTask = require('./../controller/getData');
module.exports = function(app) {
  app.post('/create',createTask.post);
  app.get('/get',getTask.get);  
   app.get('*', function(req, res) {
      res.sendFile('index.html', { root: '/home/ttnd/testProjects/km-graphql/public/'});
    });
}