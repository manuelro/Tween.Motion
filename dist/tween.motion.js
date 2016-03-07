(function(){
	'use strict';
	if(window.TWEEN){
		window.TWEEN.Motion = Motion;
		window.TWEEN.Stagger = Stagger;
		window.TWEEN.Batch = Batch;
	}

	function Motion(config){
		config = config || {};
		config.element = config.element || {};
		config.from = config.from || {};
		config.to = config.to || {};
		config.duration = config.duration || 0;
		config.autostart = typeof config.autostart === 'undefined' ? true : false;

		config.options = config.options || {};
		config.options.callbacks = config.options.callbacks || {};
		config.options.callbacks.onUpdate = config.options.callbacks.onUpdate || onUpdate;
		config.options.callbacks.onComplete = config.options.callbacks.onComplete || onComplete;
		
		var tween = new TWEEN.Tween(config.from).to(config.to, config.duration);
		
		for(var key in config.options){
			if(key !== 'callbacks'){ 
				if(typeof tween[key] === 'function') {
					tween[key](config.options[key]);
				} else {
					tween[key] = config.options[key]; 
				}
			}
		}

		tween.onUpdate(config.options.callbacks.onUpdate);
		tween.onComplete(config.options.callbacks.onComplete);
		if(config.autostart) tween.start();

		function onUpdate(){
			for(var key in config.to) propRec(config.element, key, config.from[key]);
		};

		function onComplete(){};

		function propRec(context, route, value){
			var paths = route.split('.');
			function rec(context, i, isLast, value){
				var path = paths[i];
				if(paths.indexOf(path) === paths.length - 1){ isLast = true; }
				if(isLast){
					context[path] = value;
				} else {
					i++;
					if(context[path]){
						context = context[path]
						rec(context, i, isLast, value);
					}
				}
			};
			rec(context, 0, false, value);
		}

		return tween;
	}

	function Stagger(tweens, delay, callback){
		var tween;
		for(var i = 0; i < tweens.length; i++){
			tweens[i].autostart = false;
			tween = TWEEN.Motion(tweens[i]);
			tween.delay(i * delay);

			if(i === tweens.length - 1) tween.onComplete(callback);

			tween.start();
		}
	}

	function Batch(elements, config, delay, callback){
		var tween;

		delay = delay || 0;
		callback = callback || function(){};
		config.autostart = false;

		
		for(var i = 0; i < elements.length; i++){
			var _config = clone(config);
			_config.element = elements[i];
			_config.options = clone(config.options);

			tween = TWEEN.Motion(_config);
			tween.delay(i * delay);

			if(i === elements.length - 1) tween.onComplete(callback);

			tween.start();
		}

	}

	function clone(obj){
		if (null == obj || "object" != typeof obj) return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}

})();
