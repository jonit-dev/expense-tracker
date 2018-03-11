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
            amount: expense.exAmount,
            category: expense.exCategory
        });
        //update total amount
        $rootScope.expenses.totalAmount = this.calculateTotalAmount($rootScope.expenses.data);

    };


    this.refreshChart = function () {


        /* STACK EXPENSE LABELS =========================================== */

        //the code below is responsible for stacking expense data on the same category (if they are similar)
        let categories = {};
        for (let expense of $rootScope.expenses.data) {
            if (typeof categories[expense.category] === 'undefined') {
                categories[expense.category] = 0;
            }
        }
        for (let category in categories) {
            let results = $rootScope.expenses.data.filter((expense) => {
                if (expense.category === category) {
                    return expense;
                }
            });
            let totalAmount = 0;
            results.map((result) => {
                totalAmount += result.amount;
            });
            categories[category] = totalAmount;
        }


        console.log(categories);

        let labels = [];
        let data = [];

        for(let category in categories) {
            labels.push(category);
            data.push(categories[category]);
        }

        return {labels: labels, data: data};


    }
});