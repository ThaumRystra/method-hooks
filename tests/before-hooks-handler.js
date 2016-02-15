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
      second (){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()

    MethodHooks({
      name: 'methodName',
      beforeHooks: [
        hooks.first, hooks.second
      ],
      run (){}
    }).run()

    expect(hooks.first).toHaveBeenCalled()
    expect(hooks.second).toHaveBeenCalled()
  })

  it('calls each before hook with the proper arguments', () => {
    const hooks = {
      first (args, options){},
      second (args, options){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()

    const args = 'testing'

    const options = {
      name: 'methodName',
      beforeHooks: [
        hooks.first, hooks.second
      ],
      run (){}
    }

    MethodHooks(options).run(args)

    expect(hooks.first).toHaveBeenCalledWith(args, options)
    expect(hooks.second).toHaveBeenCalledWith(args, options)
  })

  it('accepts multiple arguments to the .run function', () => {
    const hooks = {
      first (firstArg, secondArg, options){},
      second (firstArg, secondArg, options){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()

    const firstArg = 'first arg'
    const secondArg = 'second arg'

    const options = {
      name: 'methodName',
      beforeHooks: [
        hooks.first, hooks.second
      ],
      run (){}
    }

    MethodHooks(options).run(firstArg, secondArg)

    expect(hooks.first).toHaveBeenCalledWith(firstArg, secondArg, options)
    expect(hooks.second).toHaveBeenCalledWith(firstArg, secondArg, options)
  })
})

