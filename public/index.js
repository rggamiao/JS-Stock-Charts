async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    const timeChartContext = timeChartCanvas.getContext('2d');
    const highPriceChartContext = highestPriceChartCanvas.getContext('2d')
    const averagePriceChartContext = averagePriceChartCanvas.getContext('2d')
    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=d1fff28e2ee647afa5b3612bb3e6a10e')
    let result = await response.json()
    console.log(result)
}

   
   const {GME, MSFT, DIS, BNTX} = mockData
   const stocks = [GME, MSFT, DIS, BNTX]
   console.log(stocks)
   

   let allHighValues = stocks.flatMap(stock => stock.values.map(value => parseFloat(value.high)));
   let highestOverall = Math.max(...allHighValues);
   
   
   let suggestedMax = highestOverall * 1.02;
   
  
   let highestPointPerStock = {};
   let highestPricePerStock = [];
   let averagePointPerStock = {};
   let averagePricePerStock = [];

   
   console.log('All High Values:', allHighValues)
   console.log("Highest Overall Data Point:", highestOverall);
   console.log('Average Price Per Stock:', averagePricePerStock)
   console.log('Highest Price Per Stock:', highestPricePerStock)
   console.log("Highest Points Per Stock:", highestPointPerStock);


   function getHighestStock() {
       
       stocks.forEach(stock => {
           if (stock && stock.values) {
               
               let highValues = stock.values.map(value => parseFloat(value.high));
               
              
               let highestForStock = Math.max(...highValues);
               console.log(`Highest for ${stock.meta.symbol} is ${highestForStock}`)

              
               highestPointPerStock[stock.meta.symbol] = highestForStock;
               highestPricePerStock.push(highestForStock);
           }    
       });
       return highestPricePerStock;   
   }

   function getAverageStock() {
       
       stocks.forEach(stock => {
           if (stock && stock.values) {
               
               let highValues = stock.values.map(value => parseFloat(value.high));
               
               let averagePrice = calculateAverage(highValues);
               console.log(`Average for ${stock.meta.symbol} is ${averagePrice}`)

              
               averagePointPerStock[stock.meta.symbol] = averagePrice;
               averagePricePerStock.push(averagePrice);
           }    
       });
       return averagePricePerStock; 
   }

 
   let timeChart = new Chart(timeChartContext, {
       type: 'line',
       data: {
           labels: stocks[0].values.map(value => value.datetime),
           datasets: stocks.map(stock => ({
               label: stock.meta.symbol,
               data: stock.values.map(value => parseFloat(value.high)),
               backgroundColor: getColor(stock.meta.symbol),
               borderColor: getColor(stock.meta.symbol),
           }))
       },
       options: {
           scales: {
               y: {
                   beginAtZero: false, 
                   suggestedMax: suggestedMax, 
               }
           }
       }
   });

   let highestPriceChart = new Chart(highPriceChartContext, {
       type: 'bar',
       data: {
           labels: stocks.map(stock => stock.meta.symbol),
           datasets: [{
               label: 'highest',
               data: getHighestStock(),
               backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
               borderColor: stocks.map(stock => getColor(stock.meta.symbol))
           }]
       },
       options: {
           scales: {
               y: {
                   beginAtZero: false, 
                   suggestedMax: suggestedMax, 
               }
           }
       }
   });
   

   var averagePriceChart = new Chart(averagePriceChartContext, {
       type: 'pie',
       data: {
           labels: stocks.map(stock => stock.meta.symbol),
           datasets: [{
               label: 'Average Price',
               data: getAverageStock(),
               backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
               borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
           }]
       }
   });
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

function calculateAverage(prices) {
   const total = prices.reduce((acc, price) => acc + price, 0);
   return total / prices.length;
}


main()