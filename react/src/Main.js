import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Settings from './Settings';
import ChartMenu from './ChartMenu';
import BarChart from './Bar';
import DoughnutChart from './Doughnut';
import LineChart from './Line';
import loading from './loader.gif';
import WebWorker from './WebWorker';
import TempFetch from './TempFetchWorker';
import AttFetch from './AttFetchWorker';
import HumFetch from './HumFetchWorker';
import { ip } from './ServerConf';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            token: props.token,
            ruuvi: props.ruuvi,
            isLoggedIn: props.isLoggedIn,
            hasTag: props.hasTag,
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
        this.handleLoginWithNoTag = this.handleLoginWithNoTag.bind(this);
        this.handleChartChoice = this.handleChartChoice.bind(this);
        this.handleDataChoice = this.handleDataChoice.bind(this);
        this.handleChartData = this.handleChartData.bind(this);
        this.fetchWithWorker = this.fetchWithWorker.bind(this);
    }

    //create workers for fetching and eventlisteners for them
    componentDidMount() {
        this.tempWorker = new WebWorker(TempFetch);
        this.attWorker = new WebWorker(AttFetch);
        this.humWorker = new WebWorker(HumFetch);

        this.tempWorker.addEventListener('message', event => {
            const chartData = event.data;
            this.handleChartData(chartData);
        });
        this.attWorker.addEventListener('message', event => {
            const chartData = event.data;
            this.handleChartData(chartData);
        });
        this.humWorker.addEventListener('message', event => {
            const chartData = event.data;
            this.handleChartData(chartData);
        });
    }

    //fetch temp, hum and attendance data with workers
    //api doesnt find right ruuvitag data so we cant fetch data with ruuvitagid
    //fetch still in debug mode, fetching all data from /api/data
    //url defined here so we could fetch from different urls
    fetchWithWorker() {
        let fetchData = {
            headers: this.state.headers,
            method: "get",
            url: (ip + "/api/data")
        }

        this.attWorker.postMessage(fetchData);
        this.humWorker.postMessage(fetchData);
        this.tempWorker.postMessage(fetchData);
    }

    //set proper states to true when data is loaded and store datas to state
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

    //set users chart choice to state and use later in render
    //also check if data was fetched, if not fetch again
    handleChartChoice(e) {
        this.setState({ chartChoice: e })

        //api returns us the api token inside quotes, need to remove them
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${sessionStorage.getItem('tok').replace(/"/g, '')}`
        };

        //send method, url and headers to workers
        let fetchData = {
            headers: headers,
            method: "get",
            url: (ip + "/api/data")
        }

        if (!this.state.attIsLoaded) {
            this.attWorker.postMessage(fetchData);
        }
        if (!this.state.humIsLoaded) {
            this.humWorker.postMessage(fetchData);
        }
        if (!this.state.tempIsLoaded) {
            this.tempWorker.postMessage(fetchData);
        }
    }

    //set users data choice to state, used later in render
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
            hasTag: false,
        });
    }

    handleLogin() {
        this.setState({ isLoggedIn: true, hasTag: true });
    }

    handleLoginWithNoTag() {
        this.setState({ isLoggedIn: true });
    }

    render() {
        let ChartType;
        let chart;
        let chartMenu;

        //set chart to users choice
        if (this.state.chartChoice === "BarChart") {
            ChartType = BarChart;
        }
        else if (this.state.chartChoice === "LineChart") {
            ChartType = LineChart;
        }
        else if (this.state.chartChoice === "DoughnutChart") {
            ChartType = DoughnutChart;
        }

        //use ChartType to convey different chart types
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
            //if chart has been selected but data hasn't been loaded yet display a loading icon
            else if (this.state.chartChoice !== "" && this.state.isLoggedIn) {
                chart = <img src={loading} alt="Loading..."></img>
            }
        }
        else {
            chart = null;
        }
        //if user is logged in, chartmenu is displayed
        if (this.state.isLoggedIn && this.state.hasTag) {
            chartMenu = <ChartMenu dataChoice={this.handleDataChoice} chartChoice={this.handleChartChoice} getData={this.getData} />
        }

        else if (this.state.isLoggedIn && !this.state.hasTag) {
            chartMenu = <p>Please register a RuuviTag to view its data. (Process not available yet)</p>
        }

        else {
            chartMenu = <p>Please login or register to view data.</p>
        }

        //if showSetting is true display settings, if not display null
        return (
            <div className="App">
                <header className="App-header">
                    <Navbar loginNoTag={this.handleLoginWithNoTag} fetchWithWorker={this.fetchWithWorker} handleChartData={this.handleChartData} login={this.handleLogin} logout={this.handleLogout} toggleSettings={this.toggleSettings} isLoggedIn={this.state.isLoggedIn} user={this.state.user} token={this.state.token} ruuvi={this.state.ruuvi} settings={this.handleSettingsClick} />
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