# Method Hooks

Use this mixin to add before and after hooks to validated methods created using
the `mdg:validated-method` package.

# Installation

`meteor add lacosta:method-hooks`

# Usage

First we create a new collection and attach a methods property

```
Todos = new Mongo.Collection('todos')
Todos.methods = {}
```

Next we declare our before and after hooks

```
  // Before hooks take the arguments to the method, and the method options
  // passed to the ValidatedMethod constructor as arguments

  // Before hooks return an arguments object that is then passed down
  // to the method. Hooks can modify the object however is needed.
const beforeHook = (methodArgs, methodOptions) => {
  return methodArgs
}

  // After hooks take the arguments to the method, the method's return value,
  // and the method options passed to the ValidatedMethod constructor as arguments
const afterHook = (methodArgs, returnValue, methodOptions) => { }
```

Then we define our method by including the mixin and our hooks

```
Todos.methods.addTodo = new ValidatedMethod({
  name: 'Todos.methods.addTodo',
  mixins: [MethodHooks],

    // both hooks take an array of functions as arguments
  beforeHooks: [beforeHook],
  afterHooks: [afterHook],

  validate: new SimpleSchema({
    _id: {type: String},
    text: {type: String}
  }).validator(),

  run (todo){
    return Todos.insert(todo)
  }
})
```

# Testing

If using the `velocity-cli` tool run tests with `velocity test-package ./`

To test using meteor's cli use `VELOCITY_TEST_PACKAGES=1 meteor test-packages
--driver-package velocity:console-reporter ./`
