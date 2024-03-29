import React, { useEffect, useLayoutEffect, useState } from 'react'
import './style.css'
import { Button, Modal } from '@amcharts/amcharts5';
import { table } from 'console';

import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '../../components/layouts/Subheader/Subheader';
import Badge from '../../components/ui/Badge';
import Card, { CardHeader, CardHeaderChild, CardTitle, CardBody } from '../../components/ui/Card';
import { ModalHeader, ModalBody } from '../../components/ui/Modal';
import TableTemplate, { TableCardFooterTemplate } from '../../templates/common/TableParts.template';
import FormAddEnlace from '../Enlace/components/FormAddEnlace/FormAddEnlace';
import Container from '../../components/layouts/Container/Container';
import MapCobertura from './components/MapCobertura';
import DashboardService from '../../services/dashboard.service';
import { FetchService } from '../../services/config/FetchService';
import Spinner from '../../components/ui/Spinner';
import CoberturaGoogleMap from './components/CoberturaGoogleMap';
import imgPromotor from './imgs/men_promotor.png'
import imgPromovido from './imgs/men_promovido.png'
import imgCasilla from './imgs/casilla.png'

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
								<span className='text-xl'>Casilla: </span> <img src={imgCasilla} alt="" />
							</div>
							<CoberturaGoogleMap />
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