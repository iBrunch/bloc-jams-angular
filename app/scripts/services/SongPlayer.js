(function() {
    function SongPlayer() {
        var SongPlayer = {};
 /**
 * @desc Current song playing.
 * @type {Object}
 */
        var currentSong = null;

  /**
 * @desc Buzz object audio file
 * @type {Object}
 */

     	var currentBuzzObject = null;

 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
    var setSong = function(song) {
    	if (currentBuzzObject) {
        	currentBuzzObject.stop();
        	currentSong.playing = null;
       	}

    	currentBuzzObject = new buzz.sound(song.audioUrl, {
        	formats: ['mp3'],
        	preload: true
    	});
 
    	currentSong = song;
 	};

 /**
 * @function playSong
 * @desc Plays current Buzz object and sets playing property of the song object to true.
 * @param {Object} song
 */	
    var playSong = function(song) {
    	currentBuzzObject.play();
    	song.playing = true;
    }

 /**
 * @function SongPlayer.play
 * @desc Sets the song and plays it if currentSong is different from ths song object.
 * @param {Object} song
 */	

    SongPlayer.play = function(song) {
        if (currentSong !== song) {
            setSong(song); 
        	playSong(song); 
    	}
    };

 /**
 * @function SongPlayer.pause
 * @desc Pauses the currentBuzzObject to pause and song.playing to false.
 * @param {Object} song
 */	

    SongPlayer.pause = function(song) {
    	currentBuzzObject.pause();
    	song.playing = false;
 	};

         return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
