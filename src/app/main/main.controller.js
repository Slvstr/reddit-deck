'use strict';

angular.module('redditDeck')
  .controller('MainCtrl', function ($scope, Reddit) {

    $scope.subs = ['news'];
    var reddit = Reddit($scope.subs);

    $scope.items = reddit.items;


    reddit.getNextPage();
  
  });
