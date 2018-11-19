import React, { Component } from 'react';
import './App.css';
import Chart from './Chart'
import Navbar from './Navbar'

function fetchDelete() {
  fetch("http://localhost:8000/api/tags/12341234", {
    method: 'delete',
  })
  .then(function (datas) {  
    console.log('Request success: ', datas);
  })  
  .catch(function (error) {  
    console.log('Request failure: ', error);
  });
}

function fetchPost() {
  fetch("http://localhost:8000/api/tags", {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      RuuviTagId: 43214321,
      User: 'Pekka',
    })
  })
  .then(function (datas) {  
    console.log('Request success: ', datas);
  })  
  .catch(function (error) {  
    console.log('Request failure: ', error);
  });
}

function fetchPut() {
  fetch("http://localhost:8000/api/tags/12341234", {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      RuuviTagId: 43214321,
      User: 'Pekka',
    })
  })
  .then(function (datas) {  
    console.log('Request success: ', datas);
  })  
  .catch(function (error) {  
    console.log('Request failure: ', error);
  });
}

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
  
  getChartData() {
    // Ajax calls here
    fetch("http://localhost:8000/api/data")
    .then(res => res.json())
    .then(
      (result) => {
        //console.log(result);
        this.setState({
          isLoaded: true,
          products: result
        });
      },
      // Note: it's important to handle errors hereasdf
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
        //console.log(this.state.error);
      }
    )

    this.setState({
      barData: {
        labels: ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai"],
        datasets: [
            {
              label: "Hannu",
              backgroundColor: "rgba(0,0,0,0.8)",
              data: [5, 5, 5, 5, 5]
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
            {this.state.products.map((product, index) => (
            <li key={index}>
              ID:{product.Count} Temp:{product.Temp} Pressure:{product.Pressure}
            </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
