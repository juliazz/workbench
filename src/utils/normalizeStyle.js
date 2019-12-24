/* eslint-disable */
const uppercasePattern = /[A-Z]/g
const msPattern = /^ms-/
const cache = {}

const toHyphenLower = (match) => {
  return `-${match.toLowerCase()}`
}

const hyphenateStyleName = (name) => {
  if (cache.hasOwnProperty(name)) {
    return cache[name]
  }
  const _name = name.replace(uppercasePattern, toHyphenLower)
  return (cache[name] = msPattern.test(_name) ? `-${_name}` : _name)
}

const isArray = Array.isArray;
const keys = Object.keys;

const normalizeStyle = (data) => {
  let result = ''
  if (typeof data === 'string') {
    return data
  }

  if (!data && keys(data).length == 0) {
    return data
  }

  keys(data).forEach(item => {
    const key = item
    const value = data[item]
    result += `${hyphenateStyleName(item)}:${data[item]};`
  })
  return result
}

export default normalizeStyle
