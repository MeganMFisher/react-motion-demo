# React-Motion with Create React App:

## What is React Motion?

React Motion makes animation easy using physics and allows you to animate the style prop of an element. 

It exports 3 main components, Motion, StaggeredMotion and TransitionMotion.


## Motion Component:
`<Motion />`

- Allows you to animate components within a page between style state.
- Children passed to this component should be a function that should render a component. That function’s argument is the style that should be used to render that component at that point in time.
- You can control the initial state with defaultStyle prop

```
  <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
    { (style) => <div style={style}>Can you see me?</div> }
 </Motion>
```

The motion component requires a styles attribute as well as a function inbetween the component tags which feeds into this.props.children. 

You have to pass in a number to the spring. React motion does some physics calculations or react motion magic.

**Required**
- style props
- Children passed to this component should be a function
- Must return one React element to render

**Optional**
- defaultStyle props
- onRest 


## Transition Motion Component:
`<TransitionMotion />`

- Helps you to do mounting and unmounting animation.

Takes willLeave, willEnter, and styles as the attributes as well as a function inbetween the component tags which feeds into this.props.children. 

**Required**
- styles props which is an array
- Children passed to this component should be a function

**Optional**
- defaultStyles props
- willLeave props
- didLeave props
- willEnter props



## Staggered Motion Component: 
`<StaggeredMotion />`

- Animates a collection of (fixed length) items whose values depend on each other, creating a natural, springy, "staggering" effect like so. This is preferred over hard-coding a delay for an array of Motions to achieve a similar (but less natural-looking) effect.

defaultStyles is a required attribute for the staggeredMotion component.

 **Required**
- styles props which is an array
- Children passed to this component should be a function

**Optional**
- defaultStyles props



## Spring(): 

Used in conjunction with the components above. Specifies the how to animate to the destination value, e.g. spring(10, {stiffness: 100, damping: 20}) means "animate to value 10, with a spring of stiffness 100 and damping 20".


## Spring Presets: 

  noWobble: {stiffness: 170, damping: 26}: The default, if nothing provided
  gentle: {stiffness: 120, damping: 14}
  wobbly: {stiffness: 180, damping: 12}
  stiff: {stiffness: 210, damping: 20}



# Installation: 

In your terminal run the following to install react-motion: 

`npm install --save react-motion`



<!-- ## Import: 

For this demo in your component import staggeredMotion, presets, and spring from react-motion. 

`import {StaggeredMotion, spring, presets} from 'react-motion';` -->






# Resources: 

- https://github.com/chenglou/react-motion
- https://medium.com/@nashvail/a-gentle-introduction-to-react-motion-dc50dd9f2459
- https://www.npmjs.com/package/react-motion 
- https://medium.com/@bjorn.holdt/react-motion-101-springs-336f4f29d95a
- https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm
- http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
- http://underscorejs.org/docs/underscore.html
- https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
- https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY