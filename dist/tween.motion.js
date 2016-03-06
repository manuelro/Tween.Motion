(function(){
	'use strict';
	if(window.TWEEN){
		window.TWEEN.Motion = Motion;
		window.TWEEN.Stagger = Stagger;
	}

	console.log(window.TWEEN);

	function Motion(elem, start, target, time, options, autostart){
		if(!elem){ elem = {}; }
		if(!start){ start = {}; }
		if(!target){ target = {}; }
		if(!time){ time = 0; }
		if(!options){ options = {}; }
		if(typeof autostart === 'undefined' || typeof autostart === 'null'){ autostart = true; }

		var onComplete = function(){};
		options.callbacks = options.callbacks || {};
		options.callbacks.onUpdate = options.callbacks.onUpdate || onUpdate;
		options.callbacks.onComplete = options.callbacks.onComplete || onComplete;
		var tween = new TWEEN.Tween(start).to(target, time);
		
		for(var key in options){
			if(key !== 'callbacks'){ 
				if(typeof tween[key] === 'function') {
					tween[key](options[key]);
				} else {
					tween[key] = options[key]; 
				}
			}
		}

		tween.onUpdate(options.callbacks.onUpdate);
		tween.onComplete(options.callbacks.onComplete);
		if(autostart) tween.start();

		function onUpdate(){
			for(var key in target) propRec(elem, key, start[key]);
		};

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

	function Stagger(elements, tween, delay){
		for(var i = 0; i < elements.length; i++){

		}
	}
})();
