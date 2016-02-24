MethodHooks = function(options){
  const {ObjectIncluding, Optional} = Match

  check(options, ObjectIncluding({
    name: String,
    beforeHooks: Optional([Function]),
    afterHooks: Optional([Function]),
    run: Function
  }))

  const {beforeHooks = [], afterHooks = [], run} = options

    // remove hooks to avoid sending hooks to themselves
    // remove run function to avoid sending hooks overridden #run
  delete options.beforeHooks
  delete options.afterHooks
  delete options.run

  const finalOptions = {...options, run (args){
    const finalArgs = beforeHooks.reduce((modifiedArgs, hook) => {
      return hook(modifiedArgs, {...options})
    }, args)

    const result = run(finalArgs)

    const finalResult = afterHooks.reduce((modifiedResult, hook) => {
      return hook(finalArgs, modifiedResult, {...options})
    }, result)

    return finalResult
  }}

  return finalOptions
};

