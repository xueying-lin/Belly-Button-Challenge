// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samplesArray = data.samples
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samplesArray.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metaArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaresult = metaArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var selected_otu_ids = result.otu_ids;
    var selected_otu_lables = result.otu_lables;
    var selected_sample_value = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
   
    // Create the yticks for the bar chart.
    var sortedSample = samplesArray.sort((a,b) => a.sample_values - b.sample_values).reverse();
    var top10Sample = sortedSample.slice(0,10);
    var yticks= top10Sample.map(sample => sample.otu_ids);
    var top10Samplevalue = top10Sample.map(sample => sample.sample_values);

    // Use Plotly to plot the bar data and layout.
    var trace = {
      x: top10Samplevalue,
      y: yticks,
      type: "bar"
    };
    var data = [trace];
    var layout = {
      title: "Top 10 Bacteria Cultures Found",
    };
    
    Plotly.newPlot("bar", data, layout);
    
    // 1. Create the trace for the bubble chart.

    trace1 = {
      x: selected_otu_ids,
      y: selected_sample_value,
      mode: "markers",
      type:"scatter",
      text: selected_otu_lables,
      marker: {size: 12}



    }

    var bubbleData = [trace1
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      xaxis: {
        range: [ 0, 3500]
      },
      yaxis: {
        range: [0, 250]
      },
      legend: {
        x: 0.5,
        xref: 'OTU ID',
        font: {
            family: 'Arial, sans-serif',
            size: 20,
            color: 'grey',
          }
      },
      title:'Bacteria Culture Per Sample'
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}

    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
  
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
  
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });
}
