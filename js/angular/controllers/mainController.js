app.controller("mainController", function ($scope, $fancyModal, $rootScope, expenseService, $localStorage, dateService, $timeout) {

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
        data: [],
        totalAmount: 0
    };

    /* LOCAL STORAGE =========================================== */
    //if theres some previous information, lets update our expenses
    if ($scope.$storage.expenses) {
        $rootScope.expenses = $scope.$storage.expenses;
        $rootScope.expenses = dateService.fixDates($rootScope.expenses);
        $rootScope.totalAmount = $scope.$storage.expenses.totalAmount;
    }

    /* ------------------------------------------------------------|
    | SETTING UP CHART DATA
    *-------------------------------------------------------------*/

    $scope.categories = [
        {id: 0, name: 'Food'},
        {id: 1, name: 'Credit Card'},
        {id: 2, name: 'Eletronics & Tech'},
        {id: 3, name: 'Education'},
        {id: 4, name: 'Rental'},
        {id: 5, name: 'Healthcare'},
        {id: 5, name: 'Transport'},
        {id: 6, name: 'Taxes'},
        {id: 7, name: 'Communication'},

    ];

    $scope.selectedCategory = $scope.categories[0].id; //set initial value


    $rootScope.labels = expenseService.refreshChart().labels;
    $rootScope.data = expenseService.refreshChart().data;


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


        $scope.modal = $fancyModal.open({
            templateUrl: 'modals/expense-modal.html',
            controller: 'mainController'
        });

    };


    $scope.addExpense = function (expense) {

        let label = $scope.categories.find((category) => {
            if (category.id === $scope.selectedCategory) {
                return category;
            }
        });
        // console.log(label);


        expense.exCategory = label.name;

        expenseService.addExpense(expense);

        //save expenses data on local storage
        $scope.$storage.expenses = $rootScope.expenses;

        $fancyModal.close();//close all modals

        $rootScope.labels = expenseService.refreshChart().labels;
        $rootScope.data = expenseService.refreshChart().data;

        // console.log($scope.labels);
        // console.log($scope.data);


    }


});