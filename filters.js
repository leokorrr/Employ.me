let dataObj = [
    {
        salary: 9000,
        reqs: [
            'req 1',
            'req 2',
            'req 3'
        ],
    },
    {
        salary: 8000,
        reqs: [
            'req 1',
            'req 2'
        ],
    },
    {
        salary: 7000,
        reqs: [
            'req 1',
            'req 2',
            'req 3',
            'req 4'
        ],
    },
    {
        salary: 6000,
        reqs: [
            'req 1',
            'req 2'
        ],
    },
    {
        salary: 4000,
        reqs: [
            'req 1',
            'req 2',
            'req 3',
            'req 4',
            'req 5'
        ],
    },
    {
        salary: 7800,
        reqs: [
            'req 1',
            'req 2',
            'req 3',
            'req 4',
        ],
    },
    {
        salary: 6500,
        reqs: [
            'req 1'
        ],
    },
    {
        salary: 9500,
        reqs: [
            'req 1',
            'req 2',
            'req 3',
            'req 4'
        ],
    },

]

let reqArr = ['req 2', 'req 4']
let sortingNumber = 8000;

let filters = {
    salary: true,
    requirements: true
}

function filterData (data) {
    let dataObjSorted = [];
    let dataObjFiltered = [];
    let dataFiltered = [];

    if (filters.salary) {
        for (var i = 0; i < data.length; i++) {
            if(data[i].salary >= sortingNumber) {
                dataObjSorted.push(data[i])
            }
        }
    } else {
        dataObjSorted = data;
    }
    
    if (filters.requirements) {
        for (var i = 0; i < dataObjSorted.length; i++) {
            let reqChecker = reqArr.some(v => dataObjSorted[i].reqs.includes(v))
    
            if (reqChecker) {
                dataObjFiltered.push(dataObjSorted[i])
            }
        }
    }

    if (dataObjFiltered.length <= dataObjSorted.length && filters.requirements) {
        dataFiltered = dataObjFiltered
    } else {
        dataFiltered = dataObjSorted
    }
    
    console.log(dataFiltered)
}

filterData(dataObj)

