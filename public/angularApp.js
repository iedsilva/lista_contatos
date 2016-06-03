// public/angularApp.js

// Criamos um módulo Angular chamado listaContatos
var app = angular.module('listaContatos', []);

app.controller('mainController', ['$scope', '$http', function ($scope, $http){
    $scope.editing = false;


    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function (){
        $http.get('/api/contatos')
        .success(function(data) {
            $scope.contatos = data;
            $scope.formContato = {};
            console.log("contatos: ", data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    refresh();

    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarContato = function() {
        $http.post('/api/contatos', $scope.formContato)
        .success(function(data) {
                // Limpa o formulário para criação de outros contatos
                $scope.formContato = {};
                $scope.contatos = data;
                console.log(data);
            })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarContato = function(id) {
        $http.delete('/api/contatos/' + id)
        .success(function(data) {
            $scope.contatos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Editar, edita o contato
    $scope.editarContato = function(id) {
        $scope.editing = true;
        $http.get('/api/contatos/' + id)
        .success(function(data) {
            $scope.formContato = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarContato = function() {        
        $http.put('/api/contatos/' + $scope.formContato._id, $scope.formContato)
        .success( function(response){
            $scope.editing = false;
            refresh();
        });
    };

}]);

app.directive('mask', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
            if (attr.mask)elem.mask(attr.mask, {});
        }
    };
});