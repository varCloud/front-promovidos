import { URIS_CONFIG } from '../config/uris.config';
import { IService } from './config/Iservice';

class LoginService {
	readonly base_uri = URIS_CONFIG.BASE_URL

	constructor(private _httpClient: IService) {}

	async iniciarSesion(payload: any) {
		try {
			const uri = `${this.base_uri}login/iniciarSesion`;
			return await this._httpClient.postData(uri, payload);
		} catch (error) {
			throw error;
		}
	}
}

export default LoginService;
