describe('before hooks handler', function(){
  beforeEach(function(){
    this.hooks = {
      first (methodArgs, methodOptions){
        return {...methodArgs, text: `${methodArgs.text} first hook`}
      },
      second (methodArgs, methodOptions){
        return {...methodArgs, text: `${methodArgs.text} second hook`}
      },
      third (methodArgs, methodOptions){
        return {...methodArgs, text: `${methodArgs.text} third hook`}
      }
    }

    spyOn(this.hooks, 'first').and.callThrough()
    spyOn(this.hooks, 'second').and.callThrough()
    spyOn(this.hooks, 'third').and.callThrough()
  })

  it('takes an array of functions', function(){
    const callWithCorrectHooks = () => (
      MethodHooks({name: 'method', beforeHooks: [this.hooks.first], run (){}})
    )
    const callWithIncorrectHooks = () => (
      MethodHooks({name: 'method', beforeHooks: this.hooks.first, run (){}})
    )

    expect(callWithCorrectHooks).not.toThrow()
    expect(callWithIncorrectHooks).toThrow()
  })

  it('runs each function in the before hooks array', function(){
    const {hooks} = this

    MethodHooks({
      name: 'methodName',
      beforeHooks: [
        hooks.first, hooks.second
      ],
      run (){}
    }).run({text: 'original args'})

    expect(hooks.first).toHaveBeenCalled()
    expect(hooks.second).toHaveBeenCalled()
    expect(hooks.third).not.toHaveBeenCalled()
  })

  it('calls each before hook with the proper arguments', function(){
    const {hooks} = this

    const methodOptions = {
      name: 'methodName',
      beforeHooks: [
        hooks.first, hooks.second
      ],
      run ({text}){ return {text} }
    }

    const beforeOptions = {...methodOptions}
    delete beforeOptions.beforeHooks
    delete beforeOptions.run

    MethodHooks(methodOptions).run({text: 'original args'})

    expect(hooks.first).toHaveBeenCalledWith({
      text: 'original args'
    }, beforeOptions)
    expect(hooks.second).toHaveBeenCalledWith({
      text: 'original args first hook'
    }, beforeOptions)
    expect(hooks.third).not.toHaveBeenCalled()
  })

  it('can modify the method arguments before being passed to the method', function(){
    const {hooks} = this

    const newOptions = MethodHooks({
      name: 'modifiedArgsMethod',
      beforeHooks: [hooks.first],
      validate: new SimpleSchema({
        text: {type: String}
      }).validator(),
      run ({text}){ return {text} }
    })

    spyOn(newOptions, 'run').and.callThrough()

    expect(newOptions.run({text: 'original args'}))
      .toEqual({text: 'original args first hook'})
  })

  it('allows multiple hooks to modify the method arguments', function(){
    const {hooks} = this

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
