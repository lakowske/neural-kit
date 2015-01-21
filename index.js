/*
 * convolve two vectors
 */
function convolve(a, b) {

    var sum = 0.0;

    for (var i = 0 ; i < a.length ; i++) {

        var partial = a[i] * b[i];

        sum += partial;
    }

    return sum;

}

function randomVector(size) {
    var weights = new Array(size);

    for (var i = 0 ; i < size ; i++) {
        weights[i] = Math.random();
    }

    return weights;
}

function genWeights(size) {
    return randomVector();
}

function getLayer(neurons, weights) {
    var layer = new Array(neurons);

    for (var i = 0 ; i < neurons ; i++) {
        layer[i] = genWeights(weights);
    }

    return layer;
}

function getNet(layers, neurons, weights) {
    var net = new Array(layers);

    for (var i = 0 ; i < layers ; i++) {
        net[i] = getLayer(neurons, weights);
    }

    return net;

}

function forward(net, layer, input) {
    if (layer >= net.length) {
        return input;
    }

    var output = new Array(input.length);

    //grab a neuron
    for (var j = 0 ; j < net[layer].length ; j++) {
        output[j] = convolve(net[layer][j], input);
    }

    return forward(net, layer+1, output);
}

for (var j = 0 ; j < 10000000 ; j++) {

    var net   = getNet(2, 2, 4);
    var input = randomVector(4);

    if ((j % 10000) === 0) {
        console.log( forward(net, 0, input) )
    } else {
        forward(net, 0, input);
    }

}
