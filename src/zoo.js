/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    const error = [];
    return error;
  }
  const result = [];
  ids.forEach((item) => {
    const newItem = data.animals.find(element => element.id === item);
    result.push(newItem);
  });
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const someAnimal = data.animals.find(element => element.name === animal);
  const validation = someAnimal.residents.every(
    resident => resident.age >= age
  );
  return validation;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    const error = [];
    return error;
  }
  const result = data.employees.find(
    element =>
      element.firstName === employeeName || element.lastName === employeeName
  );
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    managers: managers,
    responsibleFor: responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(element => element.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  const newEmployee = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    managers: managers,
    responsibleFor: responsibleFor,
  };
  const result = data.employees;
  result.push(newEmployee);
  return result;
}

function animalCount(species) {
  if (species === undefined) {
    const result = {};
    data.animals.forEach(
      animal => (result[animal.name] = animal.residents.length)
    );
    return result;
  }
  return data.animals.find(element => element.name === species).residents
    .length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (
    Adult * data.prices.Adult +
    Child * data.prices.Child +
    Senior * data.prices.Senior
  );
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const result = {};
  const hours = data.hours;
  if (dayName === undefined) {
    for (const key in hours) {
      if (hours.hasOwnProperty(key)) {
        const element = hours[key];
        let { open, close } = element;
        result[key] = `Open from ${open}am until ${close - 12}pm`;
        if (key === 'Monday') {
          result[key] = 'CLOSED';
        }
      }
    }
    return result;
  }
  if (dayName === 'Monday') {
    result[dayName] = 'CLOSED';
    return result;
  }
  let { open, close } = hours[dayName];
  result[dayName] = `Open from ${open}am until ${close - 12}pm`;
  return result;
}

function oldestFromFirstSpecies(id) {
  const employeeResponsableFor = data.employees.find(
    element => element.id === id
  ).responsibleFor[0];
  const older = data.animals
    .find(element => element.id === employeeResponsableFor)
    .residents.sort((a, b) => b.age - a.age);
  return [older[0].name, older[0].sex, older[0].age];
}

function increasePrices(percentage) {
  const copy = data.prices;
  copy.Adult = copy.Adult * 100;
  copy.Child = copy.Child * 100;
  copy.Senior = copy.Senior * 100;
  copy.Adult = Math.round(
    (copy.Adult + (copy.Adult * percentage) / 100).toFixed(2)
  );
  copy.Child = Math.round(
    (copy.Child + (copy.Child * percentage) / 100).toFixed(2)
  );
  copy.Senior = Math.round(
    (copy.Senior + (copy.Senior * percentage) / 100).toFixed(2)
  );
  copy.Adult = (copy.Adult / 100).toFixed(2);
  copy.Child = (copy.Child / 100).toFixed(2);
  copy.Senior = (copy.Senior / 100).toFixed(2);
  return copy;
}

function employeeCoverage(idOrName) {
  const result = {};
  if (idOrName === undefined) {
    data.employees.forEach(element => {
      let completeName = `${element.firstName} ${element.lastName}`;
      result[completeName] = [];
      element.responsibleFor.forEach(idAnimal => {
        result[completeName].push(
          data.animals.find(animal => idAnimal === animal.id).name
        );
      });
    });
    return result;
  }
  const employee = data.employees.find(
    person =>
      idOrName === person.id ||
      idOrName === person.firstName ||
      idOrName === person.lastName
  );
  const employeeName = `${employee.firstName} ${employee.lastName}`;
  result[employeeName] = [];
  employee.responsibleFor.forEach(idAnimal => {
    result[employeeName].push(
      data.animals.find(animal => idAnimal === animal.id).name
    );
  });
  return result;
}
console.log(employeeCoverage());
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
