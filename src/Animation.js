import React, { Component } from 'react';
import {StaggeredMotion, spring, presets} from 'react-motion';
import _ from 'underscore';
import './animation.css';

export default class Animation extends Component {
  constructor() {
    super();
    this.state = {x: 100, y: 100}; //Determines where the intial animation starting point before it picks up your mouse movements.
  };

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
  }; 
  //componentDidMount is called after the component is mounted and has a DOM representation. This is often a place where you would attach generic DOM events like above.

  handleMouseMove = ({pageX: x, pageY: y}) => {
    this.setState({x, y}); 
  };
  //Changes state and location of staggered animations based off your mouse movements.


  getStyles = (prevStyles) => {
    // prevStyles is the interpolated value of the last tick
    const endValue = prevStyles.map((_, i) => {
      return i === 0 ? this.state : {
          x: spring(prevStyles[i - 1].x, presets.gentle),
          y: spring(prevStyles[i - 1].y, presets.gentle),
        };
    });
    return endValue;
  };

  render() {
    return (
      <StaggeredMotion
        defaultStyles={_.range(8).map(() => ({x: 0, y: 0}))} //Determines how many staggers you have. _.range => Generates an integer Array containing an arithmetic progression. An arithmetic progression is a sequence of numbers such that the difference of any two successive members is a constant. For example, the sequence 1, 2, 3, 4, ... is an arithmetic progression with common difference 1. The .map gives each of them a starting location. Without it you will only see the first stagger.
        styles={this.getStyles}> 
        {/* Required function passed as children to this function */}
        {balls =>
          <div className="container">
            {balls.map(({x, y}, i) =>
              <div
                key={i}
                className={`circles circle-${i}`}
                style={{
                  transform: `translate3d(${x-25}px, ${y-25}px, 0)`, //Gives them the ability to move across your screen. -25 on both the x and y will put the curser in the center of the image because of the size of the image. You can manipulate this to fit where you want the curser in relation to the image.
                  zIndex: balls.length - i, //This makes the staggers stack so they disappear behind each other. 
                }} />
            )}
          </div>
        }
      </StaggeredMotion>
    );
  };
}