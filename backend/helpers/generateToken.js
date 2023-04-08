export const Token = {
  GENERATE: () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2)
  }
}

export const JWT = {
  GENERATE: () => {

  },
  VERIFY: () => {

  }
}