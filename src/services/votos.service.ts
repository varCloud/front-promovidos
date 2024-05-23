import { URIS_CONFIG } from '../config/uris.config';
import { useAuth } from '../context/authContext';
import { IService } from './config/Iservice';

class VotosService {
	readonly base_uri = URIS_CONFIG.BASE_URL
	constructor(private _httpClient: IService) {}

	async obtenerVotos() {
		try {
			const uri = `${this.base_uri}votos`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async obtenerVotosPorCasilla(idCasilla) {
		try {
			const uri = `${this.base_uri}votos/votosPorCasilla/${idCasilla}`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}
	async ActualizarVotosPorCasilla(idCasilla,payload) {
		try {
			const uri = `${this.base_uri}votos/votosPorCasilla/${idCasilla}`;
			return await this._httpClient.putData(uri,payload);
		} catch (error) {
			throw error;
		}
	}

	async registrarVotos(payload:any) {
		try {
			const uri = `${this.base_uri}votos`;
			return await this._httpClient.postData(uri,payload);
		} catch (error) {
			throw error;
		}
	}
}

export default VotosService;
