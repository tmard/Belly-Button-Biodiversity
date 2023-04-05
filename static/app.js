const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create function to create dropdown menu
function init(){
  d3.json(url).then(data => {

    let subjectIds = data.names;
    let select = d3.select("#selDataset");

    subjectIds.forEach(id => {
      select.append("option").attr("value", id).text(id);
    });
    
    redraw(subjectIds[0]);
  });
}


init();


// Create function to redraw data, subject ID and below charts for each Subject ID selected in the dropdown menu
function redraw(subjectId) {
  d3.json(url).then(data => {
    console.log(data);
    console.log(subjectId);

    DemoInfo(data, subjectId);  
    AllCharts(data, subjectId);
  });
}


// Demographic Info
function DemoInfo(data, subjectId) {

    // Use metadata_arr variable to filter for metadata 
    const metadata_arr = data.metadata;

    let result_arr = metadata_arr.filter(Object => Object.id == subjectId);
    let metadata_result = result_arr[0];

        // Use d3 to select the tag with id of `#sample-metadata`
        let metadata_tag = d3.select("#sample-metadata");

        // Clear existing metadata
        metadata_tag.html("");
    
        // Add each key and value pair to the panel
        Object.entries(metadata_result).forEach(([key, value]) => {
          metadata_tag.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
}


// Create function for the following charts - Horizontal, Bubble, Gauge
function AllCharts(data, subjectId) {
  
  // Create samples_arr variable to filter for sample 
  const samples_arr = data.samples;
  
  // Create variable that filters the samples for the object with the subject ID
  let filtered_samples = samples_arr.filter(Object => Object.id == subjectId);

  // Create variable that holds first sample
  let samples_first_sample = filtered_samples[0];
  console.log(samples_first_sample);

  // Create variables for otu_ids, otu_labels and sample_values
  let otuIds = samples_first_sample.otu_ids;
  let otuLabels = samples_first_sample.otu_labels;
  let sampleValues = samples_first_sample.sample_values;

  // Create yticks for the bar chart
  let yticks = otuIds.slice(0, 10).map(id => "OTU " + id + " ").reverse();


  //  HORIZONTAL BAR CHART - https://plotly.com/javascript/horizontal-bar-charts/ 
  //  For colorscales - https://plotly.com/javascript/colorscales/#rdbu-colorscale 
  let barData = [{
    x: sampleValues.slice(0, 10).reverse(),
    y: yticks,
    text: otuLabels.slice(0, 10).reverse(),
    type: "bar",
    orientation:"h",
    marker: {
      color: sampleValues.slice(0, 10).reverse(),
      colorscale: "RdBu"
    }
    }];

  // Create the layout for the bar chart. 
  let barLayout = {
    width: 500, 
    height: 450,
    title: "Top 10 Bacteria Cultures",
  }

  // Use Plotly to plot the data for the horizontal bar chart
  Plotly.newPlot("bar", barData, barLayout);


  // BUBBLE CHART - https://plotly.com/javascript/bubble-charts/ 
  let bubbleData = [{
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: otuIds,
      colorscale: "Viridis"
    }
  }];

  // Create the layout for the bubble chart. 
  let bubbleLayout = {
    width: 1300, 
    height: 400,
    title: 'Bacteria Cultures Per Sample',
    margins: {
      l: 0,
      r: 0,
      b: 0,
      t: 0     
    },
  };

  // Use Plotly to plot the data for the bubble chart
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);


  // GAUGE CHART (https://plotly.com/javascript/gauge-charts/)
  // Use metadata_arr variable to filter for first metadata
  const metadata_arr = data.metadata;
  // Create variable that filters the metadata for the object with desired sample number
  let filtered_metadata = metadata_arr.filter(Object => Object.id == subjectId);

  // Create variable that holds first metadata
  let metadata_first_sample = filtered_metadata[0];
  console.log(metadata_first_sample);

  // Create washing frequency variable
  let washing_freq = parseFloat(metadata_first_sample.wfreq);

  let gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: washing_freq,
      title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
          bar: {color: 'white'},
          axis: { range: [null, 9] },
          steps: [
              { range: [0, 1], color: 'aliceblue'}, 
              { range: [1, 2], color: 'azure'},
              { range: [2, 3], color: 'lightcyan'},
              { range: [3, 4], color: 'paleturquoise' },
              { range: [4, 5], color: 'powderblue' },
              { range: [5, 6], color: 'lightblue' },
              { range: [6, 7], color: 'skyblue' },
              { range: [7, 8], color: 'lightskyblue' },
              { range: [8, 9], color: 'deepskyblue' },
          ],
      },
  }
  ];

  // Define Plot la yout
  let gaugeLayout = { 
      width: 500, 
      height: 400,
      margin: {t: 0, r: 0, l: 0, b: 0}
    };

  // Use Plotly to plot the gauge data and layout
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}