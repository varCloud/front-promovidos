import { URIS_CONFIG } from '../config/uris.config';
import { useAuth } from '../context/authContext';
import { IService } from './config/Iservice';

class SeccionesService {
	readonly base_uri = URIS_CONFIG.BASE_URL;

	constructor(private _httpClient: IService) {}

	async obtenerSecciones() {
		try {
			const uri = `${this.base_uri}secciones`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}
}

export default SeccionesService;
