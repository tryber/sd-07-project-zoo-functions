/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  const animalsObj = ids.map(uniqueId =>
    data.animals.find(animal => animal.id === uniqueId),
  );
  return ids ? animalsObj : [];
}

function animalsOlderThan(animal, age) {
  const typeAnimalFound = data.animals.find(
    eachAnimal => eachAnimal.name === animal,
  );
  return typeAnimalFound.residents.every(
    residentAnimal => residentAnimal.age >= age,
  );
}

function employeeByName(employeeName) {
  const objectEmployee = data.employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
  return employeeName ? objectEmployee : {};
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  const result = data.employees.some(employee =>
    employee.managers.some(managerId => managerId === id),
  );
  return result;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  const noParameter = {};
  data.animals.forEach((animal) => {
    noParameter[animal.name] = animal.residents.length;
  });
  const animalSpecieFound = data.animals.find(
    animal => animal.name === species,
  );
  const result = species ? animalSpecieFound.residents.length : noParameter;
  return result;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'object') {
    const emptyObject =
      Object.keys(entrants).length === 0 && entrants.constructor === Object;

    const prices = {
      Adult: 49.99,
      Child: 20.99,
      Senior: 24.99,
    };
    let valor = 0;
    Object.keys(entrants).forEach((keyParticipant) => {
      valor += prices[keyParticipant] * entrants[keyParticipant];
    });
    return emptyObject ? 0 : valor;
  }
  return entrants ? null : 0;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
