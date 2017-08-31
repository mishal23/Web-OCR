var app = angular.module('myapp', ['ngFileUpload']);

app.controller('MyCtrl',['Upload','$window', '$scope','$http',function(Upload, $window, $scope, $http){
    this.submit = function(){
        if (this.file) {
            upload(this.file);
        }
        else{
            window.alert("Please select a image file");
        }
    };

    upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/upload',
            data: {file:file}
        }).then(function (resp) {
            if(resp.data.error_code === 0){
                convert();
            }
            else {
                $window.alert('Error! Please try again');
            }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        });
    };

    convert = function () {
//      console.log("Reached convert");
        $http.get('/text').then(function (res) {
//          console.log(res.data);
            $scope.check = 1;
            $scope.answer = res.data;
        },function fail() {
            console.log("Failed");
//          window.alert("Failed to convert, Please try again");
        });
    };
}]);