const db = require("../data/db-config.js");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .where({ scheme_id: id })
    .orderBy("steps.step_number");
}

function add(newScheme) {
  return db("schemes").insert(newScheme);
}
function addStep(step, scheme_id) {
  step.scheme_id = scheme_id;
  return db("steps").insert(step);
}
function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  findSteps,
  addStep,
  add,
  update,
  remove
};
