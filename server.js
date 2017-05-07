var express = require("express");
var UAParser = require('ua-parser-js')
var parser = new UAParser();
var app = express();
app.set('port', (process.env.PORT || 2000));
app.get('/', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var lang = req.headers["accept-language"].split(",")[0];
    var os = parser.setUA(req.headers["user-agent"]).getOS();
    var os_detail = os.name + " " + os.version;
    json_data = {
        "ipaddress": ip,
        "language": lang,
        "software": os_detail
    }
    res.send(JSON.stringify(json_data));
});


app.listen(app.get('port'), function () {
    console.log('running on 2000');
});