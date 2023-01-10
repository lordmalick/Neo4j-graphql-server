const db = require('./driver');
async function executeCypherQuery(statement, params = {}) {
    try {
      const session = db.driver.session();
      const result = session.run(statement, params);
     // session.close();
      return result;
    } catch (error) {
      throw error; // we are logging this error at the time of calling this method
    }
  }
  async function updateId(statement, params = {}) {
    try {
      const session = db.driver.session();
      const result = session.run(statement, params);
      //session.close();
      return result;
    } catch (error) {
      throw error; // we are logging this error at the time of calling this method
    }
  }
async function findAll(statement, params = {}) {
    try {
      const session = db.driver.session();
      const result = session.run(statement, params);
     // session.close();
      return result;
    } catch (error) {
      throw error; // we are logging this error at the time of calling this method
    }
  }
  async function findAllPlayerAndTheirClub(statement, params = {}) {
    try {
      const session = db.driver.session();
      const result = session.run(statement, params);
     // session.close();
      return result;
    } catch (error) {
      throw error; // we are logging this error at the time of calling this method
    }
  }
module.exports = { executeCypherQuery,findAll,updateId,findAllPlayerAndTheirClub};