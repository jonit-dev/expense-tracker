app.controller("mainController", function ($scope, $fancyModal, $rootScope, expenseService, $localStorage, dateService, $timeout) {

    /* ------------------------------------------------------------|
    | DEFAULT VARIABLES
    *-------------------------------------------------------------*/
    //just initialize some variables like keyword, so we can filter the data by description

    $scope.keyword = "";

    $scope.months = [
    {id: 0, name: 'January', weeks: dateService.getWeeksInMonth(0,2018)},
    {id: 1, name: 'February',weeks: dateService.getWeeksInMonth(1,2018)},
    {id: 2, name: 'March', weeks: dateService.getWeeksInMonth(2,2018)},
    {id: 3, name: 'April', weeks: dateService.getWeeksInMonth(3,2018)},
    {id: 4, name: 'May', weeks: dateService.getWeeksInMonth(4,2018)},
    {id: 5, name: 'June', weeks: dateService.getWeeksInMonth(5,2018)},
    {id: 6, name: 'July', weeks: dateService.getWeeksInMonth(6,2018)},
    {id: 7, name: 'August', weeks: dateService.getWeeksInMonth(7,2018)},
    {id: 8, name: 'September', weeks: dateService.getWeeksInMonth(8,2018)},
    {id: 9, name: 'October', weeks: dateService.getWeeksInMonth(9,2018)},
    {id: 10, name: 'November', weeks: dateService.getWeeksInMonth(10,2018)},
    {id: 11, name: 'December', weeks: dateService.getWeeksInMonth(11,2018)},
    ];


    $scope.today = new Date();
    $scope.filter = {
        month: $scope.today.getMonth(),
        week: $scope.months[$scope.today.getMonth()].weeks[0].id
    };

    console.log($scope.months);


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

    console.log($scope.$storage.expenses);


    //check if all of them have categories. If not, reset localstorage to avoid future bugs.
    expenseService.categoryFix();

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
        {id: 6, name: 'Transport'},
        {id: 7, name: 'Taxes'},
        {id: 8, name: 'Communication'},

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
            exCategory: null,

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