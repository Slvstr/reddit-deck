'use strict';

angular.module('redditDeck')
  .controller('MainCtrl', function ($scope, $resource) {

    // TODO (Erik Hellenbrand) : Move reddit resource logic to a service/factory
    $scope.baseUrl = 'http://www.reddit.com/r/';
    $scope.subs = [];

    function getSubsUrl(subsArray) {
      return subsArray.join('+');
    }

    $scope.Reddit = $resource($scope.baseUrl + getSubsUrl($scope.subs));
  });
