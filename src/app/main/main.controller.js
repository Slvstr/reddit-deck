'use strict';

angular.module('redditDeck')
  .controller('MainCtrl', function ($scope, Storage) {

    // Get boards array from local storage
    $scope.boards = JSON.parse(Storage.getItem('boards'));

    $scope.addBoard = function(index) {
      // add a new board object to boards array
    };


    $scope.removeBoard = function(index1) {
      // remove a board from boards array
    };

    $scope.mergeBoards = function(index1, index2) {
      // merge 2 boards into a single board by combining subs
    };


  });
