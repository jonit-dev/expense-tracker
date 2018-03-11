app.service('dateService', function ($rootScope) {

    //This function is used to convert the ISO timestamp format in a new Date data type
    //this should be called after loading data from localStorage, otherwise, date wont be read.
    this.fixDates = function (expenses) {
        for (let expense of expenses.data) {
            expense.date = new Date(expense.date);
            expense.month = expense.date.getMonth();
            let weeks = this.getWeeksInMonth(expense.date.getMonth(),expense.date.getFullYear())

            console.log(expense.date.getDate());

            //set the corresponding week number, based on date
            for(let week of weeks) {
                let myDate = expense.date.getDate();
                if(myDate >= week.start && myDate <= week.end) {
                    expense.week = week.id;
                }
            }

        }
        $rootScope.expenses = expenses;
        return expenses;
    };


    this.getDaysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    }

    this.getWeeksInMonth = function (month, year) {
        let weeks = [],
            firstDate = new Date(year, month, 1),
            lastDate = new Date(year, month + 1, 0),
            numDays = lastDate.getDate();

        let start = 1;
        let end = 7 - firstDate.getDay();

        weeks.push({
            id: weeks.length,
            label:'All weeks',
            start:1,
            end: numDays
        });


        while (start <= numDays) {

            weeks.push({
                id: weeks.length,
                start: start, end: end, label: (month+1)+'/'+start+'/'+year+' to '+(month+1)+'/'+end+'/'+year});
            start = end + 1;
            end = end + 7;
            if (end > numDays)
                end = numDays;
        }
        return weeks;
    }

});