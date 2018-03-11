app.controller("mainController", function ($scope, $fancyModal, $rootScope, expenseService) {


    /* ------------------------------------------------------------|
    | FAKE DATA
    *-------------------------------------------------------------*/

    //set expenses data to rootScope, so we can easily manipulate it across other functions

    $rootScope.expenses = {
      data: [
          {id: 0, date: new Date(2018, 1, 16), description: "This is an expense", amount: 100.00}
      ],
      totalAmount: 0
    };

    $rootScope.totalAmount = expenseService.calculateTotalAmount($rootScope.expenses.data);

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



        $fancyModal.close();//close all modals




    }


});