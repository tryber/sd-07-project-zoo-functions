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

const { employees, prices, animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.reduce((acc, id) => acc.concat(data.animals.find((animal) => animal.id === id)), []);
}

function animalsOlderThan(animal, age) {
  const findAnimal = data.animals.find((creature) => creature.name === animal);
  return findAnimal.residents.every((isOlder) => isOlder.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(
    (employee) => employee.firstName === employeeName || employee.lastName === employeeName
  );
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, id, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { firstName, id, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some(
    (employee) => employee.id === id && employee.responsibleFor.length >= 4
  );
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species)
    return Object.fromEntries(data.animals.map((animal) => [animal.name, animal.residents.length]));
  const specieData = data.animals.find((animal) => animal.name === species);
  return specieData.residents.length;
}

function entryCalculator(entrants = 0) {
  let finalValue = 0;
  if (entrants.Adult) finalValue += data.prices.Adult * entrants.Adult;
  if (entrants.Senior) finalValue += data.prices.Senior * entrants.Senior;
  if (entrants.Child) finalValue += data.prices.Child * entrants.Child;
  return finalValue;
}

function animalMap(options) {
  const { animals } = data;
  const locations = ['NE', 'NW', 'SE', 'SW'];
  const genres = ['male', 'female'];

  if (!options || !options.includeNames) {
    const finalLocations = locations.map((location) => {
      const animalsLocation = animals.filter((animal) => animal.location === location);
      const animalsInfo = animalsLocation.map((animal) => animal.name);
      return [location, animalsInfo];
    });

    return Object.fromEntries(finalLocations);
  }

  const finalLocations = locations.map((location) => {
    const animalsLocation = animals.filter((animal) => animal.location === location);

    const formatedAnimals = animalsLocation.map((animalsInfo) => {
      const { name: specie, residents: infos } = animalsInfo;
      let names = infos.map((animalInfo) => animalInfo.name);

      genres.forEach((sex) => {
        const filteredSex = infos.filter((animal) => animal.sex === sex);
        if (options.sex === sex) names = filteredSex.map((animalInfo) => animalInfo.name);
      });

      if (options.sorted === true) names.sort();
      return { [specie]: names };
    });
    return [location, formatedAnimals];
  });

  return Object.fromEntries(finalLocations);
}

function timeConverter() {
  const hours = Object.values(data.hours);
  return hours.map((hour) => {
    const { open, close } = hour;
    return { open: `${open}am`, close: `${close - 12}pm` };
  });
}

function schedule(dayName) {
  const days = Object.keys(data.hours);
  const hours = timeConverter();

  const daysInfo = days.map((day, index) => {
    const { open, close } = hours[index];

    if (open !== '0am') return [day, `Open from ${open} until ${close}`];
    return [day, `CLOSED`];
  });

  const zoo = Object.fromEntries(daysInfo);

  if (!dayName) return zoo;
  return { [dayName]: zoo[dayName] };
}

function oldestFromFirstSpecies(id) {
  const { animals, employees } = data;

  const filteredId = employees.filter((employee) => employee.id === id);
  const filteredIdAnimal = filteredId.map((animals) => animals.responsibleFor).pop()[0];
  const filteredAnimals = animals.find((animal) => animal.id === filteredIdAnimal).residents;
  const oldest = filteredAnimals.reduce((previousAnimal, currentAnimal) => {
    const { age: ageP } = previousAnimal;
    const { age: ageC } = currentAnimal;

    if (ageP > ageC) return previousAnimal;
    return currentAnimal;
  });
  const { name, age, sex } = oldest;
  return [name, sex, age];
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
