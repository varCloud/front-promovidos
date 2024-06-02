import React, { useEffect, useLayoutEffect, useState } from 'react'
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '../../components/layouts/Subheader/Subheader';
import Card, { CardHeader, CardHeaderChild, CardTitle, CardBody } from '../../components/ui/Card';
import Container from '../../components/layouts/Container/Container';
import DashboardService from '../../services/dashboard.service';
import { FetchService } from '../../services/config/FetchService';
import imgPromotor from './imgs/men_promotor.png'
import imgPromovido from './imgs/men_promovido.png'
import imgCasilla from './imgs/casilla.png'
import { BackgroundColorCasilla } from '../../config/constants';
import MapaCoberturaGoogleMap from './components/MapaCoberturaGoogleMap';
import './style.css'
import { ROL } from '../../utils/enums';

const Cobertura = () => {
	const { token } = JSON.parse(window.localStorage.getItem(`user`));
	const _dashboardService: DashboardService = new DashboardService(new FetchService(token));
	const [loading, setLoading] = useState<boolean>(true);
	const [secciones, setSecciones] = useState<boolean>();
	const [filtro, setFiltro] = useState<string>('todos');

	const obtenerSeriesCoberturaPromovidos = async () => {
		try {
			setLoading(true)
			const _secciones = await _dashboardService.obtenerCoberturaPromovidos()
			setSecciones(_secciones)
			setLoading(false)

		} catch (error) {
			setLoading(false)
		}

	}
	useEffect(() => {
		obtenerSeriesCoberturaPromovidos()
		return () => { };
	}, []);

	return (
		<>
			<PageWrapper name='Cobertura'>
				<Subheader>
					<SubheaderLeft>
						<p></p>
					</SubheaderLeft>
					<SubheaderRight>
						<p></p>
					</SubheaderRight>
				</Subheader>
				<Container>
					<Card className='h-full'>
						<CardHeader>
							<CardHeaderChild>
								<CardTitle>Cobertura de promovidos</CardTitle>
							</CardHeaderChild>
						</CardHeader>
						<CardBody>
							<div className='flex justify-center items-center gap-2'>
								<span className='text-xl text-blue-400 underline cursor-pointer ' onClick={() => setFiltro('todos') }> Actualizar </span> <span> | </span>
								<span className='text-xl underline cursor-pointer ' onClick={() => setFiltro(ROL.PROMOTOR.toString())}>Promotor: </span> <img onClick={() => setFiltro(ROL.PROMOTOR.toString())} src={imgPromotor} alt="" />
								<span className='text-xl underline cursor-pointer ' onClick={() => setFiltro(ROL.PROMOVIDO.toString())} >Promovido: </span> <img  onClick={() => setFiltro(ROL.PROMOVIDO.toString())} src={imgPromovido} alt="" />
								<span className='text-xl underline cursor-pointer text-blue-900  ml-2' onClick={() => setFiltro('casillas')}>Casilla D.10: </span>
								<div onClick={() => setFiltro('casillas')} className='container-casilla' style={{
									background: BackgroundColorCasilla[10]
								}}>
									<img src={imgCasilla} onClick={() => setFiltro('casillas')} alt="" />
								</div>

								<span className='text-xl underline cursor-pointer  text-red-200  ml-2'>Casilla D.11: </span>
								<div onClick={() => setFiltro('casillas')} className='container-casilla' style={{
									background: BackgroundColorCasilla[11]
								}}>
									<img src={imgCasilla} onClick={() => setFiltro('casillas')} alt="" />
								</div>

								<span className='text-xl underline cursor-pointer text-violet-200  ml-2'>Casilla D.16: </span>
								<div  onClick={() => setFiltro('casillas')}className='container-casilla' style={{
									background: BackgroundColorCasilla[16]
								}}>
									<img src={imgCasilla} onClick={() => setFiltro('casillas')} alt="" />
								</div>

								<span onClick={() => setFiltro('casillas')} className='text-xl underline cursor-pointer text-lime-400  ml-2'>Casilla D.17: </span>
								<div className='container-casilla' style={{
									background: BackgroundColorCasilla[17]
								}}>
									<img src={imgCasilla} onClick={() => setFiltro('casillas')} alt="" />
								</div>

							</div>
							<MapaCoberturaGoogleMap filterType={filtro} />
						</CardBody>
						{/* <CardBody className=' d-flex w-full'>
							{
								secciones ? <MapCobertura secciones={secciones} /> : <Spinner />
							}
						</CardBody> */}
					</Card>
				</Container>
			</PageWrapper>
		</>
	)
}


export default Cobertura;