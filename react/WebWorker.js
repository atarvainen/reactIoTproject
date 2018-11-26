export default class WebWorker {
    constructor(worker) {
        const code = worker.toString();
        const blob = new Blob(['(' + code + ')()']);
        console.log(URL.createObjectURL(blob));
        return new Worker(URL.createObjectURL(blob));
    }
}