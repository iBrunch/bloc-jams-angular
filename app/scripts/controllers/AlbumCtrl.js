(function() {
	function AlbumCtrl(Fixtures) {
		this.albumData = Fixtures.getAlbum();
		this.songData = [];
		for (var i=0; i < this.albumData.songs.length; i++) {
			this.songData.push(angular.copy(this.albumData.songs[i]));
		}
	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();
