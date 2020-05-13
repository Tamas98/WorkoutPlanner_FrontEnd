import React from 'react';
import './App.css';
import Layout from "./Components/Layout";

class App extends React.Component {

  state = {
      quotes: [
          {
              quote: "All successes begin with Self-Discipline. It starts with you.",
              said: "Dwayne 'The Rock' Johnson"
          },
          {
              quote: "Why is it my job to save these people? Why do I have to be some kind of hero?",
              said: "Jensen Ackles"
          }
      ]
  };

  render(){
    return (
        <Layout quotes = {this.state.quotes}/>
    );
  }
}

export default App;
