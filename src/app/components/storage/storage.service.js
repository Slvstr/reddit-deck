(function() {
  'use strict';

  angular.module('redditDeck')

    .factory('Storage', function($window) {
      return {
        getItem: function(key) {
          return JSON.parse($window.localStorage.getItem(key));
        },

        setItem: function(key, value) {
          return $window.localStorage.setItem(key, JSON.stringify(value));
        }
      };
    });

})();