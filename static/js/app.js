var stocks;
var covid;
d3.json("/stocks").then(function (data) {
  stocks = data.filter(obj => !obj.datetime.includes("-01-"))
  // console.log(stocks)
  d3.json("/us").then(function (coviddata) {
    covid = coviddata.filter(obj => !obj.Date.split("T")[0].includes("-01-"))
    // console.log(covid)
    barinit()
  })
});

function buildCharts(stock) {
  var stockInfo = stocks.filter(row => row.name === stock)
  console.log(stockInfo);
  var stockClose = stockInfo.map(row => row.close)
  var stockDate = stockInfo.map(row => row.datetime)
  var covidCases = covid.map(row => row.Cases)
  var covidDate = covid.map(row => row.Date.split("T")[0])
  // console.log(stockDate)
  var linetrace = {
    x: stockDate,
    y: stockClose,
    name: 'Index',
    type: 'scatter',
    marker: {
      color: 'rgb(0,0,255)'
    }

  };

  var bartrace = {
    x: covidDate,
    y: covidCases,
    name: 'US Covid cases',
    yaxis: 'y2',
    type: 'bar',
    marker: {
      color: 'rgb(255,51,051)'
    }

  };

  var data = [bartrace, linetrace];

  var layout = {
    title: `Stocks vs Covid 19`,
    yaxis: { title: 'Stock Index' },
    yaxis2: {
      title: '# of Covid19 cases',
      overlaying: 'y',
      side: 'right',
      autorange: true,
      type: "linear"
    }

  }
  Plotly.newPlot('bar', data, layout);

}

// populate drop down
function barinit() {
  // Grab a reference to the dropdown select element
  var selector = d3.select('#sel-stock');

  // Use the stock index names to populate the select options - reference server routes in app.py
  
  let stockNames = []
  stocks.forEach(stock => {
    if (!stockNames.includes(stock.name)) {
      stockNames.push(stock.name)
    }
  })
  stockNames.forEach(stock => {
    selector
      .append('option')
      .text(stock)
      .property('value', stock);
  });

  // Use selected stock from the list to build the initial plots
  const firstStock = stockNames[0];
  buildCharts(firstStock);
}

// // called in HTML - pass information from drop down here 
function optionChanged(newStock) {
  buildCharts(newStock);
}



// All DJI candlestick default graph
function defaultCandlestickgraph() {
  var dji_stock;
  d3.json("/dji").then(function(data) {
    dji_stock = data;
    // console.log(`this is defaultCandlestickgraph ${data}`);
    var dowClose = []
    var dowDates = []
    var dowHigh = []
    var dowLow = []
    var dowOpen = []
    var dowVolume = []
    for (var i = 0; i < data.length; i++) {
      dowClose.push(data[i].close);
      dowDates.push(data[i].datetime);
      dowHigh.push(data[i].high);
      dowLow.push(data[i].low);
      dowOpen.push(data[i].open);
      dowVolume.push(data[i].volume);
    } 
    //default Candlestick graph DJI
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: "Closing Prices",
      x: dowDates,
      y: dowClose,
      line: {
        color: "rgb(255, 153, 51)",
        width: 2
      }
    };
    var trace2 = {
      increasing: {line: {color: '#17BECF'}},
      decreasing: {line: {color: '#7F7F7F'}},       
      type: "candlestick",
      name: "Other Prices",
      x: dowDates,
      high: dowHigh,
      low: dowLow,
      open: dowOpen,
      close: dowClose
    };
    
    var theCandleStock = [trace2, trace1];

    var layout = {
      title: `Dow Jones Industrial Average Candlestick Graph`,
      xaxis: {
        range: ["2020-01-02", "2020-04-05"],
        rangeselector: selectorOptions,
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear", 
        title: "Price ($)"
      }
    };
    Plotly.newPlot("bubble", theCandleStock, layout);
  });
};
defaultCandlestickgraph();

// the default muiltilinegraph for DJI
function DjiMultiLinegraph() {
  var prct_dji;
  d3.json("/percentdji").then(function(data){
    prct_dji = data;
    var priceClose = [];
    var prctClose = [];
    var prctDates = [];
    for (var i = 0; i < data.length; i++) {
      priceClose.push(data[i].close_dji);
      prctClose.push(data[i].prct_close);
      prctDates.push(data[i].datetime);
    }
    var trace1 = {
      x: prctDates,
      y: prctClose,
      name: 'Percent Change',
      line: {
        color: "rgb(255, 77, 77)",
        width: 1.5
      },
      type: 'scatter'
    };
    
    var trace2 = {
      x: prctDates,
      y: priceClose,
      name: 'Closing prices',
      yaxis: 'y2',
      line: {
        color: "rgb(1, 87, 155)",
        width: 2
      },
      type: 'scatter'
    };
    
    var data = [trace1, trace2];
    
    var layout = {
      title: 'Dow Jones Industrial Average Index vs Percent Change in Closing Prices',
      xaxis: {
        rangeselector: selectorOptions,
      },
      yaxis: {title: 'Percent Change (%)', tickformat:',%',range:[-.10,.10]},
      yaxis2: {
        title: 'Index value per day ($)',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'right'
      }
    };

    Plotly.newPlot('plot', data, layout);
    // console.log(priceClose);
    // console.log(prctClose);
    // console.log(prctDates);
  });
}

