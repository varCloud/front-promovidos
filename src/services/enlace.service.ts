import { URIS_CONFIG } from '../config/uris.config';
import { IService } from './config/Iservice';

class EnlaceService {
	readonly base_uri = URIS_CONFIG.BASE_URL;

	constructor(private _httpClient: IService) {}

	async obtenerEnlaces() {
		try {
			const uri = `${this.base_uri}enlaces/`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async crearEnlace(payload: any) {
		try {
			const uri = `${this.base_uri}enlaces/`;
			return await this._httpClient.postData(uri, payload);
		} catch (error) {
			throw error;
		}
	}

	async actualizarEnlace(payload: any) {
		try {
			const uri = `${this.base_uri}enlaces/`;
			return await this._httpClient.putData(uri, payload);
		} catch (error) {
			throw error;
		}
	}

	async eliminarEnlace(id: any) {
		try {
			const uri = `${this.base_uri}enlaces/${id}`;
			return await this._httpClient.deleteData(uri);
		} catch (error) {
			throw error;
		}
	}
}

export default EnlaceService;
