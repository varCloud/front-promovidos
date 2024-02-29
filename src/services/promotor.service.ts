import { URIS_CONFIG } from '../config/uris.config';
import { useAuth } from '../context/authContext';
import { IService } from './config/Iservice';

class PromotorService {
	readonly base_uri = URIS_CONFIG.BASE_URL
	constructor(private _httpClient: IService) {}

	async obtenerPromotores() {
		try {
			const uri = `${this.base_uri}promotores/`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async crearPromotor(payload: any) {
		try {
			const uri = `${this.base_uri}promotores/`;
			return await this._httpClient.postData(uri, payload);
		} catch (error) {
			throw error;
		}
	}
}

export default PromotorService;
