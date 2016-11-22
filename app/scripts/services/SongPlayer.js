(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        var currentAlbum = Fixtures.getAlbum();

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
        	SongPlayer.currentSong.playing = null;
       	}

    	currentBuzzObject = new buzz.sound(song.audioUrl, {
        	formats: ['mp3'],
        	preload: true
    	});
 
    	SongPlayer.currentSong = song;
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
 * @function getSongIndex
 * @desc Gets the song index from the currently playing song.
 * @param {Object} song
 * @returns {Number}
 */ 
    var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
    };

/**
 * @desc Current song playing.
 * @type {Object}
 */
    SongPlayer.currentSong = null;

 /**
 * @function SongPlayer.play
 * @desc Sets the song and plays it if SongPlayer.currentSong is different from ths song object.
 * @param {Object} song
 */	

    SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
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
        song = song || SongPlayer.currentSong;
    	currentBuzzObject.pause();
    	song.playing = false;
 	};

 /**
 * @function SongPlayer.previous
 * @desc Gets the current song index and decrements it by one.
 */ 
    SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };

         return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
