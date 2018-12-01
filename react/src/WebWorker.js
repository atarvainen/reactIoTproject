//converting worker to url so workers can be used alongside main site
export default class WebWorker {
    constructor(worker) {
        const code = worker.toString();
        const blob = new Blob(['(' + code + ')()']);
        return new Worker(URL.createObjectURL(blob));
    }
}