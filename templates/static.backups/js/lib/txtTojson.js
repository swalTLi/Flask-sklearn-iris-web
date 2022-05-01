import fs from 'fs';
import readline from 'readline';

let rl = readline.createInterface({
  input: fs.createReadStream('./iris.txt'),
});
const array = [];
const flowerMap = {
  'Sepal.Length': 0,
  'Sepal.Width': 1,
  'Petal.Length': 2,
  'Petal.Width': 3,
  'Sepal.Species': 4,
};
rl.on('line', line => {
  const arr = line.split(' ');
  const map = {};
  for (const key in flowerMap) {
    map[key] = arr[flowerMap[key] + 1];
  }

  array.push(map);
});
rl.on('close', function () {
  fs.writeFile('output.json', JSON.stringify(array, '', '\t'), function (err) {
    if (err) {
      res.status(500).send('Server is error...');
    }
  })
});
