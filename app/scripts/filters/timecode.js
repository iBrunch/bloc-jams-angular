(function() {
    function timecode() {
        return function(seconds) {
			var timer = buzz.toTimer(seconds);

		    if (Number.isNaN(seconds)) {
		        return '-:--';
		    }

			return timer;
        };
    }
 
    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();
