export const convertSearchPattern = (pattern) => pattern.replace(/[.?+(){}^$|*]/g, '\\$&');
