(function(){
'use strict';
angular.module('uk.ac.soton.ecs.videogular.plugins.cuepoints', [])
	.directive(
		'vgCuepoints',
		[function() {
			return {
				restrict: 'E',
				require: '^videogular',
				templateUrl: 'bower_components/videogular-cuepoints/cuepoints.html',
				scope: {
					cuepoints: '=vgCuepointsConfig',
					theme: '=vgCuepointsTheme',
				},
				link: function($scope, elem, attr, API) {
					// shamelessly stolen from part of videogular's updateTheme function
					function updateTheme(value) {
						if (value) {
							var headElem = angular.element(document).find("head");
							headElem.append("<link rel='stylesheet' href='" + value + "'>");
						}
					}

					var calcLeft = function(cuepoint) {
						if (API.totalTime === 0) return '-1000';

						var videoLength = API.totalTime / 1000;
						return (cuepoint.time * 100 / videoLength).toString();
					};

					$scope.onCuepointClick = function(cuepoint){
						API.seekTime(cuepoint.time);
					};

					$scope.cuepointStyle = function(cuepoint) {
						return {
							left: calcLeft(cuepoint) + '%'
						};
					}

					updateTheme($scope.theme);
				},
			};
		}]);
})();
