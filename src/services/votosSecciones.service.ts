import { URIS_CONFIG } from '../config/uris.config';
import { useAuth } from '../context/authContext';
import { IService } from './config/Iservice';

class VotosSeccionesService {
	readonly base_uri = URIS_CONFIG.BASE_URL;

	constructor(private _httpClient: IService) {}

	async obtenerVotos() {
		try {
			const uri = `${this.base_uri}votosSecciones`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async obtenerVotosPorCasilla(idSeccion) {
		try {
			const uri = `${this.base_uri}votosSecciones/${idSeccion}`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async ActualizarVotosPorCasilla(idSeccion, payload) {
		try {
			const uri = `${this.base_uri}votosSecciones/${idSeccion}`;
			return await this._httpClient.putData(uri, payload);
		} catch (error) {
			throw error;
		}
	}

	async registrarVotos(payload: any) {
		try {
			const uri = `${this.base_uri}votosSecciones`;
			return await this._httpClient.postData(uri, payload);
		} catch (error) {
			throw error;
		}
	}
}

export default VotosSeccionesService;
