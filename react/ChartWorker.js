const self = this;

export default () => {
    self.addEventListener('message', e => {
        if (!e) return;
        let query = e.data;

        postMessage(query);
    });
};