'use strict';

angular.module('redditDeck')
  .controller('MainCtrl', function ($scope, Storage) {

    // Get boards array from local storage
    $scope.boards = Storage.getItem('boards');

    $scope.addBoard = function() {
      // add a new board object to boards array
      $scope.boards.push({name: '', subs: []});
    };


    $scope.removeBoard = function(index1) {
      // remove a board from boards array
    };

    $scope.mergeBoards = function(index1, index2) {
      // merge 2 boards into a single board by combining subs
    };


  });
