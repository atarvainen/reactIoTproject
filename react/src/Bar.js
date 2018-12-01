import React, { Component } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    //use default props if parent doesn't send any options
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'bottom'
    }

    //chart styling still a mess
    render() {
        return (
            <div className="chart">
                <Bar data={this.state.data}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: this.state.data.title,
                            fontSize: 15
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

export default BarChart;