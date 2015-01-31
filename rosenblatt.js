Network = function(nodes, weights, linout) {
    this.nodes = nodes;
    this.weights = weights;
    this.linout = linout;
};

Network.prototype.predict = function(input) {
};

module.exports.Network = Network;