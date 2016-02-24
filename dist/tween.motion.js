(function(){
	'use strict';
	if(window.TWEEN){
		window.TWEEN.Motion = Motion;
	}
	function Motion(elem, start, target, time, options){
		if(!elem){ elem = {}; }
		if(!start){ start = {}; }
		if(!target){ target = {}; }
		if(!time){ time = 0; }
		if(!options){ options = {}; }
		var propRec = function(context, route, value){
			var paths = route.split('.');
			var rec = function(context, i, isLast, value){
				var path = paths[i];
				if(paths.indexOf(path) === paths.length - 1){ isLast = true; }
				if(isLast){
					context[path] = value;
				} else {
					i++;
					context = context[path];
					rec(context, i, isLast, value);
				}
			};
			rec(context, 0, false, value);
		};
		var onUpdate = function(){
			for(var key in target) propRec(elem, key, start[key]);
		};
		var onComplete = function(){};
		options.callbacks = options.callbacks || {};
		options.callbacks.onUpdate = options.callbacks.onUpdate || onUpdate;
		options.callbacks.onComplete = options.callbacks.onComplete || onComplete;
		var tween = new TWEEN.Tween(start).to(target, time);
		for(var key in options){
			if(key !== 'callbacks'){ tween[key] = options[key]; }
		}
		tween.start();
		tween.onUpdate(options.callbacks.onUpdate);
		tween.onComplete(options.callbacks.onComplete);
	}
})();
