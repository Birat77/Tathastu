import getRandomAnimals from '../utils/getRandomAnimals.ts';

const sampleData = [
  { id: 1, name: 'Ant' },
  { id: 2, name: 'Ant' },
  { id: 3, name: 'Cat' },
  { id: 4, name: 'Dog' },
  { id: 5, name: 'Elephant' },
  { id: 6, name: 'Fox' },
  { id: 7, name: 'Goat' },
];

const bigSampleData = getRandomAnimals(100000);

export {sampleData, bigSampleData};

