app.service('dateService', function ($rootScope) {

    //This function is used to convert the ISO timestamp format in a new Date data type
    //this should be called after loading data from localStorage, otherwise, date wont be read.
    this.fixDates = function (expenses) {


        for(let expense of expenses.data) {
                expense.date = new Date(expense.date);
        }
        console.log(expenses);

        $rootScope.expenses = expenses;

        return expenses;


    };
});