# Tween.Motion
A little wrapper around TweenJS to easily create animations with less effort. Especially thought for HTML5 Canvas animations.

## Installation
###Bower
You can get the script from Bower via `bower install Tween.Motion --save`

## Use
First thing first: make sure you are loading TweenJS library from their original repo. 
```html
<!-- Load TweenJS -->
<script src="Tween.js"></script>
<!-- Load Tween.Motion -->
<script src="tween.motion.js"></script>
```

In orther to get Tween.Motion working follow the next steps:
* Load TweenJS to your web project
* Load Tween.Motion to your web project
* Use `Tween.Motion(element, start, target, time, options)` method to easily create your animations
* Enjoy!

## API
`Tween.Motion` method takes 5 parameters in total. Here I'll try to explain them in detail:

```javascript
  // Tween.Motion(config);

  //For example
  TWEEN.Motion(
  	elem,
  	{ 'position.y': 0, opacity: 0 },
  	{ 'position.y': 100, opacity: 1 },
  	300,
  	{
  		easing: TWEEN.Easing.Quadratic.InOut,
  		callbacks: {
  			onComplete: function(){ /* Do something when done */ }
  		}
  	}
  );
  
  //Request animation frame here
```

### `element` (Object)
This is the element or the context itself on which the modifications will take place. It doesn't matter the structure of this object, `Tween.Motion` uses `dot.notation` to access the context values and modify them.

### `start` (Object)
The `start` object is a map of `property:value`, it represents the starting point for the properties values. It uses `dot.notation` to represent the location of the property in the object, this makes automatic updates possible, that's the reason why you don't need to specify an `onUpdate` callback function.

### `target` (Object)
The same rules apply for the target object. This represents the final stage the animation should reach prior to being completed.

### `time` (Number)
This is simply the time for the animation duration.

### `options` (Object)
This object can contain further TweenJS configurations. 
It can also contain an special object named 'callbacks', in this you can specify the `onUpdate` and `onComplete` callbacks.
#### Especifying further configuration via `options` parameter
You can easily specify further configuration details for your animation, like delays, easings; for instance:
```javascript
Tween.Motion(
  ...
  {
    easing: TWEEN.Easing.Quadratic.InOut,
    delay: 500
  }
);
```

This is a work on progress, feel free to debug this and push improvements. 
