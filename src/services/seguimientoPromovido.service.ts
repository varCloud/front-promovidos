import { URIS_CONFIG } from '../config/uris.config';
import { IService } from './config/Iservice';

class SegumientosPromovidosService {
	readonly base_uri =URIS_CONFIG.BASE_URL

	constructor(private _httpClient: IService) {}

	async obtenerSegumientosPromovidos() {
		try {
			const uri = `${this.base_uri}segumientosPromovidos/`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async crearSegumientosPromovidos(payload: any) {
		try {
			const uri = `${this.base_uri}segumientosPromovidos/`;
			return await this._httpClient.postData(uri, payload);
		} catch (error) {
			throw error;
		}
	}

	async actualizarSegumientosPromovidos(payload: any) {
		try {
			const uri = `${this.base_uri}segumientosPromovidos/`;
			return await this._httpClient.putData(uri, payload);
		} catch (error) {
			throw error;
		}
	}

	async eliminarSegumientosPromovidos(id: any) {
		try {
			const uri = `${this.base_uri}segumientosPromovidos/${id}`;
			return await this._httpClient.deleteData(uri);
		} catch (error) {
			throw error;
		}
	}	

	async obtenerSeguimientosByPromovido(id: any) {
		try {
			const uri = `${this.base_uri}segumientosPromovidos/${id}`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}	
}

export default SegumientosPromovidosService;
