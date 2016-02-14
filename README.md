# Method Hooks

Use this mixin to add before and after hooks to validated methods creating using
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
  // Before hooks take the arguments to the method and the options object
  // passed to the ValidatedMethod constructor as arguments
const beforeHook = (methodArgs, methodOptions) => { }

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

Run tests with `velocity test-package ./`
