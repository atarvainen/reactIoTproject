import React, { Component } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

    render() {
        return (
            <div className="chart">
                <Line data={this.state.data}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: this.state.data.title,
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

export default LineChart;
