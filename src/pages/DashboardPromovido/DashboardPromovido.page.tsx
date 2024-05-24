import React, { useEffect, useState } from 'react'
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import { Button, Modal } from '@amcharts/amcharts5';
import { table } from 'console';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Subheader, { SubheaderLeft, SubheaderRight } from '../../components/layouts/Subheader/Subheader';
import Badge from '../../components/ui/Badge';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../components/ui/Card';
import { ModalHeader, ModalBody } from '../../components/ui/Modal';
import TableTemplate, { TableCardFooterTemplate } from '../../templates/common/TableParts.template';
import Cobertura from '../Cobertura/Cobertura.page';
import FormAddPromotor from '../Promotor/components/FormAddPromotor/FormAddPromotor';
import Container from '../../components/layouts/Container/Container';
import CardIndicador from './components/CardIndicador';
import { FetchService } from '../../services/config/FetchService';
import DashboardService from '../../services/dashboard.service';
import PieChart from './components/PieChart';
import GraficoEdades from './components/GraficoEdades';
import Spinner from '../../components/ui/Spinner';
import CreatorService from '../../services/creator.service';
import Barchart from './components/Barchart';
import ChartPreliminares from './components/ChartPreliminares';

function DashboardPromovido() {
    
    const creatorService = new CreatorService().createInstanceServices()
    const [loading, setLoading] = useState<boolean>(true);
    const [indicadores, setIndicadores] = useState<any>([]);
    const [seriesGenero, setSeriesGenero] = useState<any>();
    const [seriesEdades, setSeriesEdades] = useState<any>();
    const [seriesApoyaElMovimiento, setSeriesApoyaElMovimiento] = useState<any>();

    async function obtenerIndicadores() {
        setLoading(true);
        const _indicadores = await creatorService.dashboardService.obtenerIndicadores();
        setIndicadores([..._indicadores]);
        setLoading(false);
    }

    async function obtenerDataGraficoGenero() {
        setLoading(true);
        const _seriesGenero = await creatorService.dashboardService.obtenerDataGraficoGenero();
        setSeriesGenero(_seriesGenero);
        setLoading(false);
    }

    async function obtenerDataGraficoEdades() {
        setLoading(true);
        const _seriesEdades = await creatorService.dashboardService.obtenerDataGraficoEdades();
        setSeriesEdades(_seriesEdades);
        setLoading(false);
    }


    async function obtenerDataGraficoVotara() {
        setLoading(true);
        const _apoyaElMovimiento = await creatorService.dashboardService.obtenerDataGraficoVotara();
        setSeriesApoyaElMovimiento(_apoyaElMovimiento);
        setLoading(false);
    }

    useEffect(() => {
        obtenerIndicadores();
        obtenerDataGraficoGenero();
        obtenerDataGraficoEdades();
        obtenerDataGraficoVotara();
        return () => { };
    }, []);

    return (
        <PageWrapper name='DashBoard Promovido'>
            <Subheader>
                <SubheaderLeft>
                    <p></p>
                </SubheaderLeft>
                <SubheaderRight>
                    <p></p>
                </SubheaderRight>
            </Subheader>
            <Container>
                {
                    indicadores && indicadores.length > 0 ?
                        <div className='grid grid-cols-12 gap-4'>
                            {indicadores.map((indicador, index) => {
                                return (
                                    <div className='col-span-12 sm:col-span-6 lg:col-span-3' key={index}>
                                        <CardIndicador
                                            key={index}
                                            icon={indicador.icon}
                                            title={indicador.title}
                                            totalRegistros={indicador.totalRegistros}
                                            fechaUltimoRegistro={indicador.fechaUltimoRegistro}
                                            css={indicador.css}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <Spinner fullView={false} />
                }
                <div className=''>
                {
                    <div className='mt-16 '>
                        <ChartPreliminares></ChartPreliminares>
                    </div>
                }

                </div>
                <div className='grid grid-cols-2 gap-4'>
                {
                    seriesGenero ?
                    <div className='mt-16 '>
                        <PieChart colores={['#9235F2','#F235C0','#F5ECF1']} series={seriesApoyaElMovimiento} titulo={'Apoyan el movimiento'} /> 
                    </div>
                     :  <Spinner fullView={false} />
                }
                {
                    seriesGenero ?
                    <div className='mt-16 '>
                        <PieChart colores={['#355FF2','#D335F2', '#F23581']} series={seriesGenero} titulo={'Promovidos por genero'} /> 
                    </div>
                     :  <Spinner fullView={false} />
                }

                {
                     seriesEdades ?
                     <div className='mt-16 '>
                         <GraficoEdades series={seriesEdades} /> 
                     </div>
                      :  <Spinner fullView={false} />
                }
                </div>

            </Container>
        </PageWrapper>
    )
}

export default DashboardPromovido