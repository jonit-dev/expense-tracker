app.service('expenseService', function ($rootScope, $localStorage, dateService, $fancyModal) {
    this.calculateTotalAmount = function (expenses) {
        let total = 0;
        expenses.forEach((expense) => {
            total += expense.amount;
        });
        return total;
    };

    this.addExpense = function (expense, categories) {


        console.log('adding expense');


        /* Validation =========================================== */

        if(typeof expense === 'undefined'){
            alert('Error. Insert some form data!');
            return false;
        }

        if(typeof expense.exDescription === 'undefined') {
            alert('Please, fill a description to insert your expense.');
            return false;
        }

        if(!expense.exAmount) {
            alert('Please, insert a correct amount for your expense.');
            return false;
        }

        if(!dateService.isValidDate(expense.exDate)) {
            alert('Please, insert a valid data!');
            return false;
        }


        let label = categories.find((category) => {
            if (category.id === $rootScope.selectedCategory) {
                return category;
            }
        });
        // console.log(label);

        //set new expense category
        expense.exCategory = label.name;







        /* Inser new data =========================================== */

        $rootScope.expenses.data.push({
            id: $rootScope.expenses.data.length,
            date: expense.exDate,
            description: expense.exDescription,
            amount: expense.exAmount,
            category: expense.exCategory
        });
        //update total amount
        $rootScope.expenses.totalAmount = this.calculateTotalAmount($rootScope.expenses.data);
        $rootScope.expenses = dateService.fixDates($rootScope.expenses);

        $fancyModal.close();//close all modals

        //change weeks filter to all
        $rootScope.filter.week = 0;
    };

    this.categoryFix = function() {

        for(let expense of $rootScope.expenses.data) {
            if(typeof expense.category === 'undefined') {
                $localStorage.$reset();
                $rootScope.expenses.data = [];
                $rootScope.expenses.totalAmount = 0;
            }

        }


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


        // console.log(categories);

        let labels = [];
        let data = [];

        for(let category in categories) {
            labels.push(category);
            data.push(categories[category]);
        }

        return {labels: labels, data: data};


    }
});