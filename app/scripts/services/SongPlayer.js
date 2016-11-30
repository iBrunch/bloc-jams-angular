(function() {
    function SongPlayer($rootScope, Fixtures) {
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
            stopSong(song);
        }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });

        currentBuzzObject.bind('timeupdate', function() {
            $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
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
* @function stopSong
* @desc Stops the current Buzz object and sets the playing property of the song object to null.
* @param {Object} song
* @returns {Number}
*/ 
    var stopSong = function(song) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    };

/**
* @desc Current song playing.
* @type {Object}
*/
    SongPlayer.currentSong = null;
 
/**
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
    SongPlayer.currentTime = null;

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
                stopSong(song);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };

/**
* @function SongPlayer.next
* @desc Gets the current song index and increments it by one.
*/ 
    SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;

        if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(song);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };

/**
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/
    SongPlayer.setCurrentTime = function(time) {
        if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
        }
    };

         return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
