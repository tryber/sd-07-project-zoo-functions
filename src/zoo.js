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

const data = require ('./data');
const { animals, employees, prices, hours } = data;

function animalsByIds(ids) {
  let response;
  if (ids.length > 1) {
    response = animals.filter((animal, posicao) => animal.id === ids[posicao]);
  }
  if (ids.length === 1) {
    response = [animals.find(animal => animal.id === ids[0])];
  }
  if (ids.length === 0) {
    response = ids;
  }
  return response;
}

function animalsOlderThan(animal, age) {
  return animals.find(animalElement => animalElement.name === animal)
  .residents.every(residentElement => residentElement.age >= age);
}

function employeeByName(employeeName) {
  let response;
  if (employeeName === undefined) {
    response = {};
  } else {
    response = employees.find((element) => {
      let response2;
      if (element.firstName === employeeName || element.lastName === employeeName) {
        response2 = true;
      } else {
        response2 = false;
      }
      return response2;
    });
  }
  return response;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  let response;
  const managers = employees.find(employee => employee.managers.includes(id));
  if (managers !== undefined) {
    response = true;
  } else {
    response = false;
  }
  return response;
}

/* function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
} */

function animalCount(species) {
  let response = {};
  if (species === undefined) {
    animals.forEach(animal => (response[animal.name] = animal.residents.length));
  } else {
    response = animals.filter(animal => animal.name === species)
    .reduce((acc, animal) => (acc += animal.residents.length), 0);
  }
  return response;
}

function entryCalculator(entrants) {
  let totalPrice = 0;
  Object.keys(entrants).forEach(entrant => (totalPrice += prices[entrant] * entrants[entrant]));
  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function transformDay(objectParam) {
  const retorno = {};
  Object.entries(objectParam).forEach((elemento) => {
    retorno[elemento[0]] = `Open from ${elemento[1].open}am until ${elemento[1].close - 12}pm`;
    if (elemento[1].open === 0) {
      retorno[elemento[0]] = 'CLOSED';
    }
  });
  return retorno;
}

function schedule(dayName) {
  let response = hours;
  if (dayName !== undefined) {
    response = Object.entries(hours).find(elemento => elemento[0] === dayName);
    response = { [response[0]]: response[1] };
  }
  return transformDay(response);
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const arrayOfAnimalObj = (animals.find(animal => animal.id === animalId).residents);
  let result = arrayOfAnimalObj.reduce((previousAnimal, actualAnimal) => {
    if (actualAnimal.age > previousAnimal.age) {
      previousAnimal = actualAnimal;
    }
    return previousAnimal;
  });
  result = Object.values(result);
  return result;
}

function increasePrices(percentage) {
  percentage /= 100;
  if (percentage) {
    Object.entries(prices).forEach(([age, price]) => {
      const addPercent = percentage * price;
      let newPrice = Math.round((price + addPercent) * 100);
      newPrice /= 100;
      prices[age] = newPrice;
    });
  }
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
