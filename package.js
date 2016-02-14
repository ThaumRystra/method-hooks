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
    'src/method-hooks-mixin.js'
  ])

  api.export('MethodHooks')
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'stevezhu:lodash@4.1.0',
    'lacosta:method-hooks@0.0.1',
    'sanjo:jasmine@0.21.0',
    'velocity:console-reporter@0.1.4',
    'velocity:helpers@0.5.0'
  ])

  api.addFiles([
    'tests/custom-matchers.js',
    'tests/method-hooks-mixin.js',
    'tests/before-hooks-handler.js',
    'tests/after-hooks-handler.js'
  ])
});
