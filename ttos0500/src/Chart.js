import React, { Component } from 'react';
import './App.css';
import {Bar, Line} from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barData: props.barData,
            lineData: props.lineData
        }
    }

static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right'
}

    render() {
        if(this.state.barData != null)
        {
            return (
                <div className="chart">
                    <Bar data={this.state.barData}
                        options={{
                            title: {
                                display: this.props.displayTitle,
                                text: this.props.title,
                                fontSize: 25
                            },
                            legend: {
                                display: this.props.displayLegend,
                                position: this.props.legendPosition
                            }
                        }}
                    />
                </div>
            )
        }

        else if(this.state.lineData != null)
        {
            return (
                <div className="chart">
                    <Line data={this.state.lineData}
                        options={{
                            title: {
                                display: this.props.displayTitle,
                                text: this.props.title,
                                fontSize: 25
                            },
                            legend: {
                                display: this.props.displayLegend,
                                position: this.props.legendPosition
                            }
                        }}
                    />
                </div>
            )
        }
    }
}

export default Chart;