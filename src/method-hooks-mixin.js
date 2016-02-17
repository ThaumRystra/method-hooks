MethodHooks = function(options){
  const {ObjectIncluding, Optional} = Match

  check(options, ObjectIncluding({
    name: String,
    beforeHooks: Optional([Function]),
    afterHooks: Optional([Function]),
    run: Function
  }))

  const {beforeHooks, afterHooks, run} = options

    // remove hooks to avoid sending hooks to themselves
    // remove run function to avoid sending hooks overridden #run
  delete options.beforeHooks
  delete options.afterHooks
  delete options.run

  const modifiedOptions = {...options}

  modifiedOptions.run = function(args){
    const modifiedArgs = (beforeHooks || []).reduce((newArgs, hook) => {
      return hook(newArgs, {...options})
    }, args)

    const returnValue = run(modifiedArgs)

    const modifiedReturnValue = (afterHooks || []).reduce((newReturnValue, hook) => {
      return hook(modifiedArgs, newReturnValue, {...options})
    }, returnValue)

    return modifiedReturnValue
  }

  return modifiedOptions
};
