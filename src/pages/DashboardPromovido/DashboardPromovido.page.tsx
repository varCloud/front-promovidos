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
import GraficoGenero from './components/GraficoGenero';
import GraficoEdades from './components/GraficoEdades';
import Spinner from '../../components/ui/Spinner';

function DashboardPromovido() {
    const { token } = JSON.parse(window.localStorage.getItem(`user`));
    const _dashboardService: DashboardService = new DashboardService(new FetchService(token));
    const [loading, setLoading] = useState<boolean>(true);
    const [indicadores, setIndicadores] = useState<any>([]);
    const [seriesGenero, setSeriesGenero] = useState<any>();
    const [seriesEdades, setSeriesEdades] = useState<any>();

    async function obtenerIndicadores() {
        setLoading(true);
        const _indicadores = await _dashboardService.obtenerIndicadores();
        setIndicadores([..._indicadores]);
        setLoading(false);
    }

    async function obtenerDataGraficoGenero() {
        setLoading(true);
        const _seriesGenero = await _dashboardService.obtenerDataGraficoGenero();
        setSeriesGenero(_seriesGenero);
        setLoading(false);
    }

    async function obtenerDataGraficoEdades() {
        setLoading(true);
        const _seriesEdades = await _dashboardService.obtenerDataGraficoEdades();
        setSeriesEdades(_seriesEdades);
        setLoading(false);
    }

    useEffect(() => {
        obtenerIndicadores();
        obtenerDataGraficoGenero();
        obtenerDataGraficoEdades();
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
                <div className='grid grid-cols-2 gap-4'>
                {
                    seriesGenero ?
                    <div className='mt-16 '>
                        <GraficoGenero series={seriesGenero} /> 
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