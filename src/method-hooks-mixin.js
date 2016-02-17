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

  delete options.beforeHooks
  delete options.afterHooks
  
  const newOptions = {...options}

  newOptions.run = function(args){
    let beforeArgs

    if (beforeHooks && beforeHooks.length) {
      beforeHooks.forEach(hook => beforeArgs = hook(args, {...options}))
    }

    let returnValue = run(beforeArgs || args)

    if (afterHooks && afterHooks.length) {
      afterHooks.forEach(hook => returnValue = hook(beforeArgs || args, returnValue, {...options}))
    }

    return returnValue
  }

  return newOptions
};
