// unit-plugin.js

module.exports = {
    install: function (less, pluginManager, functions) {
      functions.add("pxToVw", function (param) {
        return (param.value / 375) * 100 + "vw";
      });
    },
  };
  
  