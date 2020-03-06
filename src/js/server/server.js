const express = require('express');
const multer = require('multer');
const multipart = multer();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../../webpack.config.js');

const app = express();
const port = 8081;

const devServerEnabled = true;



//IMPORTS
import _ from 'lodash';
import hap from 'hap-nodejs';
import pwauth from 'utilz';

if (devServerEnabled) {

    //Add HMR plugin
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);

    //Enable "webpack-dev-middleware"
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static('./dist'));

//API
app.post('/api/add', multipart.any(), function (req, res) {

    //execute addition(tasizan)
    const firstValue = parseInt(req.body.firstValue);
    const secondValue = parseInt(req.body.secondValue);
    const sum = firstValue + secondValue;

    //return result
    res.json({sum: sum, firstValue: firstValue, secondValue: secondValue});

});

app.listen(port, () => {
    console.log('Server started on port:' + port);
});
