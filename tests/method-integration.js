describe('ValidatedMethod integration', () => {
  it('takes MethodHooks as a mixin', () => {
    const method = new ValidatedMethod({
      name: 'methodName',
      mixins: [MethodHooks],
      validate: new SimpleSchema({}).validator(),
      run (){}
    })

    const callMethod = () => {
      return method.call({})
    }

    expect(callMethod).not.toThrow()
  })

  it('takes beforeHooks as an optional property with an array value', () => {
    const methodWithHooks = new ValidatedMethod({
      name: 'methodWithHooks',
      mixins: [MethodHooks],
      validate: new SimpleSchema({}).validator(),
      beforeHooks: [],
      run (){}
    })

    const methodWithoutHooks = new ValidatedMethod({
      name: 'methodWithoutBeforeHooks',
      mixins: [MethodHooks],
      validate: new SimpleSchema({}).validator(),
      run (){}
    })

    const callMethodWithHooks = () => {
      return methodWithHooks.call({})
    }

    const callMethodWithoutHooks = () => {
      return methodWithoutHooks.call({})
    }

    expect(callMethodWithHooks).not.toThrow()
    expect(callMethodWithoutHooks).not.toThrow()
  })

  it('takes afterHooks as an optioanl property with an array value', () => {
    const methodWithHooks = new ValidatedMethod({
      name: 'methodWithAfterHooks',
      mixins: [MethodHooks],
      validate: new SimpleSchema({}).validator(),
      afterHooks: [],
      run (){}
    })

    const methodWithoutHooks = new ValidatedMethod({
      name: 'methodWithoutAfterHooks',
      mixins: [MethodHooks],
      validate: new SimpleSchema({}).validator(),
      run (){}
    })

    const callMethodWithHooks = () => {
      return methodWithHooks.call({})
    }

    const callMethodWithoutHooks = () => {
      return methodWithoutHooks.call({})
    }

    expect(callMethodWithHooks).not.toThrow()
    expect(callMethodWithoutHooks).not.toThrow()
  })

  it('calls all beforeHooks passed to ValidatedMethod', () => {
    const hooks = {
      first (methodArgs, methodOptions){},
      second (methodArgs, methodOptions){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()

    const methodWithHooks = new ValidatedMethod({
      name: 'methodWithMultipleBeforeHooks',
      mixins: [MethodHooks],
      validate: new SimpleSchema({}).validator(),
      beforeHooks: [hooks.first, hooks.second],
      run (){}
    })

    methodWithHooks.call({})

    expect(hooks.first).toHaveBeenCalled()
    expect(hooks.second).toHaveBeenCalled()
  })

  it('calls all afterHooks passed to ValidatedMethod', () => {
    const hooks = {
      first (methodArgs, returnValue, methodOptions){},
      second (methodArgs, returnValue, methodOptions){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()

    const methodWithHooks = new ValidatedMethod({
      name: 'methodWithMultipleAfterHooks',
      mixins: [MethodHooks],
      validate: new SimpleSchema({}).validator(),
      afterHooks: [hooks.first, hooks.second],
      run (){}
    })

    methodWithHooks.call({})

    expect(hooks.first).toHaveBeenCalled()
    expect(hooks.second).toHaveBeenCalled()
  })
})
