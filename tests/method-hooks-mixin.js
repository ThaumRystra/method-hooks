describe('MethodHooks mixin', () => {
  beforeAll(addCustomMatchers)

  it('exists and is a function', () => {
    expect(MethodHooks).toBeDefined()
    expect(MethodHooks).toBeOfType('function')
  })

  it('takes an object with required keys as an argument', () => {
    const callWithoutArguments = () => {
      return MethodHooks()
    }

    const callWithoutKeys = () => {
      return MethodHooks({})
    }

    const callWithRequiredKeys = () => {
      return MethodHooks({name: 'methodName', run: () => {}})
    }

    expect(callWithoutArguments).toThrow()
    expect(callWithoutKeys).toThrow()
    expect(callWithRequiredKeys).not.toThrow()
  })

  it('returns an options object with appropriate keys', () => {
    const newOptions = MethodHooks({name: 'methodName', run: () => {}})

    expect(newOptions).toBeOfType('object')
    expect(newOptions.name).toBeDefined()
    expect(newOptions.run).toBeDefined()
  })
})

