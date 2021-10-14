const searchPatterValidator = {
  pattern: (value) => value && typeof value === 'string' && value.length > 0 ? true : 'invalid pattern, must be string with min 1 symbol!',
}

export default searchPatterValidator;