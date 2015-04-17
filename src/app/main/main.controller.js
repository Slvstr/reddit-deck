'use strict';

angular.module('redditDeck')
  .controller('MainCtrl', function ($scope, Storage) {

    $scope.boards = JSON.parse(Storage.getItem('boards'));


  });
