import React, { Component } from 'react';
import './App.css';
import { Doughnut } from 'react-chartjs-2';

class DoughnutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: false,
        legendPosition: 'right'
    }

    render() {
        return (
            <div className="chart">
                <Doughnut data={this.state.data}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: this.props.data.title,
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

export default DoughnutChart;