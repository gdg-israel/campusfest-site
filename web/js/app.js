'use strict';

var devFest = angular.module('DevFest', []);

devFest.directive('gdgNavbar', function () {
	return function (scope, element) {
		element.bind('click', function () {
			angular.forEach(document.querySelectorAll('.active'), function (val) {
				angular.element(val).removeClass('active');
			});

			var el = document.getElementById('navbar-links');

			if (event.target.className === 'navbar-toggle') {
				if (angular.element(el).hasClass('collapse')) {
					angular.element(el).removeClass('collapse');
					return false;
				}
			}

			angular.element(el).addClass('collapse');

			angular.element(event.target.parentElement).addClass('active');
		});
	};
});

devFest.directive('gdgCountdown', function () {
	return {
		scope: {
			value: '=',
			title: '@'
		},
		replace: true,
		template: '<div class="countdown-item col-xs-3"><div class="wrap">' +
			'<div class="inner"><div class="text"><p class="val">{{value}}</p>' +
			'<p>{{title}}</p></div></div></div></div>'
	};
});


devFest.controller('CountDownCtrl', function ($scope, $timeout) {
	var targetDate = new Date(1383235200000);
	var timer;

	function updateCount() {
		var timeDelta = (targetDate.getTime() - new Date().getTime()) / 1000;
		if (timeDelta < 0) {
			timeDelta = 0;
		}
		$scope.countDown = {
			days: parseInt(timeDelta / 86400, 10),
			hours: parseInt((timeDelta % 86400) / 3600, 10),
			minutes: parseInt((timeDelta % 3600) / 60, 10),
			seconds: parseInt(timeDelta % 60, 10)
		};

		timer = $timeout(updateCount, 1000);
	}

	updateCount();

	$scope.$on('$destroy', function () {
		$timeout.cancel(timer);
	});
});
