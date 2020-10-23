const { animals, employees, hours, prices } = require('./data');
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

// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id
// Ao receber mais de um id, retorna um array com as espécies referentes aos ids

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(bicho => bicho.name === animal)
    .residents.every(resident => resident.age >= age);
}

// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário

function employeeByName(employeeName) {
  return Object.assign({},
    employees.find(
      employee => employee.firstName === employeeName ||
        employee.lastName === employeeName));
}

// Adiciona um funcionário no fim da lista

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

// Adiciona um funcionário no fim da lista

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const add = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(add);
}

// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade

function animalCount(species) {
  if (species === undefined) {
    const noInput = {};
    animals.forEach(animal => (noInput[animal.name] = animal.residents.length));
    return noInput;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

function entryCalculator(entrants) {
  if (entrants !== {} && entrants !== undefined) {
    const entrantKeys = Object.keys(entrants);
    return entrantKeys.reduce((acc, curr) => {
      acc += entrants[curr] * prices[curr];
      return acc;
    }, 0);
  }
  return 0;
}

// OPTIONS = OBJETO
// Quais opções OPTIONS PODE TER?
// includeNames = bool
// sorted = bool
// sex = string

// Sem parâmetros, retorna animais categorizados por localização
function retrieveLocations() {
  return ['NE', 'NW', 'SE', 'SW'];
}

function retrieveFilteredAnimalsByLocation(location) {
  return animals.filter(animal => animal.location === location);
}

function retrieveAnimalsByLocation(location) {
  const animalsByLocation = {};

  location.forEach((locat) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(locat)
      .map(animal => animal.name);
    if (filteredAnimals.length !== 0) animalsByLocation[locat] = filteredAnimals;
    // console.log(location)
    // console.log(filteredAnimals)
  });
  return animalsByLocation;
}

function retrieveAnimalsByLocationWithName(loc, sorted, sex) {
  const animalsByLocation = {};

  loc.forEach((location) => {
    // console.log(location)
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
        .filter((resident) => {
          const needFiltering = sex !== undefined;
          return needFiltering ? resident.sex === sex : true;
        })
        .map((resitent => resitent.name));

      if (sorted) residents.sort();

      return { [animalName]: residents };

      // console.log(animalName)
      // console.log(residents)
    });

    if (filteredAnimals.length !== 0) animalsByLocation[location] = filteredAnimals;

    console.log(filteredAnimals);
  });
  return animalsByLocation;
}

function animalMap(options) {
  const location = retrieveLocations();
  if (!options) return retrieveAnimalsByLocation(location);
  const { includeNames = false, sorted = false, sex } = options;
  if (includeNames) return retrieveAnimalsByLocationWithName(location, sorted, sex);
  return retrieveAnimalsByLocation(location);
}
// const options = { includeNames: true, sex: 'female' }
// const options = { includeNames: true, sex: 'female', sorted: true }
// const options = { includeNames: true, sorted: true };
// const options = { includeNames: true };
// console.log(animalMap(options));
// animalMap(options);

// Sem parâmetros, retorna um cronograma legível para humanos
// Se um único dia for passado, retorna somente este dia em um formato legível para humanos

function schedule(dayName) {
  const outPut = {};
  Object.keys(hours).forEach((hora) => {
    if (hours[hora].open === hours[hora].close) {
      outPut[hora] = 'CLOSED';
    } else outPut[hora] = `Open from ${hours[hora].open}am until ${hours[hora].close - 12}pm`;
  });
  if (dayName !== undefined) {
    return { [dayName]: outPut[dayName] };
  }
  return outPut;
}

function oldestFromFirstSpecies(id) {
  const findAnimal = animals
    .find(name => name.id === employees
      .find(emplouyee => emplouyee.id === id)
      .responsibleFor[0]);
  const oldestAnimal = findAnimal.residents
  .reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}
// oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992')
// const teste1 = '01422318-ca2d-46b8-b66c-3e9e188244ed'

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
