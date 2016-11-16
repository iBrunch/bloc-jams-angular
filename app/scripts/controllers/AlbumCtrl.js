(function() {
	function AlbumCtrl() {
		this.albumData = albumPicasso;
		this.songData = [];
		for (var i=0; i < albumPicasso.songs.length; i++) {
			this.songData.push(angular.copy(albumPicasso.songs[i]));
		}
	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();
