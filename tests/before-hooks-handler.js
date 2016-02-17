describe('before hooks handler', () => {
  it('takes an array of functions', () => {
    const callWithIncorrectHooks = () => {
      return MethodHooks({
        name: 'methodName', beforeHooks: () => {}, run: () => {}
      })
    }

    const callWithCorrectHooks = () => {
      return MethodHooks({
        name: 'methodName', beforeHooks: [() => {}], run: () => {}
      })
    }

    expect(callWithIncorrectHooks).toThrow()
    expect(callWithCorrectHooks).not.toThrow()
  })

  it('runs each function in the before hooks array', () => {
    const hooks = {
      first (){},
      second (){},
      third (){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()
    spyOn(hooks, 'third').and.callThrough()

    MethodHooks({
      name: 'methodName',
      beforeHooks: [
        hooks.first, hooks.second
      ],
      run (){}
    }).run()

    expect(hooks.first).toHaveBeenCalled()
    expect(hooks.second).toHaveBeenCalled()
    expect(hooks.third).not.toHaveBeenCalled()
  })

  it('calls each before hook with the proper arguments', () => {
    const hooks = {
      first (methodArgs, methodOptions){
        return methodArgs
      },
      second (methodArgs, methodOptions){
        return methodArgs
      },
      third (methodArgs, methodOptions){
        return methodArgs
      }
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()
    spyOn(hooks, 'third').and.callThrough()

    const methodArgs = {firstArg: 'testing'}

    const methodOptions = {
      name: 'methodName',
      beforeHooks: [
        hooks.first, hooks.second
      ],
      run (){}
    }

    const beforeOptions = {...methodOptions}
    delete beforeOptions.beforeHooks
    delete beforeOptions.run

    MethodHooks(methodOptions).run(methodArgs)

    expect(hooks.first).toHaveBeenCalledWith(methodArgs, beforeOptions)
    expect(hooks.second).toHaveBeenCalledWith(methodArgs, beforeOptions)
    expect(hooks.third).not.toHaveBeenCalled()
  })

  it('can modify the method arguments before being passed to the method', () => {
    const methods = {
      hook (methodArgs, methodOptions){
        methodArgs.text = 'modified args'
        return methodArgs
      },
    }

    spyOn(methods, 'hook').and.callThrough()

    const newOptions = MethodHooks({
      name: 'modifiedArgsMethod',
      beforeHooks: [methods.hook],
      validate: new SimpleSchema({
        text: {type: String}
      }).validator(),
      run ({text}){ return {text} }
    })

    spyOn(newOptions, 'run').and.callThrough()

    expect(newOptions.run({text: 'original args'}))
      .toEqual({text: 'modified args'})
  })

  it('allows multiple hooks to modify the method arguments', () => {
    const hooks = {
      first (methodArgs, methodOptions){
        const newArgs = {...methodArgs}
        newArgs.text = newArgs.text + ' first hook'
        return newArgs
      },
      second (methodArgs, methodOptions){
        const newArgs = {...methodArgs}
        newArgs.text = newArgs.text + ' second hook'
        return newArgs
      }
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()

    const newOptions = MethodHooks({
      name: 'multipleModifiedArgsMethod',
      beforeHooks: [hooks.first, hooks.second],
      validate: new SimpleSchema({
        text: {type: String}
      }).validator(),
      run ({text}){ return {text} }
    })

    spyOn(newOptions, 'run').and.callThrough()

    expect(newOptions.run({text: 'original args'}))
      .toEqual({text: 'original args first hook second hook'})
  })
})
