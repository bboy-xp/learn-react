function sum(a, b) {
    return a + b;
}


function fetchData(callback) {
    setTimeout(() => {
        const data = 'i am fetched data'
        callback(data)
    }, 1000);
}


function callback(data) {
    return data;
}

exports.fetchData = fetchData;
exports.sum = sum;