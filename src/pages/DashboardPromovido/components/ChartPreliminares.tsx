import React, { useEffect, useState } from 'react'
import Barchart from './Barchart'
import Spinner from '../../../components/ui/Spinner'
import CreatorService from '../../../services/creator.service';

const ChartPreliminares = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [preliminares, setPreliminares] = useState<any>();
    const creatorService = new CreatorService().createInstanceServices()
    const MINUTE_MS = 20000;

    async function obtenerDataGraficoPremilinares() {
        setLoading(true);
        const _preliminares = await creatorService.dashboardService.obtenerPreliminares();
        setPreliminares(_preliminares);
        setLoading(false);
    }




    useEffect(() => {
        const interval = setInterval(async () => {
            await obtenerDataGraficoPremilinares();
        }, MINUTE_MS);

        return () => {
            clearInterval(interval);
        }
        }, [])

    if (loading) {
        return (
            <div className='flex justify-center items-center w-[100%] h-[80vh]'>
                <Spinner fullView={false} />
            </div>
        )
    }

    return (
        <>
            {
                preliminares ?
                    <Barchart
                     series={
                        {
                            name: "Elecciones",
                            data: preliminares.data.map((c) => Number(c.y))
                        }

                    }
                    categorias={preliminares.data.map((c) => c.name)} />

                    : null
            }
        </>
    )
}

export default ChartPreliminares