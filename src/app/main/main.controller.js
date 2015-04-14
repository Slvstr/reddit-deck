'use strict';

angular.module('redditDeck')
  .controller('MainCtrl', function ($scope, $http) {

    // TODO (Erik Hellenbrand) : Move reddit resource logic to a service/factory
    this.baseUrl = 'http://api.reddit.com/r/';
    this.after = '';

    $scope.subs = ['news'];
    this.items = [];
    $scope.items = this.items;
    
    function getSubsUrl(subsArray) {
      return subsArray.join('+');
    }

    this.url = this.baseUrl
              + getSubsUrl($scope.subs)
              + '?after='
              + this.after
              + '&limit=10'
              + '&jsonp=JSON_CALLBACK';

    $http.jsonp(this.url).success(function(data) {
      var items = data.data.children;
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i].data);
      }
      console.dir(this.items);
      this.after = "t3_" + this.items[this.items.length - 1].id;
      this.busy = false;
    }.bind(this));

  });
