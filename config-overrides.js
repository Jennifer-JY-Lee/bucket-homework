const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  // do stuff with the webpack config...
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#35c5f0",
      "@font-size-base": "15px",

      "@layout-body-background": "#ffffff",
      "@font-family": "'Apple SD Gothic Neo'",
      "@checkbox-size": "24px",
      "@label-color": "#424242"
    }
  })
);
