import { URIS_CONFIG } from '../config/uris.config';
import { IService } from './config/Iservice';

class PromovidosService {
	readonly base_uri =URIS_CONFIG.BASE_URL

	constructor(private _httpClient: IService) {}

	async obtenerPromovidos() {
		try {
			const uri = `${this.base_uri}promovidos/`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async crearPromovido(payload: any) {
		try {
			const uri = `${this.base_uri}promovidos/`;
			return await this._httpClient.postData(uri, payload);
		} catch (error) {
			throw error;
		}
	}
}

export default PromovidosService;
