const usernameReg = new RegExp(/^[a-zA-Z0-9_]+$/);
const passwordReg = new RegExp(/^[a-zA-Z0-9]+$/);

const messages = {
  username: 'Invalid username! Must be string with length min 4 symbols, only letters, numbers and symbol _ !',
  password: 'Invalid password! Must be string with length min 6 symbols, only letters and numbers!',
}

const userCredentialsValidator = {
  username: (value) => value && typeof value === 'string' && value.length >= 4 && RegExp(usernameReg).test(value) ? true : messages.username,
  password: (value) => value && typeof value === 'string' && value.length >= 6 && RegExp(passwordReg).test(value) ? true : messages.password,
}

export default userCredentialsValidator;