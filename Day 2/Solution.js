const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function getData(filename) {
  
  try {

    let data = fs.readFileSync(filename,'utf-8')
    return data

  } catch (err) {

    console.log('Error reading the file : ' + err.message)
    exit()

  }
}


if (isMainThread) {

    

  // Generate a random array with 1000 elements
  const arr = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100));

  // Split the array into 4 parts for the workers
  const chunkSize = Math.ceil(arr.length / 4);
  const chunks = Array.from({ length: 4 }, (_, i) => arr.slice(i * chunkSize, (i + 1) * chunkSize));

  // Create the workers and pass the chunks as workerData
  const workers = chunks.map((chunk) => new Worker(__filename, { workerData: chunk }));

  // Initialize the results array
  const results = Array.from({ length: 4 }, () => null);

  // Listen for messages from the workers and aggregate the results
  workers.forEach((worker, i) => {
    worker.on('message', (result) => {
      results[i] = result;
      const done = results.every((result) => result !== null);
      if (done) {
        const finalResult = results.reduce((acc, result) => acc + result, 0);
        console.log(`Final result: ${finalResult}`);
      }
    });
  });

} else {
  // This is a worker thread

  // Initialize the sum variable
  let sum = 0;

  // Loop until there are no more elements in the array
  while (workerData.length > 0) {
    // Pop an element from the array and perform the split, cast, and sum
    const num = workerData.pop();
    const split = num.toString().split('');
    const cast = split.map((char) => parseInt(char));
    const subSum = cast.reduce((acc, num) => acc + num, 0);

    // Add the sub-sum to the worker's sum variable
    sum += subSum;
  }

  // Send the result back to the main thread
  require('worker_threads').parentPort.postMessage(sum);
}