# React-Motion with Create React App:

## What is React Motion?

React Motion allows you to animate the style prop of an element. 

React Motion exports 3 main components, Motion, StaggeredMotion and TransitionMotion.


## Motion:
`<Motion />`

- Allows you to animate components within a page between style state.
- Children passed to this component should be a function that should render a component. That function’s argument is the style that should be used to render that component at that point in time.
- You can control the initial state with defaultStyle prop

```
  <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
    { (style) => <div style={style}>Can you see me?</div> }
 </Motion>
```


## Transition Motion:
`<TransitionMotion />`

- Helps you to do mounting and unmounting animation.





## Staggered Motion: 
`<StaggeredMotion />`

- Animates a collection of (fixed length) items whose values depend on each other, creating a natural, springy, "staggering" effect like so. This is preferred over hard-coding a delay for an array of Motions to achieve a similar (but less natural-looking) effect.







# Install: 

In your terminal run the following to create your react app and to install react-motion: 

`Create-react-app app` 

`npm install --save react-motion`

cd into your create-react-app folder and run `npm start`






# Resources: 

- https://github.com/chenglou/react-motion
- https://medium.com/@nashvail/a-gentle-introduction-to-react-motion-dc50dd9f2459
- https://www.npmjs.com/package/react-motion 
- https://medium.com/@bjorn.holdt/react-motion-101-springs-336f4f29d95a
- https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm