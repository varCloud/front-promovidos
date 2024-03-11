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
}

export default ReportesService;
