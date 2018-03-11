app.service('expenseService', function ($rootScope) {
    this.calculateTotalAmount = function (expenses) {
        let total = 0;
        expenses.forEach((expense) => {
            total += expense.amount;
        });
        return total;
    };

    this.addExpense = function (expense) {

        $rootScope.expenses.data.push({
            id: $rootScope.expenses.data.length,
            date: expense.exDate,
            description: expense.exDescription,
            amount: expense.exAmount
        });
        //update total amount
        $rootScope.expenses.totalAmount = this.calculateTotalAmount($rootScope.expenses.data);


    }
});