import { URIS_CONFIG } from '../config/uris.config';
import { useAuth } from '../context/authContext';
import { IService } from './config/Iservice';

class CasillasService {
	readonly base_uri = URIS_CONFIG.BASE_URL
	constructor(private _httpClient: IService) {}

	async obtenerCasillas() {
		try {
			const uri = `${this.base_uri}casillas`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}
}

export default CasillasService;
