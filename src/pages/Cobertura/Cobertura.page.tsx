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

const Cobertura = () => {
	const { token } = JSON.parse(window.localStorage.getItem(`user`));
	const _dashboardService: DashboardService = new DashboardService(new FetchService(token));
	const [loading, setLoading] = useState<boolean>(true);
	const [secciones, setSecciones] = useState<boolean>();

	const obtenerSeriesCoberturaPromovidos = async () => {
		try {
			setLoading(true)
			const _secciones = await _dashboardService.obtenerCoberturaPromovidos()
			setSecciones(_secciones)
			console.log(secciones)
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
								<span className='text-xl'>Promotor: </span> <img src={imgPromotor} alt="" />
								<span className='text-xl'>Promovido: </span> <img src={imgPromovido} alt="" />
								<span className='text-xl text-blue-900  ml-2'>Casilla D.10: </span>
								<div className='container-casilla' style={{
									background: BackgroundColorCasilla[10]
								}}>
									<img src={imgCasilla} alt="" />
								</div>

								<span className='text-xl  text-red-200  ml-2'>Casilla D.11: </span>
								<div className='container-casilla' style={{
									background: BackgroundColorCasilla[11]
								}}>
									<img src={imgCasilla} alt="" />
								</div>

								<span className='text-xl text-violet-200  ml-2'>Casilla D.16: </span>
								<div className='container-casilla' style={{
									background: BackgroundColorCasilla[16]
								}}>
									<img src={imgCasilla} alt="" />
								</div>

								<span className='text-xl text-lime-400  ml-2'>Casilla D.17: </span>
								<div className='container-casilla' style={{
									background: BackgroundColorCasilla[17]
								}}>
									<img src={imgCasilla} alt="" />
								</div>

							</div>
							<MapaCoberturaGoogleMap />
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