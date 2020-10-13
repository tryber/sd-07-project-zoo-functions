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

const { employees, animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const animalObj = data.animals;
  const arrOfIds = ids;

  const objAnimals = arrOfIds.map((id) => {
    const getAnimal = animal => animal.id === id;
    const searchAnimal = animalObj.find(getAnimal);
    return searchAnimal;
  });
  return objAnimals;
}

function animalsOlderThan(animal, age) {
  const getAnimal = specie => specie.name === animal;
  const findAnimal = data.animals.find((getAnimal));
  const verifyAge = findAnimal.residents.every(resident => resident.age > age);
  return verifyAge;
}

function employeeByName(employeeName) {
  const personName = employeeName;
  if (typeof personName === 'undefined') { return {}; }
  console.log(personName);
  const getPerson = person => personName === person.firstName || personName === person.lastName;
  const findPerson = data.employees.find(getPerson);
  return findPerson;
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, lastName, id } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { firstName, lastName, id, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  const arr = [];
  employees.map(element => element.managers.forEach(otherElement => arr.push(otherElement)));
  return arr.some(element => element === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {};
  employee.firstName = firstName;
  employee.lastName = lastName;
  employee.id = id;
  employee.responsibleFor = responsibleFor;
  employee.managers = managers;
  employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    const allAnimalsObj = animals.reduce((allAnimals, animal) => {
      allAnimals[animal.name] = animal.residents.length;
      return allAnimals;
    }, {});
    return allAnimalsObj;
  }
  const amountSpecie = data.animals.reduce((residentsLength, animalSelected) => {
    if (animalSelected.name === species) {
      residentsLength = (animalSelected.residents).length;
    }
    return residentsLength;
  }, 0);
  return amountSpecie;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === []) {
    return 0;
  }
  let total = 0;
  const { Adult, Child, Senior } = entrants;
  if (Adult !== undefined) { total += (Adult * 49.99) };
  if (Child !== undefined) { total += (Child * 20.99) };
  if (Senior !== undefined) { total += (Senior * 24.99) };
  return total;
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
