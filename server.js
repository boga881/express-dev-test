import express from 'express';
import fs from 'fs';
import objectPath from 'object-path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

const historyFile = './config/history.json';
const history = require(historyFile);
const userConfigFile = './config/user.config.json';
const settings = require(userConfigFile);
const scheduleFile = './config/schedules.json';
const schedule = require(scheduleFile);


const app = express();
const port = 3030;

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
app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Server started on port:' + port);
});

/*
 * The API endpoints.
 */
app.get('/api/history', (req, res) => {
  jsonReader(historyFile, (err, jsonFile) => {
    if (err) {
      console.log('Error...: ' + JSON.stringify(err));
      return res.status(500).json({
        success: false,
        message: 'Could not get history'
      });
    }

    return res.status(200).json({
      success: true,
      history: jsonFile
    });
  })
});

app.post('/api/history', (req, res) => {
  if (!req.body) {
    console.log('Failed to update history');
    return res.status(400).json({
      success: false,
      message: 'expected history path in body request'
    });
  }

  writeToConfig(req.body, historyFile)
    .then((result) => {
      res.status(200).send({
        success: true
      })
    })
    .catch((error) => {
      res.status(500).send({
        success: false
      });
    });

});

app.get('/api/settings', (req, res) => {
  jsonReader(userConfigFile, (err, jsonConfig) => {
    if (err) {
      console.log('Error...: ' + JSON.stringify(err));
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

  writeToConfig(req.body, userConfigFile)
    .then((result) => {
      res.status(200).send({
        success: true
      })
    })
    .catch((error) => {
      res.status(500).send({
        success: false
      });
    });

});

app.get('/api/schedule', (req, res) => {
  jsonReader(scheduleFile, (err, jsonConfig) => {
    if (err) {
      console.log('Error...: ' + JSON.stringify(err));
      return res.status(500).json({
        success: false,
        message: 'Could not get the schedule'
      });
    }

    return res.status(200).json({
      success: true,
      schedule: jsonConfig
    });
  })
});

app.post('/api/schedule', (req, res) => {
  if (!req.body) {
    console.log('Failed to update schedule');
    return res.status(400).json({
      success: false,
      message: 'expected path and value in body request'
    });
  }

  writeToSchedule(req.body, scheduleFile, 'add')
    .then((result) => {
      res.status(200).send({
        success: true
      })
    })
    .catch((error) => {
      res.status(500).send({
        success: false
      });
    });

});

app.post('/api/schedule/remove', (req, res) => {
  if (!req.body) {
    console.log('Failed to remove schedule');
    return res.status(400).json({
      success: false,
      message: 'expected path and value in body request'
    });
  }

  writeToSchedule(req.body, scheduleFile, 'remove')

    .then((result) => {
      res.status(200).send({
        success: true
      })
    })
    .catch((error) => {
      res.status(500).send({
        success: false
      });
    });

});

/*
 * Custom server methods.
 */
function jsonReader(jsonFile, cb) {
  console.log('Reading json file...');
  fs.readFile(jsonFile, 'utf8', (err, fileData) => {
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

function writeToSchedule(body, jsonFile, type) {
  jsonReader(jsonFile, (err, jsonConfig) => {
    if (err) {
      console.log(err)
      return false;
    }

    if (type === 'add') {
      const path = body.data.name.replace(/\s+/g, '-').toLowerCase();
      const value = body.data;
      objectPath.set(jsonConfig, path, value);
    }

    if (type === 'remove') {
      objectPath.del(jsonConfig, body.data);
    }

    // if (objectPath.has(jsonConfig, path)) {
    //   objectPath.set(jsonConfig, path, value);
    // }



    if (devServerEnabled) {
      console.log('Writing new schedule to => ' + jsonFile);
    }

    fs.writeFile(jsonFile, JSON.stringify(jsonConfig, null, 2), (err) => {
      if (err) {
        console.log('Error writing file:', err)
        return false;
      }

      if (devServerEnabled) {
        console.log('New settings updated to config => ' + jsonFile);
      }

    })
    return true;
  })
}

function writeToConfig(body, jsonFile) {
  console.log(`Body: ${JSON.stringify(body)}`)
  jsonReader(jsonFile, (err, jsonConfig) => {
    if (err) {
      console.log(err)
      return false;
    }

    const path = body.name;
    const value = body.value;
    objectPath.set(jsonConfig, path, value);

    if (devServerEnabled) {
      console.log('Writing new settings to => ' + jsonFile);
    }

    fs.writeFile(jsonFile, JSON.stringify(jsonConfig, null, 2), (err) => {
      if (err) {
        console.log('Error writing file:', err)
        return false;
      }

      if (devServerEnabled) {
        console.log('New settings updated to config => ' + jsonFile);
        console.log(`${path} => ${value}`);
      }

    })
    return true;
  })
}

/*
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

*/
