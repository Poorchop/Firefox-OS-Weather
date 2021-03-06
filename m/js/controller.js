// Generated by CoffeeScript 1.6.3
(function() {
  App.controller('MainController', [
    '$rootScope', function($rootScope) {
      $rootScope.openedOptions = true;
      $rootScope.toggleOptions = function() {
        return $rootScope.openedOptions = !$rootScope.openedOptions;
      };
      return $rootScope.update = function() {
        return $rootScope.$emit('update:city', true);
      };
    }
  ]);

  App.controller('OptionsController', [
    '$scope', '$rootScope', 'Rest', '$timeout', 'City', 'Options', function($scope, $rootScope, Rest, $timeout, City, Options) {
      var errors, resultToCity, resultToCityCoords;
      errors = ['Please enter city name', 'No cities found', 'You already have this city', 'Cant get geolocation'];
      $scope.cities = City.getAll();
      $scope.cityName = null;
      $scope.loading = false;
      $scope.options = Options.get();
      $scope.showError = function(error) {
        $scope.error = error;
        return $timeout((function() {
          return $scope.error = null;
        }), 2000);
      };
      $scope.useGeoLocation = function() {
        return navigator.geolocation.getCurrentPosition((function(pos) {
          return Rest.getCityByGeoLocation(pos.coords.latitude, pos.coords.longitude, function(res) {
            var name, _ref, _ref1, _ref2;
            if ((_ref = res.search_api) != null ? (_ref1 = _ref.result) != null ? (_ref2 = _ref1[0].areaName) != null ? _ref2[0].value : void 0 : void 0 : void 0) {
              name = res.search_api.result[0].areaName[0].value;
              if (City.has(name)) {
                return $scope.showError(errors[2]);
              }
              City.add({
                name: name,
                searchQuery: name,
                lastUpdate: null,
                weather: null
              });
            } else {
              $scope.showError(errors[1]);
            }
            return $scope.$apply();
          });
        }), function() {
          return $scope.showError(errors[3]);
        });
      };
      $scope.saveOptions = function() {
        return Options.save();
      };
      $scope.openCity = function(city) {
        if (City.has(city)) {
          return $rootScope.$emit('open:city', city);
        }
      };
      $scope.removeCity = function(name) {
        if (confirm("Are you sure want to delete " + name + "?")) {
          City.remove(name);
          return $scope.cities = City.getAll();
        }
      };
      $scope.loadCity = function() {
        if (!$scope.cityName) {
          return $scope.showError(errors[0]);
        }
        $scope.loading = true;
        return Rest.getCity($scope.cityName, function(result) {
          var city;
          $scope.loading = false;
          if (!result['search_api']) {
            return $scope.showError(errors[1]);
          }
          $scope.cityName = null;
          if (result['search_api']['result'].length === 1) {
            city = resultToCity(result['search_api']['result'][0]);
            if (City.has(city.name)) {
              return $scope.showError(errors[2]);
            }
            City.add(city);
            return $scope.cities = City.getAll();
          } else {
            $scope.chooseCity = true;
            return $scope.chooseCities = result['search_api']['result'];
          }
        });
      };
      $scope.chooseCityFunc = function(city) {
        $scope.chooseCity = false;
        city = resultToCityCoords(city);
        if (City.has(city.name)) {
          return $scope.showError(errors[2]);
        }
        City.add(city);
        return $scope.cities = City.getAll();
      };
      resultToCity = function(res) {
        return {
          name: res['areaName'][0]['value'],
          searchQuery: res['areaName'][0]['value'],
          lastUpdate: null,
          weather: null
        };
      };
      return resultToCityCoords = function(res) {
        return {
          name: res['areaName'][0]['value'],
          searchQuery: res['latitude'] + ',' + res['longitude'],
          lastUpdate: null,
          weather: null
        };
      };
    }
  ]);

  App.controller('WeatherController', [
    '$scope', '$rootScope', 'Weather', 'Options', 'City', function($scope, $rootScope, Weather, Options, City) {
      var getDay, loadWeather, options, parseDays, parseNow;
      options = Options.get();
      $scope.loading = false;
      $scope.now = null;
      $scope.days = null;
      $scope.city = null;
      $scope.showDay = function(day) {
        var key, result, value;
        result = "";
        for (key in day) {
          value = day[key];
          if (key === '$$hashKey' || key === 'icon') {
            continue;
          }
          result += "" + key + ": " + value + "\n";
        }
        return alert(result);
      };
      $rootScope.$on('open:city', function(e, city) {
        loadWeather(city);
        $scope.city = city;
        return $rootScope.toggleOptions();
      });
      $rootScope.$on('update:city', function() {
        var city;
        if ($scope.city) {
          city = City.get($scope.city);
          if (+(new Date) - city.lastUpdate > 15 * 60 * 1000) {
            City.update($scope.city, 'lastUpdate', null);
            return loadWeather($scope.city);
          }
        }
      });
      parseNow = function(now) {
        return {
          temp: [now['temp_C'], now['temp_F']][+(options.temp === 'F')],
          icon: ICONS[now['weatherCode']][0],
          desc: now['weatherDesc'][0]['value'],
          windspeed: now['windspeedKmph'],
          winddir: WINDS[now['winddir16Point']],
          pressure: now['pressure']
        };
      };
      parseDays = function(days) {
        return days.map(function(day) {
          return {
            day: getDay(+(new Date(day.date)).getDay()) || day['date'],
            date: day['date'],
            max: [day['tempMaxC'], day['tempMaxF']][+(options.temp === 'F')],
            min: [day['tempMinC'], day['tempMinF']][+(options.temp === 'F')],
            weather: day['weatherDesc'][0]['value'],
            precip: day['precipMM'] + 'mm',
            windspeed: day['windspeedKmph'] + 'km/h',
            icon: ICONS[day['weatherCode']][0]
          };
        });
      };
      getDay = function(d) {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d];
      };
      return loadWeather = function(city) {
        $scope.now = null;
        $scope.days = null;
        $scope.loading = true;
        return Weather.get(city, function(res) {
          $scope.now = parseNow(res['data']['current_condition'][0]);
          $scope.days = parseDays(res['data']['weather']);
          return $scope.loading = false;
        });
      };
    }
  ]);

}).call(this);
