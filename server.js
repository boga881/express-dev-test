import express from 'express';
import fs from 'fs';
import objectPath from 'object-path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

import CronJob from 'cron';
import superagent from "superagent";
import { platform } from 'os';

const historyFile = './config/history.json';
const history = require(historyFile);

const userConfigFile = './config/user.config.json';

const scheduleFile = './config/schedules.json';
const schedule = require(scheduleFile);


const app = express();
const port = 3030;

const devServerEnabled = process.env.NODE_ENV !== 'production';

if (devServerEnabled) {
  //reload=true:Enable auto reloading when changing JS files or content
  //timeout=1000:Time from disconnecting from server to reconnecting
  //config.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');

  //Add HMR plugin
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);

  //Enable "webpack-dev-middleware"
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));


  var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
    heartbeat: 2000
});

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
  console.log("Get history");
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

  const write = writeToConfig(req.body, historyFile)
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
  console.log("Get settings");
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

  const result = writeToConfig(req.body, userConfigFile);

  if (result) {
    return res.status(200).send({
       success: true
     })
  }
  else {
    return res.status(500).send({
      success: false
    });
  }

});

app.get('/api/schedule', (req, res) => {
  console.log("Get schedule");
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
* API v2 
*/

app.post('/api/v2/update', (req, res) => {
  if (!req.body) {
    console.log('Failed to update config');
    return res.status(400).json({
      success: false,
      message: 'expected path and value in body request'
    });
  }

  const result = writeToConfig(req.body, req.body.file);

  if (result) {
    return res.status(200).send({
       success: true
     })
  }
  else {
    return res.status(500).send({
      success: false
    });
  }

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

function writeToConfig(body, jsonFile) {

  const configFile = body.file;
  const settingsFile = require(configFile);

  if (devServerEnabled) {
    console.log(`Body: ${JSON.stringify(body)}`)
  }

  jsonReader(configFile, (err, jsonConfig) => {
    if (err) {
      console.log(err)
      return false;
    }

    const path = body.name;
    const id = body.id;
    let value = body.value;

    // Convert strings to bool if true/false values.
    if (value == "true" ){
      value = true;
    }

    if (value == "false" ){
      value = false;
    }

    // Set the open time if vale is opening else null
    if (path.includes("status.isOpen")) {
      const timeStartedStamp = value ? Date.now() : null;
      objectPath.set(jsonConfig, `valves.list.${id}.status.timeStated`, timeStartedStamp);

      if (value) {
        const name = objectPath.get(jsonConfig, `valves.list.${id}.name`);
        const time = generateRemainingTime(jsonConfig);
        const title = `Zone starting - ${name}`
        const message = `${time} minutes remaining for ${name} zone.`
        sendNotification(title, message, jsonConfig);
      }
      
    }

    console.log(JSON.stringify(body))
    
    objectPath.set(jsonConfig, path, value);

    if (devServerEnabled) {
      console.log('Writing new settings to => ' + configFile);
    }

    fs.writeFile(configFile, JSON.stringify(jsonConfig, null, 2), (err) => {
      if (err) {
        console.log('Error writing file:', err)
        return false;
      }

      if (devServerEnabled) {
        console.log('New settings updated to config => ' + configFile);
        console.log(`${path} => ${value}`);
      }

    })
  })
  return true;
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

function generateRemainingTime(jsonConfig) {
  const defaultDuration = jsonConfig.valves.defaultShutoffDuration;
  const minutes = Math.floor(defaultDuration / 60000);
  const seconds = ((defaultDuration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


function sendNotification(title, message, config) {
  const device = "ICUP";
  let payload = {};
  let endpoint = null;
  if (config.notifications.pushover.enabled) {
    endpoint = config.notifications.pushover.endpoint;
    payload = {  
      "device": device,
      "token": config.notifications.pushover.token,
      "user": config.notifications.pushover.userKey,
      "title": title   ,
      "message": message
    }
  }

  if (endpoint) {
    superagent.post(endpoint)
    .send(payload)
    .end((err, res) => {
      // Calling the end function will send the request
    });
  }
  
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



// console.log('Before job instantiation');
// const job = new CronJob('0 */10 * * * *', function() {
// 	const d = new Date();
// 	console.log('Every Tenth Minute:', d);
// });
// console.log('After job instantiation');
// job.start();