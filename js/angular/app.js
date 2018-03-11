let app = angular.module("expenseTracker", ['vesparny.fancyModal']);


app.config(['$fancyModalProvider', function ($fancyModalProvider) {
    $fancyModalProvider.setDefaults({
        themeClass: 'fancy-modal-theme-default'
    });
}]);