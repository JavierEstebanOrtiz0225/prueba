module.exports = {

    reporters: [
      'default',
      [
          "jest-html-reporters", {
              "publicPath": "api/test/reporters",
              "filename": "report.html",
              "expand": true
          }
      ],
  ],
};