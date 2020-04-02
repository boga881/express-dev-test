const express = require('express');
const multer = require('multer');
const multipart = multer();

import fs from 'fs';
import objectPath from 'object-path';

const userConfigFile = './config/user.config.json';
const settings = require(userConfigFile);

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const bodyParser = require('body-parser');

const app = express();
const port = 8080;

const devServerEnabled = process.env.NODE_ENV !== 'production';

if (devServerEnabled) {
  //reload=true:Enable auto reloading when changing JS files or content
  //timeout=1000:Time from disconnecting from server to reconnecting
  config.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');

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

function jsonReader(settingsFile, cb) {
  console.log('attempting to read json file');
  fs.readFile(userConfigFile, 'utf8', (err, fileData) => {
    if (err) {
      console.log(err)
      return cb && cb(err)
    }
    try {
      const object = JSON.parse(fileData)
      return cb && cb(null, object)
    } catch (err) {
      return cb && cb(err)
    }
  })
}

app.use(express.static('./dist'));
app.use(bodyParser.json());

app.post('/api/relayon', multipart.any(), function(req, res) {

  // No switch on dev environment
  if (!devServerEnabled) {
    const Gpio = require('onoff').Gpio;
    const led = new Gpio(26, 'out');
    process.on('SIGINT', _ => {
      led.unexport();
    });
  }

  settings.dan = '123';
  settings.random = 'random';
  writeToConfig();
  res.json('solenoid on');

  const loadData = (userConfigFile) => {
    try {
      return fs.readFileSync(path, 'utf8')
      //data = fs.readFileSync(path, 'utf8'),
      //console.log(data),
    } catch (err) {
      console.error(err)
      return false
    }
  }



});

app.post('/api/relayoff', multipart.any(), function(req, res) {
  console.log('---- OFF ----')
  console.log(JSON.stringify(req.body));
  // No switch on dev environment
  if (!devServerEnabled) {
    const Gpio = require('onoff').Gpio;
    const led = new Gpio(26, 'in');
    process.on('SIGINT', _ => {
      led.unexport();
    });
  }

  settings.dan = 'ABC';
  settings.pew = 'zap'
  writeToConfig();
  res.json('solenoid off');
});


//API
app.post('/api/add', multipart.any(), function(req, res) {

  //execute addition(tasizan)
  const firstValue = parseInt(req.body.firstValue);
  const secondValue = parseInt(req.body.secondValue);
  const sum = firstValue + secondValue;

  //return result
  res.json({
    sum: sum,
    firstValue: firstValue,
    secondValue: secondValue
  });

});



app.get('/api/settings', (req, res) => {
  jsonReader(settings, (err, jsonConfig) => {
    if (err) {
      console.log('Error: ');
      console.log(JSON.stringify(err));
      return res.status(500).json({
        success: false,
        message: 'Could not get the settings'
      });
    }

    return res.status(200).json({
      success: true,
      settings: jsonConfig
    });
  })
});

app.post('/api/settings', (req, res) => {
  if (!req.body) {
    console.log('Failed to update config');
    return res.status(400).json({
      success: false,
      message: 'expected path and value in body request'
    });
  }

  const configUpdated = writeToConfig(req.body);
  if (configUpdated) {
    return res.status(200).json({
      success: true,
      message: 'User config updated.'
    });
  }

});

app.listen(port, () => {
  console.log('Server started on port:' + port);
});


function writeToConfig(body) {
  jsonReader(userConfigFile, (err, jsonConfig) => {
    if (err) {
      console.log(err)
      return false;
    }

    const path = body.path;
    const value = body.value;
    objectPath.set(jsonConfig, path, value);

    if (devServerEnabled) {
      console.log('Writing new settings to ' + userConfigFile);
    }

    fs.writeFile(userConfigFile, JSON.stringify(jsonConfig, null, 2), (err) => {
      if (err) {
        console.log('Error writing file:', err)
        return false;
      }

      if (devServerEnabled) {
        console.log('New settings update complete:')
        console.log(userConfigFile);
      }

    })
    return true;
  })
}
