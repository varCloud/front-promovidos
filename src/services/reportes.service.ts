import { URIS_CONFIG } from '../config/uris.config';
import { IService } from './config/Iservice';

class ReportesService {
	readonly base_uri =URIS_CONFIG.BASE_URL

	constructor(private _httpClient: IService) {}

	async obtenerPromovidosPorPromtorPDF(idPromotor) {
		try {
			const uri = `${this.base_uri}reportes/promovidoPorPromotor/${idPromotor}`;
			return await this._httpClient.fetchFile(uri);
		} catch (error) {
			throw error;
		}
	}

	async obtenerTodosLosPromovidosPDF() {
		try {
			const uri = `${this.base_uri}reportes/obtenerTodosPromovidos`;
			return await this._httpClient.fetchFile(uri,);
		} catch (error) {
			throw error;
		}
	}	

	async obtenerTodosLosPromotoresPDF() {
		try {
			const uri = `${this.base_uri}reportes/obtenerTodosPromotores`;
			return await this._httpClient.fetchFile(uri,);
		} catch (error) {
			throw error;
		}
	}

	async obtenerTodosEnlacesPorPromotorPDF(idPromotor) {
		try {
			const uri = `${this.base_uri}reportes/obtenerTodosEnlaces/${idPromotor}`;
			return await this._httpClient.fetchFile(uri,);
		} catch (error) {
			throw error;
		}
	}

	async obtenerTodosEnlacesPDF() {
		try {
			const uri = `${this.base_uri}reportes/obtenerTodosEnlaces/`;
			return await this._httpClient.fetchFile(uri,);
		} catch (error) {
			throw error;
		}
	}

	async obtenerPromovidosPDF() {
		try {
			const uri = `${this.base_uri}reportes/obtenerPromovidos/`;
			return await this._httpClient.fetchFile(uri,);
		} catch (error) {
			throw error;
		}
	}
}

export default ReportesService;
