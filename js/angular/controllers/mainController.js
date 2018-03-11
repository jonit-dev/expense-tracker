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

    /* LOCAL STORAGE =========================================== */
    //if theres some previous information, lets update our expenses
    if($scope.$storage.expenses) {
        $rootScope.expenses = $scope.$storage.expenses;
        $rootScope.expenses = dateService.fixDates($rootScope.expenses);
        $rootScope.totalAmount = $scope.$storage.expenses.totalAmount;
    }


    /* ------------------------------------------------------------|
    | SETTING UP CHART DATA
    *-------------------------------------------------------------*/

    $rootScope.categories = [
        {id: 0, name: 'Food'},
        {id: 1, name: 'Credit Card'},
        {id: 2, name: 'Eletronics'},
    ];

    //loop trough all expenses and setup chart data

    $scope.labels = expenseService.refreshChart().labels;
    $scope.data = expenseService.refreshChart().data;



    /* ------------------------------------------------------------|
    | FUNCTIONS
    *-------------------------------------------------------------*/

    //allow user to insert new expense data through a modal opening
    $scope.openExpenseModal = function () {
        /* CREATE BOILERPLATE VARIABLES =========================================== */

        $scope.expense = {
            exDate: null,
            exDescription: null,
            exAmount: null,
            exCategory: null
        };



       $rootScope.expenses.category = $rootScope.categories[0];


        console.log($scope.expense.exCategory);


        $scope.modal = $fancyModal.open({
            templateUrl: 'modals/expense-modal.html',
            controller: 'mainController'
        });

    };


    $scope.addExpense = function (expense) {

        expense.exCategory = $rootScope.expenses.category;//save expense category

        expenseService.addExpense(expense);

        //save expenses data on local storage
        $scope.$storage.expenses = $rootScope.expenses;

        $fancyModal.close();//close all modals

        //refresh chart data
        $scope.labels = expenseService.refreshChart().labels;
        $scope.data = expenseService.refreshChart().data;



    }


});