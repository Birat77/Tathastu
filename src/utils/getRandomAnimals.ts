const animalNames = [
  'Ant', 'Bear', 'Cat', 'Dog', 'Elephant', 'Fox', 'Giraffe', 'Hippo', 'Iguana', 'Jaguar',
  'Kangaroo', 'Lion', 'Monkey', 'Narwhal', 'Ostrich', 'Penguin', 'Quokka', 'Rabbit', 'Snake',
  'Tiger', 'Urial', 'Vulture', 'Walrus', 'Xerus', 'Yak', 'Zebra', 'Alligator', 'Buffalo',
  'Cheetah', 'Dolphin', 'Eagle', 'Flamingo', 'Gorilla', 'Hyena', 'Impala', 'Jackal', 'Koala',
  'Lemur', 'Meerkat', 'Newt', 'Octopus', 'Panda', 'Quail', 'Raccoon', 'Seal', 'Toucan',
  'Umbrellabird', 'Viper', 'Whale', 'X-ray Tetra', 'Yabby', 'Zebu',
];

const getRandomAnimals = (count: number) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    const randomAnimal = animalNames[Math.floor(Math.random() * animalNames.length)];
    data.push({
      id: i,
      name: `${randomAnimal} ${i}`,
    });
  }
  return data;
};

export default getRandomAnimals;
