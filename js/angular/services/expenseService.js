app.service('expenseService', function($rootScope) {
    this.calculateTotalAmount = function (expenses) {
        let total = 0;
        expenses.forEach((expense) => {
            total += expense.amount;
        });
        return total;
    }

    this.addExpense = function(expense) {

        $rootScope.expenses.push({
            id: $rootScope.expenses.length,
            date: expense.exDate,
            description: expense.exDescription,
            amount: expense.exAmount
        });
        //update total amount
        $rootScope.totalAmount = this.calculateTotalAmount($rootScope.expenses);

    }
});