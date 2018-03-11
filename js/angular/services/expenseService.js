app.service('expenseService', function ($rootScope, $localStorage) {
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
            amount: expense.exAmount,
            category: expense.exCategory
        });
        //update total amount
        $rootScope.expenses.totalAmount = this.calculateTotalAmount($rootScope.expenses.data);

    };


    this.refreshChart = function() {
        let labels = [];
        let data = [];
        for(let expense of $rootScope.expenses.data) {


            console.log(expense);
        }

        return { labels: labels, data: data};


    }
});