async function main() {
    // const response = await fetch("https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=de72006e67634d1c8f6f3ac2482661a6")
    // const result = await response.json()

    
    // let GME = result.GME
    // let MSFT = result.MSFT
    // let DIS = result.DIS
    // let BNTX = result.BTNX
    

    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    
    // Bonus Note: 
    // Another way to write the above lines would to refactor it as:
    // const {GME, MSFT, DIS, BNTX} = result 
    // This is an example of "destructuring" an object
    // "Destructuring" creates new variables from an object or an array
    // const stocks = [GME, MSFT, DIS, BNTX];

    

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
    stocks.forEach( stock => stock.values.reverse())


    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighestPrice(stock.values)
                ))
            }]
        }
    });

    function findHighestPrice(values) {
        let highest = 0;
        values.forEach(value => {
            if (parseFloat(value.high) > highest) {
                highest = value.high
            }
        })
        return highest
      
    }
    
    
    
    //console.log(stocks[0].values)                                                  

}
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}                                                 

main()