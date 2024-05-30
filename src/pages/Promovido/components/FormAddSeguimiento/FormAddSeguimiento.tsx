import React, { ReactNode, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Button from '../../../../components/ui/Button';
import Label from '../../../../components/form/Label';
import Validation from '../../../../components/form/Validation';
import Checkbox from '../../../../components/form/Checkbox';
import Textarea from '../../../../components/form/Textarea';
import { FetchService } from '../../../../services/config/FetchService';
import SegumientosPromovidosService from '../../../../services/seguimientoPromovido.service';
import Icon from '../../../../components/icon/Icon';
import Radio, { RadioGroup } from '../../../../components/form/Radio';
import Input from '../../../../components/form/Input';



const options2: { value: string; content: ReactNode }[] = [
	{ value: '0', content: 'No apoya' },
	{ value: '1', content: 'Apoya' },
	{ value: '2', content: 'No sabe' }
]
type TValues = {
	observaciones: string;
	vota: string;
}

const initialValues = {
	vota: options2[0].value,
	observaciones: '',
}

const FormAddSeguimiento = ({ handleCloseModal, handleCloseModalWithReload, valuesForm, isEdit, isView }) => {
	const { token } = JSON.parse(window.localStorage.getItem(`user`));
	const _segumientosPromovidosService: SegumientosPromovidosService = new SegumientosPromovidosService(new FetchService(token));
	const [loading, setLoading] = useState<boolean>(false);
	const [seguiminetos, setSeguimientos] = useState<any>([]);
	const formik = useFormik({
		initialValues: {
			observaciones: '',
			vota: options2[0].value,
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};
			console.log(values)

			return errors;
		},
		onSubmit: async () => {
			setLoading(true)
			try {
				if (isEdit) {
					await _segumientosPromovidosService.actualizarSegumientosPromovidos(formik.values);
				} else {
					await _segumientosPromovidosService.crearSegumientosPromovidos(formik.values);
				}
				setLoading(false)
				handleCloseModalWithReload();
			} catch (error) {
				console.log(error)
			}
		},
	});

	const obtenerSeguimientosByPromovido = async () => {
		const _seguimientos = await _segumientosPromovidosService.obtenerSeguimientosByPromovido(valuesForm.idPromovido)
		if (_seguimientos) {
			setSeguimientos(_seguimientos)
		}
	}

	useEffect(() => {
		formik.setValues({ ...valuesForm, vota: options2[2].value, })
		obtenerSeguimientosByPromovido()
	}, [])

	return (
		<form className='gap-4 grid grid-cols-2' noValidate>
			<div className="flex flex-col gap-3">
				<div>
					<Label htmlFor='vota' className='!text-lg !w-[100%] !mb-0 text-cyan-950'>Apoya el movimiento ?</Label>
					<div className='flex justify-start items-center '>
						<RadioGroup>
							{options2.map((i) => (
								<Radio
									key={i.value}
									label={i.content}
									name='vota'
									value={i.value}
									selectedValue={formik.values.vota}
									onChange={formik.handleChange}
									color={
										i.value === options2[0].value
											? 'red'
											: 'blue'
									}
								/>
							))}
						</RadioGroup>
					</div>
				</div>
				<div>
					<Label htmlFor='observaciones' className='!text-lg'>Observaciones</Label>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.observaciones}
						invalidFeedback={formik.errors.observaciones}
						validFeedback='Información correcta'>
						<Textarea
							id='observaciones'
							name='observaciones'
							onChange={formik.handleChange}
							value={formik.values.observaciones}
							placeholder='observaciones ...'
							rows={8}
							maxLength={500}
						/>
					</Validation>
				</div>
				<div className='col-span-2 flex justify-end gap-10'>
					<Button
						size='lg'
						variant='outline'
						className='font-semibold'
						onClick={handleCloseModal}>
						Cancelar
					</Button>

					<Button
						size='lg'
						variant='solid'
						className='font-semibold'
						onClick={() => formik.handleSubmit()}
						isDisable={isView}
						isLoading={loading}
					>
						Guardar
					</Button>
				</div>
			</div>
			<div className="list-segumientos flex flex-col gap-3">
				{
					seguiminetos.length > 0 ?
					seguiminetos.map((item) => {
						return (
						<div className="flex justify-start items-center gap-5 m-2">
							<div className="container-icon rounded-full p-2 bg-blue-950">
								<Icon icon='HeroPhoneArrowUpRight' className='mx-2 text-white' size='text-xl' />
							</div>
							<div className="contaimer-info w-full flex justify-start items-start gap-1 flex-col">
								<span className='text-xl text-blue-900'>Apoya : {item.vota == 1 ? 'Si' : item.vota == 2 ? 'No' : 'No sabe'}</span>
								<span className='text-sm'>{item.observaciones}</span>
								<span className='text-xs text-gray-500' >{item.fechaAlta}</span>
							</div>

						</div>
						)
					})
					:
					<p>Aun no tiene observaciones agregadas</p>
				}
			</div>
		</form>
	);
};
export default FormAddSeguimiento;
