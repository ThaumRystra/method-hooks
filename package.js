Package.describe({
  name: 'lacosta:method-hooks',
  version: '0.0.1',
  summary: 'Provide before and after hooks to methods created via mdg:validated-method',
  git: 'https://github.com/leonidez/method-hooks',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'check'
  ]);

  api.addFiles([
    'src/method-hooks.js'
  ])

  api.export('MethodHooks')
});

Package.onTest(function(api) {
});
