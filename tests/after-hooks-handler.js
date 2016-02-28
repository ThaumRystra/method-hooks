describe('after hooks handler', function(){
  beforeEach(function(){
    this.hooks = {
      first (methodArgs, returnValue, methodOptions){
        return {text: `${returnValue.text} first hook`}
      },
      second (methodArgs, returnValue, methodOptions){
        return {text: `${returnValue.text} second hook`}
      },
      third (methodArgs, returnValue, methodOptions){
        return {text: `${returnValue.text} third hook`}
      }
    }

    spyOn(this.hooks, 'first').and.callThrough()
    spyOn(this.hooks, 'second').and.callThrough()
    spyOn(this.hooks, 'third').and.callThrough()
  })

  it('takes an array of functions', function(){
    const callWithCorrectHooks = () => (
      MethodHooks({name: 'method', afterHooks: [this.hooks.first], run (){}})
    )
    const callWithIncorrectHooks = () => (
      MethodHooks({name: 'method', afterHooks: this.hooks.first, run (){}})
    )

    expect(callWithCorrectHooks).not.toThrow()
    expect(callWithIncorrectHooks).toThrow()
  })

  it('runs each function in the after hooks array', function(){
    const {hooks} = this

    MethodHooks({
      name: 'method', afterHooks: [hooks.first, hooks.second],
      run ({text}){ return {text} }
    }).run({text: 'original args'})

    expect(hooks.first).toHaveBeenCalled()
    expect(hooks.second).toHaveBeenCalled()
    expect(hooks.third).not.toHaveBeenCalled()
  })

  it('calls each after hook with the proper arguments', function(){
    const {hooks} = this
    const methodOptions = {
      name: 'method', afterHooks: [hooks.first, hooks.second],
      run ({text}){ return {text} }
    }

    MethodHooks(methodOptions).run({text: 'original args'})

    expect(hooks.first).toHaveBeenCalledWith({
      text: 'original args'
    }, {text: 'original args'}, methodOptions)
    expect(hooks.second).toHaveBeenCalledWith({
      text: 'original args'
    }, {text: 'original args first hook'}, methodOptions)
    expect(hooks.third).not.toHaveBeenCalled()
  })

  it('can modify the return value before being returned as the result', function(){
    const newOptions = MethodHooks({
      name: 'method', afterHooks: [this.hooks.first],
      run ({text}){ return {text} }
    })

    spyOn(newOptions, 'run').and.callThrough()

    expect(newOptions.run({text: 'original args'}))
      .toEqual({text: 'original args first hook'})
  })

  it('allows multiple hooks to modify the return value', function(){
    const newOptions = MethodHooks({
      name: 'method', afterHooks: [this.hooks.first, this.hooks.second],
      run ({text}){ return {text} }
    })

    spyOn(newOptions, 'run').and.callThrough()

    expect(newOptions.run({text: 'original args'}))
      .toEqual({text: 'original args first hook second hook'})
  })
})

