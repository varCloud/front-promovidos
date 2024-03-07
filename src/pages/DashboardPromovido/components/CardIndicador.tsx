

import React from 'react'
import Card, { CardBody } from '../../../components/ui/Card'
import Icon from '../../../components/icon/Icon'
import Tooltip from '../../../components/ui/Tooltip'
import Balance from '../../../components/Balance'


const  CardIndicador = (props) => {
    const {icon, title, totalRegistros, fechaUltimoRegistro , css} = props
    return (
        <Card>
            <CardBody>
                <div className='flex flex-col gap-2'>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${css}`}>
                        <Icon icon={icon} size='text-3xl' className='text-white' />
                    </div>
                    <div className='space-x-1 text-zinc-500 rtl:space-x-reverse'>
                        <span className='font-semibold'>{title}</span>
                    </div>
                    <div className='text-4xl font-semibold'>{totalRegistros} <span className='text-2xl'>Registros totales</span></div>
                    <div className='flex'>
                        <Balance status='positive'>
                            Ultimo registro: {fechaUltimoRegistro}
                        </Balance>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardIndicador