import React, { Component } from 'react';
import './App.css';

//Check for login and render appropriate view
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
        e.stopPropagation();

        this.setState({
            showAttMenu: !this.state.showAttMenu
        });
    }

    toggleHumMenu(e) {
        e.stopPropagation();

        this.setState({
            showHumMenu: !this.state.showHumMenu
        });
    }

    toggleTempMenu(e) {
        e.stopPropagation();

        this.setState({
            showTempMenu: !this.state.showTempMenu
        });
    }

    render() {
        return (
            <div>
                <button className="button1" onClick={this.toggleAttMenu}>Läsnäolo</button>
                {this.state.showAttMenu ?
                    <div>
                        <button value="BarChart" onClick={this.props.getAtt}>Bar chart</button>
                        <button value="LineChart" onClick={this.props.getAtt}>Line chart</button>
                        <button value="DoughnutChart" onClick={this.props.getAtt}>Doughnut chart</button>
                    </div>
                    : null
                }
                <button className="button1" onClick={this.toggleTempMenu}>Lämpötila</button>
                {this.state.showTempMenu ?
                    <div>
                        <button value="BarChart" onClick={this.props.getTemp}>Bar chart</button>
                        <button value="LineChart" onClick={this.props.getTemp}>Line chart</button>
                        <button value="DoughnutChart" onClick={this.props.getTemp}>Doughnut chart</button>
                    </div>
                    : null
                }
                <button className="button1" onClick={this.toggleHumMenu}>Kosteus</button>
                {this.state.showHumMenu ?
                    <div>
                        <button value="BarChart" onClick={this.props.getHum}>Bar chart</button>
                        <button value="LineChart" onClick={this.props.getHum}>Line chart</button>
                        <button value="DoughnutChart" onClick={this.props.getHum}>Doughnut chart</button>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default ChartMenu;