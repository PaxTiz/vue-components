/**
 * Check if a value is not null or undefined
 */
export const required = (message) => {
    return value => (value !== undefined && value !== null) ? true : message
}

/**
 * Check if a value length is greater or equal than {size}
 */
export const minLength = (size, message) => {
    return (value) => (required(message)(value) === true) && value.length >= size ? true : message
}

/**
 * Check if a value is greater or equal than {size}
 */
export const minValue = (size, message) => {
    return (value) => (required(message)(value) === true) && value >= size ? true : message
}

/**
 * Check if a value length is lower or equal than {size}
 */
export const maxLength = (size, message) => {
    return (value) => (required(message)(value) === true) && value.length <= size ? true : message
}

/**
 * Check if a value is lower or equal than {size}
 */
export const maxValue = (size, message) => {
    return (value) => (required(message)(value) === true) && value <= size ? true : message
}

/**
 * Check if a value is the same as {correctValue}
 */
export const equals = (correctValue, message) => {
    return (value) => value === correctValue ? true : message
}

/**
 * Check if a value is contains in {values} array
 */
export const inArray = (values, message) => {
    return (value) => values.includes(value) ? true : message
}

/**
 * Check if a value is contains in {string}
 */
export const contains = (string, message) => {
    return (value) => value.includes(string) ? true : message
}

