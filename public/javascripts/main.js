
var app = angular.module('myapp', ['ngFileUpload']);

app.controller('MyCtrl',['Upload','$window', '$scope','$http',function(Upload,$window,$scope,$http){
    var vm = this;
    vm.submit = function(){
        if (vm.upload_form.file.$valid && vm.file) {
            vm.upload(vm.file);
        }
    };

    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/upload',
            data: {file:file}
        }).then(function (resp) {
            if(resp.data.error_code === 0){
                $window.alert('File ' + resp.config.data.file.name + ' uploaded.');
            }
            else {
                $window.alert('an error occurred');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        });
    };

    $scope.convert = function () {
        console.log("Reached convert");
        $http.get('/text').then(function (res) {
            console.log(res.data);
            $scope.answer = res.data;
        },function fail() {
            console.log("Failed");
        });
    };
}]);