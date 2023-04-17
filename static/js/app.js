// Create init function and read in data
function init() {
    var dropdown = d3.select('#selDataset');

    d3.json('samples.json').then((data) => {
        var dropNames = data.names;
        dropNames.forEach(element => {
            dropdown.append('option').text(element).property('value', element);
        });
        var FirstName = dropNames[0];
        md(FirstName);
        bc(FirstName);
    });
}

// Create MetaData function
function md(sample) {
    // console.log(sample);
    d3.json('samples.json').then((data) => {
        var metaData = data.metadata; 
        var resultsArray = metaData.filter(x => x.id== sample);
        // console.log(resultsArray)

        var firstResult = resultsArray[0];
        var PANEL = d3.select('#sample-metadata');
        PANEL.html('');
        Object.entries(firstResult).forEach(([k,y]) => {
            PANEL.append('h6').text(`${k.toUpperCase()}:${y}`);
        });

    });
}

// Create build chart function
function bc(element) {
    console.log(element);
    d3.json('samples.json').then((data) => {
        var metaData = data.metadata; 
        var sampleData = data.samples;
        var resultsArray = sampleData.filter(x => x.id== element);
        var firstResult = resultsArray[0];

        var otu_ids = firstResult.otu_ids;
        var sample_values = firstResult.sample_values;
        var otu_labels = firstResult.otu_labels;
        
        var yticks = otu_ids.slice(0,10).map(x => `OTU ${x}`).reverse();

        // Creating bar chart
        var barData = {
            y: yticks,
            x: sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type:'bar',
            orientation:'h',

        }
        var barLayout = {
            title:'Top 10 Bacteria'
        };
        Plotly.newPlot('bar', [barData], barLayout)
        
        // Creating bubble data 

        var bubbleData = {

        }

        // Creating bubble layout

        var bubbleLayout = {

        }
        Plotly.newPlot()
    });
}

function optionChanged(example) {
    md(example);
    bc(example);

}
init();

///otu_ids?????