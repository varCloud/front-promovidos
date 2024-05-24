import { URIS_CONFIG } from '../config/uris.config';
import { useAuth } from '../context/authContext';
import { IService } from './config/Iservice';

class DashboardService {
	readonly base_uri = URIS_CONFIG.BASE_URL
	constructor(private _httpClient: IService) {}

	async obtenerIndicadores() {
		try {
			const uri = `${this.base_uri}dashboard/indicadores`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async obtenerDataGraficoGenero() {
		try {
			const uri = `${this.base_uri}dashboard/obtenerDataGraficoGenero`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async obtenerDataGraficoEdades() {
		try {
			const uri = `${this.base_uri}dashboard/obtenerDataGraficoEdades`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async obtenerCoberturaPromovidos() {
		try {
			const uri = `${this.base_uri}dashboard/obtenerCoberturaPromovidos`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async obtenerPreliminares() {
		try {
			const uri = `${this.base_uri}dashboard/obtenerVotosDeCoaliciones`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	async obtenerDataGraficoVotara() {
		try {
			const uri = `${this.base_uri}dashboard/obtenerDataGraficoVotara`;
			return await this._httpClient.fetchData(uri);
		} catch (error) {
			throw error;
		}
	}

	
}

export default DashboardService;
