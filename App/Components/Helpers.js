


export function validateClientEmail(email, isRequired = false) {
    const res = setResponse();
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    const emailExp = new RegExp(regex);
    if (!email && !isRequired) return res;
    return !emailExp.test(email) ? setResponse(L20n.getRaw('invalidEmail')) : res;
  }