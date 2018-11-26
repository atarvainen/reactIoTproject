import React, { Component } from 'react';
import './App.css';
import BarChart from './Bar';
import DoughnutChart from './Doughnut';
import LineChart from './Line';
import Navbar from './Navbar';
import Settings from './Settings';

class Logged extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            token: props.token,
            isLoggedIn: props.isLoggedIn,
            barData: {},
            lineData: {},
            doughnutData: {},
            error: null,
            isLoaded: false,
            axisy: [],
            axisx: [],
            showSettings: false,
            showAttMenu: false,
            showTempMenu: false,
            showHumMenu: false,
            chartChoice: ""
        }
        this.toggleAttMenu = this.toggleAttMenu.bind(this);
        this.toggleHumMenu = this.toggleHumMenu.bind(this);
        this.toggleTempMenu = this.toggleTempMenu.bind(this);
        this.getHum = this.getHum.bind(this);
        this.getTemp = this.getTemp.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);
        this.closeMenus = this.closeMenus.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    closeMenus() {
        this.setState({ showAttMenu: false, showHumMenu: false, showTempMenu: false });
    }

    toggleAttMenu(e) {
        this.setState({
            showAttMenu: !this.state.showAttMenu
        });
    }

    toggleHumMenu(e) {
        this.setState({
            showHumMenu: !this.state.showHumMenu
        });
    }

    toggleTempMenu(e) {
        this.setState({
            showTempMenu: !this.state.showTempMenu
        });
    }

    fetchData(url, method, headers, chartChoice) {
        fetch(url, {
            method: method,
            headers: headers
        })
            .then((result) => {
                if (result.ok) {
                    return result.json();
                }
                throw result;
            })
            .then((result) => {
                this.setState({
                    data: {
                        labels: result.map(x => x.Time),
                        datasets: [
                            {
                                label: "Tag",
                                backgroundColor: "rgba(0,0,0,0.8)",
                                data: result.map(x => x.Temp)
                            }
                        ]
                    },
                    isLoaded: true,
                    axisy: result.map(x => x.Time),
                    axisx: result.map(x => x.Temp),
                    chartChoice: chartChoice
                });
            })
            .catch((error) => {
                if (error.name === "TypeError") {
                    alert("Failed connecting to login service.");
                }
                else {
                    error.json().then(err => { alert(err.error) });
                }
            });
    }

    getTemp(e) {
        console.log("getting temp");
        console.log(e.target.value);
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${sessionStorage.getItem('tok').replace(/"/g, '')}`,
        };
        this.fetchData("http://localhost:8000/api/tags", "get", headers, e.target.value);
    }

    getHum() {

    }

    toggleSettings() {
        this.setState({ showSettings: !this.state.showSettings });
    }

    render() {
        console.log("Rendering main");
        let ChartType;
        let chart;

        if (this.state.chartChoice === "BarChart") {
            ChartType = BarChart;
        }
        else if (this.state.chartChoice === "LineChart") {
            ChartType = LineChart;
        }
        else if (this.state.chartChoice === "DoughnutChart") {
            ChartType = DoughnutChart;
        }

        if (this.state.isLoaded) {
            chart = <ChartType data={this.state.data} title="Bar" legendPosition="bottom" />
        }

        return (
            <div className="App" onClick={this.closeMenus}>
                <header className="App-header">
                    <Navbar toggleSettings={this.toggleSettings} isLoggedIn={this.state.isLoggedIn} user={this.state.user} token={this.state.token} settings={this.handleSettingsClick} />
                </header>
                {this.state.showSettings ?
                    <Settings closeSettings={this.toggleSettings} />
                    : null
                }
                <div>
                    <button className="button1" onClick={this.toggleAttMenu}>Läsnäolo</button>
                    {this.state.showAttMenu ?
                        <div>
                            <button value="BarChart" onClick={this.getTemp}>Bar chart</button>
                            <button value="LineChart" onClick={this.getTemp}>Line chart</button>
                            <button value="DoughnutChart" onClick={this.getTemp}>Doughnut chart</button>
                        </div>
                        : null
                    }
                    <button className="button1" onClick={this.toggleTempMenu}>Lämpötila</button>
                    {this.state.showTempMenu ?
                        <div>
                            <button value="BarChart" onClick={this.getTemp}>Bar chart</button>
                            <button value="LineChart" onClick={this.getTemp}>Line chart</button>
                            <button value="DoughnutChart" onClick={this.getTemp}>Doughnut chart</button>
                        </div>
                        : null
                    }
                    <button className="button1" onClick={this.toggleHumMenu}>Kosteus</button>
                    {this.state.showHumMenu ?
                        <div>
                            <button value="BarChart" onClick={this.getTemp}>Bar chart</button>
                            <button value="LineChart" onClick={this.getTemp}>Line chart</button>
                            <button value="DoughnutChart" onClick={this.getTemp}>Doughnut chart</button>
                        </div>
                        : null
                    }
                    {chart}
                </div>
            </div>
        );
    }
}

export default Logged;
