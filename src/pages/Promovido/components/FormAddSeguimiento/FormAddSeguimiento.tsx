import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import FieldWrap from '../../../../components/form/FieldWrap';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/form/Input';
import Button from '../../../../components/ui/Button';
import Label from '../../../../components/form/Label';
import Validation from '../../../../components/form/Validation';
import Checkbox, { CheckboxGroup } from '../../../../components/form/Checkbox';
import Textarea from '../../../../components/form/Textarea';
import PromovidosService from '../../../../services/promovidos.service';
import { FetchService } from '../../../../services/config/FetchService';
import SegumientosPromovidosService from '../../../../services/seguimientoPromovido.service';


type TValues = {
	vota: boolean;
	observaciones: string;
};

const initialValues = {
	vota: false,
	observaciones: ''
}


const FormAddSeguimiento = ({ handleCloseModal, handleCloseModalWithReload,  valuesForm, isEdit, isView }) => {
	const { token } = JSON.parse(window.localStorage.getItem(`user`));
	const _segumientosPromovidosService: SegumientosPromovidosService = new SegumientosPromovidosService(new FetchService(token));
	const [loading, setLoading] = useState<boolean>(false);
	const formik = useFormik({
		initialValues: { ...initialValues },
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.observaciones) {
				errors.observaciones = 'Campo Requerido';
			} else if (values.observaciones.length < 3) {
				errors.observaciones = 'Must be 3 letters or longer';
			} else if (values.observaciones.length > 500) {
				errors.observaciones = 'Must be 500 letters or shorter';
			}

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

	useEffect(() => {
			formik.setValues({ ...valuesForm })
	}, [])

	console.log(`formik values`, formik.values)


	return (
		<form className='gap-4 flex flex-col' noValidate>
			<div className='flex justify-start items-center gap-3 '>
				<Label htmlFor='vota' className='!text-lg w-[10%] mb-0' >Vota ?</Label>
				<Checkbox
					variant='switch'
					id='vota'
					name='vota'
					onChange={formik.handleChange}
					checked={formik.values.vota}
				/>
			</div>
			<div>
				<Label htmlFor='nombres' className='!text-lg'>Obervaciones</Label>
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
		</form>
	);
};
export default FormAddSeguimiento;
