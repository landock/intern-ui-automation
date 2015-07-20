define([
	'intern/dojo/Promise'
],

function(Promise) {
	return {
		'pollUntilElementRemoved' : function(remote, elementId, interval) {
			var dfd = new Promise.Deferred();
			
			(function poll() {
				var element = remote
				.execute(function(elem) {
					return document.getElementById(elem);
				}, [elementId]);
				console.log(element);
				if(element === null)
					dfd.resolve();
				else
					setTimeout(poll, interval);
			})();
		}
	};
});