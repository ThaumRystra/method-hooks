MethodHooks = function(options){
  const {ObjectIncluding, Optional} = Match

  check(options, ObjectIncluding({
    name: String,
    beforeHooks: Optional([Function]),
    afterHooks: Optional([Function]),
    run: Function
  }))

  const {
    beforeHooks,
    afterHooks,
    run
  } = options

  const newOptions = {...options}

  newOptions.run = function(args){
    if (beforeHooks && beforeHooks.length) {
      beforeHooks.forEach(hook => hook(args, {...options}))
    }

    const returnValue = run(args)

    if (afterHooks && afterHooks.length) {
      afterHooks.forEach(hook => hook(args, returnValue, {...options}))
    }

    return returnValue
  }

  return newOptions
};

