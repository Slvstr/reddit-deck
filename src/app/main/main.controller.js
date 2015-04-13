'use strict';

angular.module('redditDeck')
  .controller('MainCtrl', function ($scope, $resource) {

    // TODO (Erik Hellenbrand) : Move reddit resource logic to a service/factory
    $scope.baseUrl = 'http://www.reddit.com/r/';
    $scope.subs = [];
    $scope.links = [
      {
        displayText: 'First link goes here',
        description: 'Maybe a little preview goes here?',
        url: 'http://www.erikhellenbrand.com'
      },

      {
        displayText: '2nd link goes here',
        description: 'Can we even show a preview?',
        url: 'http://www.google.com'
      }
    ];

    function getSubsUrl(subsArray) {
      return subsArray.join('+');
    }

    // $scope.Reddit = $resource($scope.baseUrl + getSubsUrl($scope.subs));
  });
