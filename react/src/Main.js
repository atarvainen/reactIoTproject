import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Settings from './Settings';
import ChartMenu from './ChartMenu';
import BarChart from './Bar';
import DoughnutChart from './Doughnut';
import LineChart from './Line';
import loading from './loader.gif';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            token: props.token,
            isLoggedIn: props.isLoggedIn,
            attData: {},
            tempData: {},
            humData: {},
            error: null,
            attIsLoaded: false,
            tempIsLoaded: false,
            humIsLoaded: false,
            axisy: [],
            axisx: [],
            showSettings: false,
            showAttMenu: false,
            showTempMenu: false,
            showHumMenu: false,
            chartChoice: "",
            dataChoice: ""
        }
        this.toggleSettings = this.toggleSettings.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChartChoice = this.handleChartChoice.bind(this);
        this.handleDataChoice = this.handleDataChoice.bind(this);
        this.handleChartData = this.handleChartData.bind(this);
    }

    handleChartData(e) {
        if (e.data.title === "Temp") {
            this.setState({ tempData: e.data, tempIsLoaded: true })
        }
        else if (e.data.title === "Att") {
            this.setState({ attData: e.data, attIsLoaded: true })
        }
        else {
            this.setState({ humData: e.data, humIsLoaded: true })
        }
    }

    handleChartChoice(e) {
        this.setState({ chartChoice: e })
    }

    handleDataChoice(e) {
        this.setState({ dataChoice: e })
    }

    toggleSettings() {
        this.setState({ showSettings: !this.state.showSettings });
    }

    handleLogout() {
        this.setState({ 
            isLoggedIn: false, 
            attIsLoaded: false,
            tempIsLoaded: false,
            humIsLoaded: false,
        });
    }

    handleLogin() {
        this.setState({ isLoggedIn: true });
    }

    render() {
        let ChartType;
        let chart;
        let chartMenu;

        if (this.state.chartChoice === "BarChart") {
            ChartType = BarChart;
        }
        else if (this.state.chartChoice === "LineChart") {
            ChartType = LineChart;
        }
        else if (this.state.chartChoice === "DoughnutChart") {
            ChartType = DoughnutChart;
        }
        
        if (this.state.chartChoice !== "") {
            if (this.state.dataChoice === "Temp" && this.state.tempIsLoaded) {
                chart = <ChartType data={this.state.tempData} title={this.state.tempData.title} legendPosition="bottom" />
            }
            else if (this.state.dataChoice === "Att" && this.state.attIsLoaded) {
                chart = <ChartType data={this.state.attData} title={this.state.attData.title} legendPosition="bottom" />
            }
            else if (this.state.dataChoice === "Hum" && this.state.humIsLoaded) {
                chart = <ChartType data={this.state.humData} title={this.state.humData.title} legendPosition="bottom" />
            }
            else if (this.state.dataChoice !== "") {
                chart = <img src={loading} alt="Loading..."></img>
            }
        }
        else {
            chart = null;
        }

        if (this.state.isLoggedIn) {
            chartMenu = <ChartMenu dataChoice={this.handleDataChoice} chartChoice={this.handleChartChoice} getData={this.getData} />
        }

        else {
            chartMenu = <p>Please login or register to view data.</p>
        }

        return (
            <div className="App">
                <header className="App-header">
                    <Navbar handleChartData={this.handleChartData} login={this.handleLogin} logout={this.handleLogout} toggleSettings={this.toggleSettings} isLoggedIn={this.state.isLoggedIn} user={this.state.user} token={this.state.token} settings={this.handleSettingsClick} />
                </header>
                {this.state.showSettings ?
                    <Settings closeSettings={this.toggleSettings} />
                    : null
                }
                {chartMenu}
                {chart}
            </div>
        );
    }
}

export default Main;