import React, { Component } from 'react';
import './App.css';
import Chart from './Chart'
import Navbar from './Navbar'

/*
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
  .then((datas) => {  
    console.log('Request success: ', datas);
  },
  (error) => {  
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
  .then((datas) => {  
    console.log('Request success: ', datas);
  },
  (error) => {  
    console.log('Request failure: ', error);
  });
}
*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      barData: {},
      lineData: {},
      error: null,
      isLoaded: false,
      axisy: [],
      axisx: []
    }
  }

  componentDidMount() {
    // Ajax calls here
    fetch("http://localhost:8000/api/tagtemp/257385652260480/day/2018-11-19")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          lineData: {
            labels: result.map(x => x.Time),
            datasets: [
              {
                label: "Tag",
                borderColor: "rgba(0,0,0,0.8)",
                data: result.map(x => x.Temp)
              }
            ]
          },
          barData: {
            labels: result.map(x => x.Time),
            datasets: [
              {
                label: "Hannu",
                backgroundColor: "rgba(0,0,0,0.8)",
                data: result.map(x => x.Temp)
              }
            ]
          },
          isLoaded: true,
          axisy: result.map(x => x.Time),
          axisx: result.map(x => x.Temp)
        });
      },
      (error) => {
        this.setState({
          isLoaded: false,
          error
        });
      }
    )
  }

  render() {
    if(this.state.isLoaded === true){
      return (
        <div className="App">
          <header className="App-header">
            <Navbar />
            <h1>Relaamon lämpötila</h1>
            <Chart barData={this.state.barData} title="Temp" legendPosition="bottom"/>
            <Chart lineData={this.state.lineData} title="Temp" legendPosition="bottom"/>
          </header>
        </div>
      );
    }
    return (
      'Loading...'
    )
  }
}

export default App;