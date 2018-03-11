let app = angular.module("expenseTracker", ['vesparny.fancyModal','ngStorage','chart.js']);


app.config(['$fancyModalProvider', function ($fancyModalProvider) {
    $fancyModalProvider.setDefaults({
        themeClass: 'fancy-modal-theme-default'
    });
}]);