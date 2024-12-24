import {jwtDecode} from 'jwt-decode';

const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp === undefined) throw Error('no exp time');
    return decodedToken.exp < currentTime;
  } catch (err) {
    console.error(err);
    return true;
  }
};

export {
    isTokenExpired
};