// the multilinegraph for BTC
function BtcMultiLinegraph() {
  var prct_btc;
  d3.json("/percentbtc").then(function(data){
    prct_dji = data;
    var priceClose = [];
    var prctClose = [];
    var prctDates = [];
    for (var i = 0; i < data.length; i++) {
      priceClose.push(data[i].close_dji);
      prctClose.push(data[i].close);
      prctDates.push(data[i].datetime);
    }
    var trace1 = {
      x: prctDates,
      y: prctClose,
      name: 'Percent Change',
      line: {
        color: "rgb(255, 77, 77)",
        width: 2
      },
      type: 'scatter'
    };
    
    var trace2 = {
      x: prctDates,
      y: priceClose,
      name: 'Closing prices',
      yaxis: 'y2',
      line: {
        color: "rgb(1, 87, 155)",
        width: 2
      },
      type: 'scatter'
    };
    
    var data = [trace1, trace2];
    
    var layout = {
      title: 'Bitcoin vs Percent Change in Closing Prices',
      xaxis: {
        rangeselector: selectorOptions,
      },
      yaxis: {title: 'Percent Change (%)', tickformat:',%',range:[-.50,.50]},
      yaxis2: {
        title: 'Value per day ($)',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'right'
      }
    };

    Plotly.newPlot('plot', data, layout);
    // console.log(priceClose);
    // console.log(prctClose);
    // console.log(prctDates);
  });
}

// the multilinegraph for Nasdaq
function NasMultiLinegraph() {
  var prct_btc;
  d3.json("/percentnas").then(function(data){
    prct_dji = data;
    console.log(data);
    var priceClose = [];
    var prctClose = [];
    var prctDates = [];
    for (var i = 0; i < data.length; i++) {
      priceClose.push(data[i].close_dji);
      prctClose.push(data[i].close);
      prctDates.push(data[i].datetime);
    }
    var trace1 = {
      x: prctDates,
      y: prctClose,
      name: 'Percent Change',
      line: {
        color: "rgb(255, 77, 77)",
        width: 2
      },
      type: 'scatter'
    };
    
    var trace2 = {
      x: prctDates,
      y: priceClose,
      name: 'Index Closing prices',
      yaxis: 'y2',
      line: {
        color: "rgb(1, 87, 155)",
        width: 2
      },
      type: 'scatter'
    };
    
    var data = [trace1, trace2];
    
    var layout = {
      title: 'Nasdaq vs Percent Change in Closing Prices',
      xaxis: {
        rangeselector: selectorOptions,
      },
      yaxis: {title: 'Percent Change (%)', tickformat:',%',range:[-.10,.10]},
      yaxis2: {
        title: 'Index Value per day ($)',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'right'
      }
    };

    Plotly.newPlot('plot', data, layout);
    // console.log(priceClose);
    // console.log(prctClose);
    // console.log(prctDates);
  });
}

// the multilinegraph for S&P 500
function SnpMultiLinegraph() {
  var prct_btc;
  d3.json("/percentsnp").then(function(data){
    prct_dji = data;
    console.log(data);
    var priceClose = [];
    var prctClose = [];
    var prctDates = [];
    for (var i = 0; i < data.length; i++) {
      priceClose.push(data[i].close_dji);
      prctClose.push(data[i].close);
      prctDates.push(data[i].datetime);
    }
    var trace1 = {
      x: prctDates,
      y: prctClose,
      name: 'Percent Change',
      line: {
        color: "rgb(255, 77, 77)",
        width: 2
      },
      type: 'scatter'
    };
    
    var trace2 = {
      x: prctDates,
      y: priceClose,
      name: 'Index Closing prices',
      yaxis: 'y2',
      line: {
        color: "rgb(1, 87, 155)",
        width: 2
      },
      type: 'scatter'
    };
    
    var data = [trace1, trace2];
    
    var layout = {
      title: 'S&P 500 Index vs Percent Change in Closing Prices',
      xaxis: {
        rangeselector: selectorOptions,
      },
      yaxis: {title: 'Percent Change (%)', tickformat:',%',range:[-.10,.10]},
      yaxis2: {
        title: 'Index Value per day ($)',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'right'
      }
    };

    Plotly.newPlot('plot', data, layout);
    // console.log(priceClose);
    // console.log(prctClose);
    // console.log(prctDates);
  });
}

//Fill in stock and cryptocurrency values specifically for dropdown
function init() {
  var allSymbols = ["Dow Jones", "Bitcoin", "S&P 500", "Nasdaq"]
  var dropdownValues = d3.select("#selDataset");
  allSymbols.forEach(function(name) {
    dropdownValues.append("option").text(name);
  })
}

init();



