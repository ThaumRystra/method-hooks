describe('after hooks handler', () => {
  it('takes an array of functions', () => {
    const callWithIncorrectHooks = () => {
      return MethodHooks({
        name: 'methodName', afterHooks: () => {}, run: () => {}
      })
    }

    const callWithCorrectHooks = () => {
      return MethodHooks({
        name: 'methodName', afterHooks: [() => {}], run: () => {}
      })
    }

    expect(callWithIncorrectHooks).toThrow()
    expect(callWithCorrectHooks).not.toThrow()
  })

  it('runs each function in the after hooks array', () => {
    const hooks = {
      first (){},
      second (){},
      third (){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()
    spyOn(hooks, 'third').and.callThrough()

    MethodHooks({
      name: 'methodName', afterHooks: [
        hooks.first, hooks.second
      ], run (){}
    }).run()

    expect(hooks.first).toHaveBeenCalled()
    expect(hooks.second).toHaveBeenCalled()
    expect(hooks.third).not.toHaveBeenCalled()
  })

  it('calls each after hook with the proper arguments', () => {
    const hooks = {
      first (methodArgs, returnValue, methodOptions){},
      second (methodArgs, returnValue, methodOptions){},
      third (methodArgs, returnValue, methodOptions){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()
    spyOn(hooks, 'third').and.callThrough()

    const methodArgs = {testArg: 'testing'}
    const returnValue = 'returned value: testing'

    const methodOptions = {
      name: 'methodName',
      afterHooks: [
        hooks.first, hooks.second
      ],
      run ({testArg}){
        return 'returned value: ' + testArg
      }
    }

    MethodHooks(methodOptions).run(methodArgs)

    expect(hooks.first).toHaveBeenCalledWith(
      methodArgs, returnValue, methodOptions
    )
    expect(hooks.second).toHaveBeenCalledWith(
      methodArgs, returnValue, methodOptions
    )
    expect(hooks.third).not.toHaveBeenCalled()
  })
})

