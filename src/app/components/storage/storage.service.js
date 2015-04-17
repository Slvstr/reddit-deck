(function() {
  'use strict';

  angular.module('redditDeck')

    .factory('Storage', function($window) {
      return $window.localStorage;
    });

})();