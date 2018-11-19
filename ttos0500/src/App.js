import React, { Component } from 'react';
import './App.css';
import Chart from './Chart'
import Navbar from './Navbar'

class App extends Component {
  constructor() {
    super();
    this.state = {
      barData: {},
      lineData: {},
      error: null,
      isLoaded: false,
      products: []
    }
  }

  componentWillMount() {
    this.getChartData();
  }

  componentDidMount() {
    fetch("http://172.20.10.13/api/articles",{
		mode: "cors",
		headers: {
			"authorization":"Bearer mFJNtZUMkGuoykjNg7dzZP4GBZoPTovVyYPMtsvDu2K5GBerjw33SW1XSeao",
		}
	})
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            products: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log(this.state.error);
        }
      )
  }

  getChartData() {
    // Ajax calls here
    this.setState({
      barData: {
        labels: ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai"],
        datasets: [
            {
              label: "Hannu",
              backgroundColor: "rgba(0,0,0,0.8)",
              data: [3, 2, 5, 6, 7]
            },
            {
              label: "AnttiT",
              backgroundColor: "rgba(255,0,0,0.8)",
              data: [5, 5, 5, 5, 5]
            },
            {
              label: "Pekka",
              backgroundColor: "rgba(0,255,0,0.8)",
              data: [2, 1, 0, 2, 3]
            },
            {
              label: "AnttiK",
              backgroundColor: "rgba(0,0,255,0.8)",
              data: [1, 7, 3, 2, 1]
            },
            {
              label: "Saku",
              backgroundColor: "rgba(255,255,0,0.8)",
              data: [1, 1, 1, 2, 6]
            }
        ]
      },
      lineData: {
        labels: ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai"],
        datasets: [
            {
              label: "Hannu",
              borderColor: "rgba(0,0,0,0.8)",
              data: [3, 2, 5, 6, 7]
            },
            {
              label: "AnttiT",
              borderColor: "rgba(255,0,0,0.8)",
              data: [5, 5, 5, 5, 5]
            },
            {
              label: "Pekka",
              borderColor: "rgba(0,255,0,0.8)",
              data: [2, 1, 0, 2, 3]
            },
            {
              label: "AnttiK",
              borderColor: "rgba(0,0,255,0.8)",
              data: [1, 7, 3, 2, 1]
            },
            {
              label: "Saku",
              borderColor: "rgba(255,255,0,0.8)",
              data: [1, 1, 1, 2, 6]
            }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar />
          <h1>Relaamon läsnäolo</h1>
          <Chart barData={this.state.barData} title="Läsnäolo" legendPosition="bottom"/>
          <Chart lineData={this.state.lineData} title="Läsnäolo" legendPosition="bottom"/>
        </header>
        <ul>
            {this.state.products.map(product => (
            <li key={product.id}>
              ID:{product.id} PRICE:{product.body} DESC:{product.title}
            </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
