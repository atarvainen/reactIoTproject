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

    toggleAttMenu(e) {
        if (this.state.showAttMenu === false) {
            this.props.getData(e.target.value);
        }
        this.setState({
            showAttMenu: !this.state.showAttMenu
        });
    }

    toggleHumMenu(e) {
        if (this.state.showHumMenu === false) {
            this.props.getData(e.target.value);
        }
        this.setState({
            showHumMenu: !this.state.showHumMenu
        });
    }

    toggleTempMenu(e) {
        if (this.state.showTempMenu === false) {
            this.props.getData(e.target.value);
        }
        this.setState({
            showTempMenu: !this.state.showTempMenu
        });
    }

    render() {
        return (
            <div>
                <button className="button1" value="Att" onClick={this.toggleAttMenu}>Läsnäolo</button>
                {this.state.showAttMenu ?
                    <div>
                        <button value="BarChart" onClick={this.props.chartChoice}>Bar chart</button>
                        <button value="LineChart" onClick={this.props.chartChoice}>Line chart</button>
                        <button value="DoughnutChart" onClick={this.props.chartChoice}>Doughnut chart</button>
                    </div>
                    : null
                }
                <button className="button1" value="Temp" onClick={this.toggleTempMenu}>Lämpötila</button>
                {this.state.showTempMenu ?
                    <div>
                        <button value="BarChart" onClick={this.props.chartChoice}>Bar chart</button>
                        <button value="LineChart" onClick={this.props.chartChoice}>Line chart</button>
                        <button value="DoughnutChart" onClick={this.props.chartChoice}>Doughnut chart</button>
                    </div>
                    : null
                }
                <button className="button1" value="Hum" onClick={this.toggleHumMenu}>Kosteus</button>
                {this.state.showHumMenu ?
                    <div>
                        <button value="BarChart" onClick={this.props.chartChoice}>Bar chart</button>
                        <button value="LineChart" onClick={this.props.chartChoice}>Line chart</button>
                        <button value="DoughnutChart" onClick={this.props.chartChoice}>Doughnut chart</button>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default ChartMenu;