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

In order to get Tween.Motion working follow the next steps:
* Load TweenJS to your web project
* Load Tween.Motion to your web project
* Use `Tween.Motion(element, start, target, time, options)` method to easily create your animations
* Enjoy!

## API
`Tween.Motion` takes a configuration object with some needed properties. Here I'll try to explain them in detail:

```javascript
  // Tween.Motion(config);

  //For example
  TWEEN.Motion({
      element: myElement,
      from: {rotation: 0},
      to: {rotation: -15},
      duration: 300,
      options: {
          easing: TWEEN.Easing.Quadratic.InOut,
          repeat: 5,
          yoyo: true,
          callbacks: {
              onComplete: myOnCompleteFunction
          }
      }
  });
  
  //Request animation frame here
```

### `element` (Object)
This is the element or the context itself on which the modifications will take place. It doesn't matter the structure of this object, `Tween.Motion` uses `dot.notation` to access the context values and modify them.

### `from` (Object)
The `from` object is a map of `property:value`, it represents the starting point for the properties values. It uses `dot.notation` to represent the location of the property in the object, this makes automatic updates possible, that's the reason why you don't need to specify an `onUpdate` callback function.

### `to` (Object)
The same rules apply for the `from` object. This represents the final stage the animation should reach prior to being completed.

### `duration` (Number)
This is simply the time in milliseconds for the animation duration.

### `options` (Object)
This object can contain further TweenJS configurations. 
It can also contain a special object named 'callbacks', in this you can specify the `onUpdate` and `onComplete` callbacks.

#### Especifying further configuration via `options` parameter
You can easily specify further configuration details for your animation, like delays, easings; for instance:
```javascript
Tween.Motion({
  ...
  options: {
    easing: TWEEN.Easing.Quadratic.InOut,
    delay: 500
  }
});
```

##Staggering
Staggering is a quite popular concept you hear a lot while animating the Web. It basically consists in triggering one animation right after the previous one has been completed. The concept is simple, you have a stack of animations and you want to trigger each one of them right after the previous one. Achieving this in bare TWEEN coding is a hard work, but with `TWEEN.Stagger` all you have to do is to add the animations stack followed by the delay duration and a callback that will be called once all the animation have been completed.

See the following snipped for further clarification:

```javascript
// TWEEN.Batch(tweens, delay, callback);

TWEEN.Stagger(
  [
    {
      element: myElement,
      from: {...},
      to: {...},
      duration: 300
    },
    {
      element: anotherElement,
      from: {...},
      to: {...},
      duration: 300
    },
  ],
  500, //The delay between animations
  myCallback //The callback function
);
```

##Batching
Batching, on the other hand, is similar to Staggering but the difference is that the latest uses a single animation model and a stack of elements to animate accordingly. See the snipped below:

```javascript
// TWEEN.Batch(elements, config, delay, callback);

TWEEN.Batch(
	[...], //Elements array
    { //The configuration object, the animation model
    	from: {...},
        to: {...},
        duration: 300
    },
    250, //The delay between animations
    myCallback //The callback function
);
```

This is a work on progress, feel free to debug this and push improvements.
