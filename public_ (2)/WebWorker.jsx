
// export default class WebWorker {
//     constructor(worker) {
//         const code = worker.toString();
//         const blob = new Blob(['('+code+')()']);
//         return new Worker(URL.createObjectURL(blob));
//     }
// }

export default class WebWorker {
    constructor(workerFunction) {
      const workerCode = workerFunction.toString();
      const workerBlob = new Blob([`(${workerCode})()`]);
      return new Worker(URL.createObjectURL(workerBlob));
    }
  }