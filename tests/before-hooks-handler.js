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
      first (methodArgs, methodOptions){},
      second (methodArgs, methodOptions){},
      third (methodArgs, methodOptions){}
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

    MethodHooks(methodOptions).run(methodArgs)

    expect(hooks.first).toHaveBeenCalledWith(methodArgs, methodOptions)
    expect(hooks.second).toHaveBeenCalledWith(methodArgs, methodOptions)
    expect(hooks.third).not.toHaveBeenCalledWith(methodArgs, methodOptions)
  })
})

