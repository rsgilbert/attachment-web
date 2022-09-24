

/**
 * 
 * @param {*} e 
 * @returns {string} error message
 */
export const errorMessageFor = e => {
    return e.response?.data?.error || e.message
}