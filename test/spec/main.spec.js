
describe('Controller: MainCtrl', function () {

  var $controller, $rootScope, $httpBackend;

  beforeEach(module('tweenyApp'));
  beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should have a property for iterating the tweets and it should be empty', function () {
    var scope = $rootScope.$new();
    $controller('MainCtrl', {$scope: scope});
    expect(scope.tweets).toEqual([]);
  });

  it('should have set the default query to #cats', function () {
    var scope = $rootScope.$new();
    $controller('MainCtrl', {$scope: scope});
    expect(scope.query).toEqual('#cats');
  });

  it('should populate the tweets property by the results returned from backend', function () {
    $httpBackend.whenGET(/twitter/).respond(200, {
      statuses: [
        {user: {name: 'Peter Pane', screen_name: 'Peter'}, text: 'Hello Peter', id_str: '1'}
      ]
    });
    var scope = $rootScope.$new();
    $controller('MainCtrl', {$scope: scope});
    scope.search('hello');
    $httpBackend.flush();
    expect(scope.tweets).toEqual([{user: 'Peter Pane', body: 'Hello Peter', link: 'https://twitter.com/Peter/status/1', screenName: '@Peter'}]);
  });

  it('searchForm should be defined', function () {
    expect(scope.searchForm).toBeDefined();
  });

  it('should reject invalid hashtags', function () {
    var scope = $rootScope.$new();
    $controller('MainCtrl', {$scope: scope});
    scope.query = '#test #%^';
    expect(scope.searchForm.$valid).toBe(false);
    scope.query = '#meow';
    expect(scope.searchForm.$valid).toBe(true);
  });

});