function updatePage() {
  //grabbed dropdown menu value using d3
  var dropdownMenu = d3.selectAll("#selDataset").node();
  var selectedOption = dropdownMenu.value;
  console.log(`selectedOption is: ${selectedOption}`);
  
  //Created an if/else statement for each stock to create updating Plotly graphs
  // if the selected option is equal to "Bitcoin"
  if (selectedOption == "Bitcoin") {
    var btc_stock;
    d3.json("/btc").then(function(data) {
      btc_stock = data;
      var btcClose = []
      var btcDates = []
      var btcHigh = []
      var btcLow = []
      var btcOpen = []
      for (var i = 0; i < data.length; i++) {
        btcClose.push(data[i].close);
        btcDates.push(data[i].datetime);
        btcHigh.push(data[i].high);
        btcLow.push(data[i].low);
        btcOpen.push(data[i].open);
      }
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: "Closing Prices",
        x: btcDates,
        y: btcClose,
        line: {
          color: "rgb(255, 153, 51)",
          width: 2
        }
      };
      var trace2 = {
        increasing: {line: {color: '#17BECF'}},
        decreasing: {line: {color: '#7F7F7F'}},        
        type: "candlestick",
        name: "Other Prices",
        x: btcDates,
        high: btcHigh,
        low: btcLow,
        open: btcOpen,
        close: btcClose
      };
      var theCandleStick = [trace2, trace1];
      var layout = {
        title: `Bitcoin Candlestick Graph`,
        xaxis: {
          rangeselector: selectorOptions,
          range: ["2020-01-01", "2020-04-05"],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear",
          title: "Price ($)"
        }
      };

      Plotly.newPlot("bubble", theCandleStick, layout);
    });
    BtcMultiLinegraph();
  }
  // if the selected option is equal to "S&P 500"
  else if (selectedOption == "S&P 500") {
    var snp_stock;
    d3.json("/snp").then(function(data) {
      snp_stock = data;
      var snpClose = []
      var snpDates = []
      var snpHigh = []
      var snpLow = []
      var snpOpen = []
      for (var i = 0; i < data.length; i++) {
        snpClose.push(data[i].close);
        snpDates.push(data[i].datetime);
        snpHigh.push(data[i].high);
        snpLow.push(data[i].low);
        snpOpen.push(data[i].open);
      }
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: "Closing prices",
        x: snpDates,
        y: snpClose,
        line: {
          color: "rgb(255, 153, 51)",
          width: 2
        }
      };
      var trace2 = {
        increasing: {line: {color: '#17BECF'}},
        decreasing: {line: {color: '#7F7F7F'}}, 
        type: "candlestick",
        name: "Other Prices",
        x: snpDates,
        high: snpHigh,
        low: snpLow,
        open: snpOpen,
        close: snpClose
      };
      var theCandleStick = [trace2, trace1];
      var layout = {
        title: `S&P 500 closing prices`,
        xaxis: {
          rangeselector: selectorOptions,
          range: ["2020-01-01", "2020-04-05"],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear",
          yaxis: "Price ($)"
        }
      };
      
      Plotly.newPlot("bubble", theCandleStick, layout);
    });
    SnpMultiLinegraph();
  }
  // if the selected option is equal to "Nasdaq"
  else if (selectedOption == "Nasdaq") {
    var nas_stock;
    d3.json("/nas").then(function(data) {
      nas_stock = data;
      var nasClose = []
      var nasDates = []
      var nasHigh = []
      var nasLow = []
      var nasOpen = []
      for (var i = 0; i < data.length; i++) {
        nasClose.push(data[i].close);
        nasDates.push(data[i].datetime);
        nasHigh.push(data[i].high);
        nasLow.push(data[i].low);
        nasOpen.push(data[i].open);
      }
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: "Closing Prices",
        x: nasDates,
        y: nasClose,
        line: {
          color: "rgb(255, 153, 51)",
          width: 2
        }
      };
      var trace2 = {
        increasing: {line: {color: '#17BECF'}},
        decreasing: {line: {color: '#7F7F7F'}},  
        type: "candlestick",
        name: "Other prices",
        x: nasDates,
        high: nasHigh,
        low: nasLow,
        open: nasOpen,
        close: nasClose
      };
      var theCandleStick = [trace1, trace2];
      var layout = {
        title: `Nasdaq Candlestick Graph`,
        xaxis: {
          rangeselector: selectorOptions,
          range: ["2020-01-01", "2020-04-05"],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear",
          title: "Price ($)"
        }
      };
      Plotly.newPlot("bubble", theCandleStick, layout);      
    });
    NasMultiLinegraph();
  }
  // if the selected option is equal to "Dow Jones"
  else {
    defaultCandlestickgraph();
    DjiMultiLinegraph();

  }
};


updatePage();
d3.selectAll("#selDataset").on("change", updatePage);

var selectorOptions = {
  buttons: [{
      step: 'month',
      stepmode: 'backward',
      count: 1,
      label: '1m'
  }, {
      step: 'month',
      stepmode: 'backward',
      count: 2,
      label: '2m'
  }, {
      step: 'month',
      stepmode: 'backward',
      count: 3,
      label: '3m'
  }, {
      step: 'all',
  }],
};