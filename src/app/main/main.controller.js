'use strict';

angular.module('redditDeck')
  .controller('MainCtrl', function ($scope, Storage) {

    // Get boards array from local storage
    $scope.boards = Storage.getItem('boards');

    $scope.addBoard = function() {
      // add a new board object to boards array
      $scope.boards.push({name: '', subs: []});
      $scope.saveBoards();
    };


    $scope.removeBoard = function(board) {
      // remove a board from boards array and persist the change to localStorage
      var index = $scope.boards.indexOf(board);
      $scope.boards.splice(index, 1);
      $scope.saveBoards();
    };

    // $scope.mergeBoards = function(index1, index2) {
    //   // merge 2 boards into a single board by combining subs
    // };

    $scope.saveBoards = function() {
      Storage.setItem('boards', $scope.boards);
    };


  });
