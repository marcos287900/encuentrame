import {apiUrl} from '../config/apiProperties'
import SessionService from './SessionService';

class UserService {

  /**
   * Check registered user credentials against api
   */
  async checkCredentials(user) {

    let rawResponse = await fetch(apiUrl + 'authentication/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "Username": user.username,
        "Password": user.password
      })
    });
    let loginResponse = await rawResponse.json();
    if (rawResponse.status !== 200) {
      loginResponse.status = rawResponse.status;
      this._manageLoginErrors(loginResponse);
    }


    // Login OK. Guardamos el token y el userId en la sesion.
    try {
      await SessionService.setSession({token: loginResponse.Token, userId: loginResponse.UserId});
    } catch (e) {
      console.error(e);
      throw 'Problema al guardar la sesion';
    }

  }
  _manageLoginErrors(loginResponse){
    if (loginResponse.status === 401) {
      throw 'Credenciales inválidas';
    }
    if (loginResponse.status === 400) {
      throw 'Error en el formato de las credenciales';
    }

  }

  async registerUser(userData) {

    if (!userData.username || userData.username === ''
      || !userData.password || userData.password === '') {
      throw `Por favor, ingrese un username y contraseñas válidos.`;
    }

    let userRegistrationResult = await fetch(apiUrl + 'account/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "Username": userData.username,
        "Password": userData.password,
        "Email": userData.email
      })
    });

    if (userRegistrationResult.status !== 200) {
      throw 'Error en el registro...';
    }

    console.log(`Registrado '${userData.username}' exitosamente!'`);
  }
}

let userService = new UserService();
export default userService;
