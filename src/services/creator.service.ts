import CasillasService from './casillas.service';
import CoalicionesPartidosService from './coaliciones.service';
import { FetchService } from './config/FetchService';
import DashboardService from './dashboard.service';
import EnlaceService from './enlace.service';
import PromotorService from './promotor.service';
import ReportesService from './reportes.service';
import SeccionesService from './secciones.service';
import VotosService from './votos.service';
import VotosSeccionesService from './votosSecciones.service';

class CreatorService {
	private _token: string = '';

	constructor() {
		this._token = window.localStorage.getItem(`user`)
			? JSON.parse(window.localStorage.getItem(`user`)).token
			: '';
	}

	public createInstanceServices() {
		return {
			enlaceService: new EnlaceService(new FetchService(this._token)),
			promotorService: new PromotorService(new FetchService(this._token)),
			reportesService: new ReportesService(new FetchService(this._token)),
			casillasService: new CasillasService(new FetchService(this._token)),
			votosService: new VotosService(new FetchService(this._token)),
			coalicionesPartidosService: new CoalicionesPartidosService(
				new FetchService(this._token),
			),
			dashboardService: new DashboardService(new FetchService(this._token)),
			seccionesService: new SeccionesService(new FetchService(this._token)),
			votosSeccionesService: new VotosSeccionesService(new FetchService(this._token)),
		};
	}
}

export default CreatorService;
