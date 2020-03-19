
const express = require('express');
const multer = require('multer');
const multipart = multer();

import fs from 'fs';
//const settingsFile = 'config';
const settingsFile = '../../../icup.config.json';
console.log('settings file:');
console.log(JSON.stringify(settingsFile));
const settings = require(settingsFile);

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../../webpack.config.js');

const app = express();
const port = 8080;



//const devServerEnabled = true;

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

app.use(express.static('./dist'));

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

  const loadData = (settingsFile) => {
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
  app.storage.getItem(config.SETTINGS_KEY, (err, settings) => {
    if (err) {
      app.logger.error(`Unable to get settings - ${err.stack}`);
      return res.status(500).json({
        success: false
      });
    }
    res.json({
      success: true,
      settings: settings || getDefaultSettings()

    });
  });
  console.log('Thesettings: '+ settings);
});

app.post('/api/settings', (req, res) => {
  console.log('server: ' + req.body)
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'expected JSON body in request'
    });
  }

  app.storage.getItem(config.SETTINGS_KEY, (err, settings) => {
    if (err) {
      app.logger.error(`Unable to get settings - ${err.stack}`);
      return res.status(500).json({
        success: false
      });
    }

    if (!settings) {
      settings = getDefaultSettings();
    }

    if (typeof(req.body.shutoffDuration) !== 'undefined') {
      if (typeof(req.body.shutoffDuration) !== 'number' || req.body.shutoffDuration < 0 || req.body.duration >= 60) {
        return res.status(400).json({
          success: false,
          message: 'Optional field "shutoffDuration" is not a Number between 0 and 60'
        });
      }
      settings.shutoffDuration = req.body.shutoffDuration;
    }

    if (typeof(req.body.location) !== 'undefined') {
      if (req.body.location !== null && (typeof(req.body.location.latitude) !== 'number' || typeof(req.body.location.longitude) !== 'number')) {
        return res.status(400).json({
          success: false,
          message: 'Optional field "location" is not a latitude/longitude coordinate pair'
        });
      }
      settings.location = req.body.location;
    }


    app.storage.setItem(config.SETTINGS_KEY, settings, err => {
      if (err) {
        app.logger.error(`Unable to apply settings - ${err.stack}`);
        return res.status(500).json({
          success: false
        });
      }
      app.scheduler.reload();
      res.json({
        success: true,
        settings
      });
    });
  });
});



app.listen(port, () => {
  console.log('Server started on port:' + port);
});


function writeToConfig() {
  fs.writeFile(settingsFile, JSON.stringify(settings, null, 2), function writeJSON(err) {

  if (err) {
    return console.log(err);
  }

  console.log(JSON.stringify(settings));
  console.log('writing to ' + settingsFile);
});
}
