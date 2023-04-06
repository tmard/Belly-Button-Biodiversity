// GAUGE CHART (https://plotly.com/javascript/gauge-charts/)
 function gaugeChart(data, subjectId) {
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
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0   
      }
    };

  // Use Plotly to plot the gauge data and layout
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}