yaml = require('js-yaml');
fs   = require('fs');
path = require('path');

exports.data = function() {
  var data = {
    all: [],
    design: [],
    development: [],
    marketing: []
  }
  
  // get data path
  var dataPath = path.join(__dirname, '_tools-raw.yml')
  var toolsPath = path.join(__dirname, '../..', 'tools')

  try {
    data.all = yaml.safeLoad(fs.readFileSync(dataPath, 'utf8'))
    for(var i = 0; i < data.all.length; i++) {
      var toolItem = data.all[i]
      toolItem.icon = path.join(toolsPath, toolItem.path, 'assets', toolItem.icon)
      if(path.parse(toolItem.icon).ext === '.svg') {
        toolItem.icon = fs.readFileSync(toolItem.icon, 'utf8')
      }

      toolItem.url = ('/' + toolItem.path).replace(/\\/g, '/')

      data[toolItem.category].push(toolItem)
    }
  } catch (e) {
    console.log(e);
  }

  // console.log("DATA: " + JSON.stringify(data))
  return data
}