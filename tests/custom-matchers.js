addCustomMatchers = () => {
  jasmine.addMatchers({
    toBeOfType (){
      return {
        compare (actual, expected){
          const result = {};

          switch (expected) {
            case 'function':
              result.pass = _(actual).isFunction();
              break;
            case 'object':
              result.pass = _(actual).isPlainObject();
              break;
            case 'array':
              result.pass = _(actual).isArray();
              break;
            default:
              result.pass = false;
          }

          if (result.pass) {
            result.message = `Expected ${actual} not to be of type ${expected}.`;

          } else {
            result.message = `Expected ${actual} to be of type ${expected}.`;
          }

          return result;
        }
      };
    }
  });
};

