import React, { Component } from 'react';
import './App.css';

class ChartMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAttMenu: false,
            showTempMenu: false,
            showHumMenu: false,
        }
        this.toggleAttMenu = this.toggleAttMenu.bind(this);
        this.toggleHumMenu = this.toggleHumMenu.bind(this);
        this.toggleTempMenu = this.toggleTempMenu.bind(this);
        this.closeMenus = this.closeMenus.bind(this);
    }

    closeMenus() {
        this.setState({ showAttMenu: false, showHumMenu: false, showTempMenu: false });
    }

    //toggle display for menu and close other menus
    //call parent method to handle data and chart choice
    //could be simplified
    toggleAttMenu(e) {
        if (e.target.value !== "Att") {
            this.props.chartChoice(e.target.value);
            this.setState({
                showAttMenu: !this.state.showAttMenu,
                showTempMenu: false,
                showHumMenu: false
            });
        }
        else {
            this.setState({
                showAttMenu: !this.state.showAttMenu,
                showTempMenu: false,
                showHumMenu: false
            });
            this.props.dataChoice(e.target.value);
        }
    }

    toggleHumMenu(e) {
        if (e.target.value !== "Hum") {
            this.props.chartChoice(e.target.value);
            this.setState({
                showHumMenu: !this.state.showHumMenu,
                showAttMenu: false,
                showTempMenu: false
            });
        }
        else {
            this.setState({
                showHumMenu: !this.state.showHumMenu,
                showAttMenu: false,
                showTempMenu: false
            });
            this.props.dataChoice(e.target.value);
        }
    }

    toggleTempMenu(e) {
        if (e.target.value !== "Temp") {
            this.props.chartChoice(e.target.value);
            this.setState({
                showTempMenu: !this.state.showTempMenu,
                showAttMenu: false,
                showHumMenu: false
            });
        }
        else {
            this.setState({
                showTempMenu: !this.state.showTempMenu,
                showAttMenu: false,
                showHumMenu: false
            });
            this.props.dataChoice(e.target.value);
        }
    }

    render() {
        return (
            <div>
                <button className="dropdown button1" value="Att" onClick={this.toggleAttMenu}>Läsnäolo</button>
                {this.state.showAttMenu ?
                    <div className="dropdown-content">
                        <button className="button1" value="BarChart" onClick={this.toggleAttMenu}>Bar chart</button>
                        <button className="button1" value="LineChart" onClick={this.toggleAttMenu}>Line chart</button>
                        <button className="button1" value="DoughnutChart" onClick={this.toggleAttMenu}>Doughnut chart</button>
                    </div>
                    : null
                }
                <button className="dropdown button1" value="Temp" onClick={this.toggleTempMenu}>Lämpötila</button>
                {this.state.showTempMenu ?
                    <div className="dropdown-content">
                        <button className="button1" value="BarChart" onClick={this.toggleTempMenu}>Bar chart</button>
                        <button className="button1" value="LineChart" onClick={this.toggleTempMenu}>Line chart</button>
                        <button className="button1" value="DoughnutChart" onClick={this.toggleTempMenu}>Doughnut chart</button>
                    </div>
                    : null
                }
                <button className="dropdown button1" value="Hum" onClick={this.toggleHumMenu}>Kosteus</button>
                {this.state.showHumMenu ?
                    <div className="dropdown-content">
                        <button className="button1" value="BarChart" onClick={this.toggleHumMenu}>Bar chart</button>
                        <button className="button1" value="LineChart" onClick={this.toggleHumMenu}>Line chart</button>
                        <button className="button1" value="DoughnutChart" onClick={this.toggleHumMenu}>Doughnut chart</button>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default ChartMenu;