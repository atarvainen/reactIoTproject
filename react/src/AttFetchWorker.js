const self = this;

// Export worker
export default () => {
    self.addEventListener('message', e => {
        if (!e) return;
        let query = e.data;
        
        
        fetch(query.url, {
            method: query.method,
            headers: query.headers
        })
        .then((result) => {
            if (result.ok) {
                return result.json();
            }
            throw result;
        })
        .then((result) => {
            let tulos = ({
                data: {
                    labels: result.map(x => x.Time),
                    datasets: [
                        {
                            label: "Time",
                            backgroundColor: "rgba(0,0,0,0.8)",
                            data: result.map(x => x.Temp)
                        }
                    ],
                    title: "Att"
                },
                isLoaded: true,
                axisy: result.map(x => x.Time),
                axisx: result.map(x => x.Att),
            });

            postMessage(tulos);
        })
        .catch((error) => {
            if (error.name === "TypeError") {
                console.log("Failed fetching");
            }
            else {
                console.log("error", error);
                error.json().then(err => { console.log(err.error) });
            }
        });
    });
};
