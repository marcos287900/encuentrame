import {apiUrl} from '../config/apiProperties'
import SessionService from './SessionService';


/**
 * Manage base session headers for all services after user has logged in
 */
class Service {

  async sendRequest(url, requestData) {
    url = apiUrl + url;
    let userId = await SessionService.getSessionUserId();
    let token = await SessionService.getSessionToken();
    if (!requestData.headers){
      requestData.headers = {};
    }
    Object.assign(requestData.headers, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': token,
      'user': userId
    });

    let rawResponse = await fetch(url, requestData);
    this.checkResponseStatus(rawResponse);
    let finalResponse = await this.parseResponse(rawResponse);
    return finalResponse;
  }
  async parseResponse(rawResponse) {
    try {
      return await rawResponse.json();
    } catch (e) {
      console.error("Invalid server raw response", e);
      throw 'Ocurrió un problema en la comunicación con el servidor.'
    }
  }

  checkResponseStatus(rawResponse) {
    let status = rawResponse.status;
    if (status < 200 || status > 300) {
      console.debug(rawResponse);
      //TODO: add custom callback invokation for different callers
    }
  }

}

let baseService = new Service();
export default baseService;
