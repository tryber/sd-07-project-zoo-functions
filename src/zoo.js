const { animals } = require('./data');
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
  const arrayAnimal = [];

  if (!ids) {
    return arrayAnimal;
  }

  const animalsId = ids.map(animal => data.animals.find(element => element.id === animal));

  return animalsId;
}
function animalsOlderThan(animal, age) {
  const specie = data.animals.find(animalsName => animals.name === animalsName);

  const lifes = specie.residents.every(testAge => testAge.age >= age);

  return lifes;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const names = data.employees.find(
    name => name.firstName === employeeName || name.lastName === employeeName);
  return names;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const manager = data.employees.some(managed => managed.managers.includes(id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employeeAdded = { id, firstName, lastName, managers: [], responsibleFor: [] };

  if (id) {
    employeeAdded.id = id;
  }
  if (firstName) {
    employeeAdded.firstName = firstName;
  }
  if (lastName) {
    employeeAdded.lastName = lastName;
  }
  if (managers) {
    employeeAdded.managers = managers;
  }
  if (responsibleFor) {
    employeeAdded.responsibleFor = responsibleFor;
  }

  data.employees.push(employeeAdded);
}

function animalCount(species) {
  if (!species) {
    const totalNumbers = {};
    data.animals.forEach((specie) => {
      totalNumbers[specie.name] = specie.residents.length;
    });
    return totalNumbers;
  }
  const animalsType = data.animals.find(numbers => numbers.name === species);
  const animalsNumbers = animalsType.residents.length;

  return animalsNumbers;
}

console.log(animalCount());

function entryCalculator(entrants) {
  // seu código aqui
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
