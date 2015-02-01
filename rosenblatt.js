Network = function(nodes, weights, linout) {
    this.nodes = nodes;
    this.weights = weights;
    this.linout = linout;
    if (weights.length > (nodes[0] * nodes[1] + nodes[1] * nodes[2] + nodes[1] + nodes[2])) {
        this.skip = true;
    } else {
        this.skip = false;
    }
};

Network.prototype._activation = function(sum) {
    if (sum < -15) {
        return (0);
    } else if (sum > 15) {
        return (1);
    } else {
        return (1 / (1 + Math.exp(-sum)));
    }
};

Network.prototype.predict = function(input) {

    var weights = this.weights.slice(0);
    var hidden = [];
    var output = [];

    for (var h = 0; h < this.nodes[1]; h++) {
        var bias = weights.pop();
        hidden.push(bias);
        for (var i = 0; i < this.nodes[0]; i++) {
            var weight = weights.pop();
            hidden[h] = hidden[h] + weight * input[i];
        }
        hidden[h] = this._activation(hidden[h]);
    }

    for (var o = 0; o < this.nodes[2]; o++) {
        var bias = weights.pop();
        output.push(bias);
        for (var h = 0; h < this.nodes[1]; h++) {
            var weight = weights.pop();
            output[o] = output[o] + weight * hidden[h];
        }
    }

    if (this.skip) {
        for (var o = 0; o < this.nodes[2]; o++) {
            var s = weights.pop();
            for (var i = 0; i < this.nodes[0]; i++) {
                var weight = weights.pop();
                output[o] = output[o] + weight * input[i];
            }
        }
    }

    if (!this.linout) {
        for (var o = 0; o < this.nodes[2]; o++) {
            output[o] = this._activation(output[o]);
        }
    }

    return output;
};

module.exports.Network = Network;