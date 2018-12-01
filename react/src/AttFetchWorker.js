const self = this;

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
            //set fetch results as data object for chart.js
            //time as x, temp as y
            .then((result) => {
                let res = ({
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

                postMessage(res);
            })
            .catch((error) => {
                //if api is not available, type error is raised
                if (error.name === "TypeError") {
                    console.log("Failed fetching");
                }
                //else we can parse the error message api sends us
                else {
                    console.log("error", error);
                    error.json().then(err => { console.log(err.error) });
                }
            });
    });
};