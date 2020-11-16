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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(specie => ids
    .some(id => id === specie.id));
}

function animalsOlderThan(animal, age) {
  const getAnimal = animals.find(specie => specie.name === animal)
    .residents.every((resident => resident.age >= age));
  return getAnimal;
}

function validateEmployeeName(employee, employeeName) {
  return (employee.firstName === employeeName) || (employee.lastName === employeeName);
}

function employeeByName(employeeName) {
  const noParams = {};
  if (!employeeName) return (noParams);

  const getEmployee = employees.find(employee => validateEmployeeName(employee, employeeName));
  return getEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return newEmployee;
}

function isManager(id) {
  const validateId = employees.some(employee => employee.managers
    .find(idAtual => idAtual === id));
  return validateId;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  let newEmployee = {};

  if (!managers || !responsibleFor) {
    newEmployee = {
      id,
      firstName,
      lastName,
      managers: [],
      responsibleFor: [],
    };
  } else {
    newEmployee = {
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
    };
  }

  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, animal) => {
      Object.assign(acc, { [animal.name]: animal.residents.length });
      return acc;
    }, {});
  }
  return (animals.find(animal => animal.name === species).residents.length);
}

function entryCalculator(entrants) {
  if (!entrants || (Object.entries(entrants).length === 0)) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const totalAdult = Adult * prices.Adult;
  const totalSenior = Senior * prices.Senior;
  const totalChild = Child * prices.Child;

  return (totalAdult + totalSenior + totalChild);
}

function animalMap(options) {
  // seu código aqui
}

const weekSchedule = {
  Tuesday: 'Open from 8am until 6pm',
  Wednesday: 'Open from 8am until 6pm',
  Thursday: 'Open from 10am until 8pm',
  Friday: 'Open from 10am until 8pm',
  Saturday: 'Open from 8am until 10pm',
  Sunday: 'Open from 8am until 8pm',
  Monday: 'CLOSED',
};

function schedule(dayName) {
  const daySchedule = {};
  if (!dayName) return weekSchedule;
  if (dayName === 'Monday') {
    daySchedule[dayName] = 'CLOSED';
  } else {
    daySchedule[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  }
  return daySchedule;
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
