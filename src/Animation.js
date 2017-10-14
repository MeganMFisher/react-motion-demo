import React, { Component } from 'react';
import {StaggeredMotion, spring, presets} from 'react-motion';
import _ from 'underscore';
import './animation.css';

export default class Animation extends Component {
  constructor() {
    super();
    this.state = {
      x: 100, 
      y: 100
    }; //Determines where the initial animation starting point before it picks up your mouse movements.
  };

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    //The mousemove event is fired when a pointing device (usually a mouse) is moved while over an element.
  }; 
  //componentDidMount is called after the component is mounted and has a DOM representation. This is often a place where you would attach generic DOM events like above.

  handleMouseMove = ({pageX: x, pageY: y}) => {
    this.setState({x, y}); //Sets state with the pixels passed in from the mouseEvent.
  };
  //Changes state and location of staggered animations based off your mouse movements. The pageX read-only property of the MouseEvent interface returns the X (horizontal) coordinate in pixels of the event relative to the whole document while pageY returns the Y (vertical) coordinate in pixels of the event relative to the whole document.


  getStyles = (prevStyles) => {
    // prevStyles is the interpolated value of the last tick
    // console.log(prevStyles)
    const endValue = prevStyles.map((_, i) => {
      //We only want the index but thats .maps second parameter so we have to put a placeholder into the first parameter.
      return i === 0 ? this.state : {
          x: spring(prevStyles[i - 1].x, presets.gentle),
          y: spring(prevStyles[i - 1].y, presets.gentle),
          //If the index is equal to 0 return this.state(our initial starting point) otherwise set x to equal the invocation of spring with the first parameter the x property on the staggered item with the current index of minus 1. Then set the stiffness and damping to be a build in preset of gentle.
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
        {/* Accepts the array of interpolated styles e.g. [{x: 5, y: 10}, {x: 6.4, y: 20}, {x: 8.1, y: 4}] which in this app comes from getStyles*/}
        {circles =>
          <div className="container">
            {circles.map(({x, y}, i) =>
            //Maps over the interpolated styles.
              <div
                key={i}
                className={`circles circle-${i}`}
                //styling will be based off the index of the staggered items.
                style={{
                  transform: `translate3d(${x-25}px, ${y-25}px, 0)`, //Gives them the ability to move across your screen. -25 on both the x and y will put the curser in the center of the image because of the size of the image. You can manipulate this to fit where you want the curser in relation to the image.
                  zIndex: circles.length - i, //This makes the staggers stack so they disappear behind each other. 
                }} />
            )}
          </div>
        }
      </StaggeredMotion>
    );
  };
}