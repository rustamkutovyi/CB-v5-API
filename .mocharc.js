module.exports = {
  require: ['@babel/register'],

  timeout: '20000',
  spec: 'specs/**/*.js',
  ignore: 'specs/example.spec.js',
  file: 'project-config/auth-global.hook.js',

  reporter: 'mochawesome',
  reporterOption: ['json=false', 'reportDir=MyReports'],
}
