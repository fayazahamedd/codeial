module.exports.home = function( req, res) {
    return res.end('<h1>Home</h1>');
}

module.exports.play = function( req, res) {
    return res.end('<h1>Lets Play</h1>');
}