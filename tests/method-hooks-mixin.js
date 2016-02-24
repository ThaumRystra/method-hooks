describe('MethodHooks mixin', () => {
  beforeAll(addCustomMatchers)

  it('exists and is a function', () => {
    expect(MethodHooks).toBeDefined()
    expect(MethodHooks).toBeOfType('function')
  })

  it('takes an object with required keys as an argument', () => {
    const calls = {
      withoutArgs (){
        return MethodHooks()
      },
      withoutKeys (){
        return MethodHooks({})
      },
      withRequiredKeys (){
        return MethodHooks({name: 'method1', run: () => {}})
      }
    }

    expect(calls.withoutArgs).toThrow()
    expect(calls.withoutKeys).toThrow()
    expect(calls.withRequiredKeys).not.toThrow()
  })

  it('returns an options object with appropriate keys', () => {
    const newOptions = MethodHooks({name: 'method2', run: () => {}})

    expect(newOptions).toBeOfType('object')
    expect(newOptions.name).toBeDefined()
    expect(newOptions.run).toBeDefined()
  })
})

