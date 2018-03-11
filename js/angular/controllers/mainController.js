app.controller("mainController", function ($scope, $fancyModal, $rootScope, expenseService, $localStorage,dateService) {

    /* ------------------------------------------------------------|
    | DEFAULT VARIABLES
    *-------------------------------------------------------------*/
    //just initialize some variables like keyword, so we can filter the data by description

    $scope.keyword = "";



    /* ------------------------------------------------------------|
    | LOCALSTORAGE DATA
    *-------------------------------------------------------------*/

    //init localStorage
    $scope.$storage = $localStorage;

    //set expenses data to rootScope, so we can easily manipulate it across other functions
    $rootScope.expenses = {
      data: [

      ],
      totalAmount: 0
    };

    // //calculate total amount
    // $rootScope.totalAmount = expenseService.calculateTotalAmount($rootScope.expenses.data);


    /* LOCAL STORAGE =========================================== */
    //if theres some previous information, lets update our expenses
    if($scope.$storage.expenses) {
        $rootScope.expenses = $scope.$storage.expenses;
        $rootScope.expenses = dateService.fixDates($rootScope.expenses);
        $rootScope.totalAmount = $scope.$storage.expenses.totalAmount;
    }



    /* ------------------------------------------------------------|
    | FUNCTIONS
    *-------------------------------------------------------------*/

    //allow user to insert new expense data through a modal opening
    $scope.openExpenseModal = function () {
        /* CREATE BOILERPLATE VARIABLES =========================================== */

        $scope.expense = {
            exDate: null,
            exDescription: null,
            exAmount: null
        };


        $scope.modal = $fancyModal.open({
            templateUrl: 'modals/expense-modal.html',
            controller: 'mainController'
        });

    };


    $scope.addExpense = function (expense) {



        expenseService.addExpense(expense);

        $scope.$storage.expenses = $rootScope.expenses;


        $fancyModal.close();//close all modals




    }


});