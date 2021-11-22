import React, { Component, createRef } from 'react';
import './style.css';

class WeatherComponent extends Component {
    state={
      city: '',

    }

    season=['hot', 'cold', 'rainy', 'normal'];

    currentCity=createRef();

    addToList =(event) => {
      event.preventDefault();
      this.setState(() => ({ city: this.currentCity.current.value }));
    }

    render() {
      const { city } = this.state;
      return (

        <div className="container">
          <h1 className="title">Weather report</h1>
          <form className="weather-form" onSubmit={this.addToList}>
            <input ref={this.currentCity} placeholder="enter the city name" />
            <button type="submit">Check Weather</button>
          </form>
          {
                   (() => {
                     if (city !== '') {
                       return (
                         <div>
                           <h2>
                             {city}
                             {' '}
                             is
                             {' '}
                             {this.season[Math.floor(Math.random() * this.season.length)]}
                           </h2>
                         </div>
                       );
                     }
                     return false;
                   })()

                }
        </div>
      );
    }
}

export default WeatherComponent;
