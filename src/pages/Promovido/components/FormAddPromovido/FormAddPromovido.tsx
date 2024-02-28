import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import FieldWrap from '../../../../components/form/FieldWrap';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/form/Input';
import Button from '../../../../components/ui/Button';
import Label from '../../../../components/form/Label';
import Validation from '../../../../components/form/Validation';
import Checkbox from '../../../../components/form/Checkbox';
import Select from '../../../../components/form/Select';
import Progress from '../../../../components/ui/Progress';
import Textarea from '../../../../components/form/Textarea';
import PromovidosService from '../../../../services/promovidos.service';
import { FetchService } from '../../../../services/config/FetchService';

type TValues = {
	nombres: string;
	apellidos: string;
	fechaNacimiento: string;
	genero: string;
	direccion: string;
	celular: string;
	mail: string;
	seccion: string;
	redesSociales: string;
	idPromotor: number;
};

const FormAddPromovido = ({ handleCloseModal, handleCloseModalWithReload }) => {
	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);
	const [passwordRepeatShowStatus, setPasswordRepeatShowStatus] = useState<boolean>(false);
	const _promovidosService: PromovidosService = new PromovidosService(new FetchService());

	const formik = useFormik({
		initialValues: {
			nombres: '',
			apellidos: '',
			fechaNacimiento: '',
			genero: '',
			direccion: '',
			celular: '',
			mail: '',
			seccion: '',
			redesSociales: '',
			idPromotor: 1,
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.nombres) {
				errors.nombres = 'Campo Requerido';
			} else if (values.nombres.length < 3) {
				errors.nombres = 'Must be 3 letters or longer';
			} else if (values.nombres.length > 20) {
				errors.nombres = 'Must be 20 letters or shorter';
			}

			if (
				values.mail &&
				values.mail.toString().length > 0 &&
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)
			) {
				errors.mail = 'la estructrura del email es incorrecta';
			}

			return errors;
		},
		onSubmit: async () => {
			await _promovidosService.crearPromovido(formik.values);
			handleCloseModalWithReload();
		},
	});

	return (
		<form className='flex flex-col gap-4' noValidate>
			<div>
				<Label htmlFor='nombres'>Nombres</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.nombres}
					invalidFeedback={formik.errors.nombres}
					validFeedback='Good'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='nombres'
							autoComplete='nombres'
							name='nombres'
							placeholder='nombres'
							value={formik.values.nombres}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			<div>
				<Label htmlFor='apellidos'>Apellidos</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.apellidos}
					invalidFeedback={formik.errors.apellidos}
					validFeedback='Good'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='apellidos'
							autoComplete='apellidos'
							name='apellidos'
							placeholder='apellidos'
							value={formik.values.apellidos}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			<div>
				<Label htmlFor='mail'>Email</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.mail}
					invalidFeedback={formik.errors.mail}
					validFeedback='Good'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' size='text-xl' />}>
						<Input
							id='mail'
							autoComplete='mail'
							name='mail'
							placeholder='Correo electronico'
							value={formik.values.mail}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			<div>
				<Label htmlFor='direccion'>Direccion</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.direccion}
					invalidFeedback={formik.errors.direccion}
					validFeedback='Good'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='direccion'
							autoComplete='direccion'
							name='direccion'
							placeholder='direccion'
							value={formik.values.direccion}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			<div>
				<Label htmlFor='celular'>Celular</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.celular}
					invalidFeedback={formik.errors.celular}
					validFeedback='Good'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='celular'
							autoComplete='celular'
							name='celular'
							placeholder='Telefono celular'
							value={formik.values.celular}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			<div>
				<Label htmlFor='seccion'>Seccion</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.seccion}
					invalidFeedback={formik.errors.seccion}
					validFeedback='Good'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='seccion'
							autoComplete='seccion'
							name='seccion'
							placeholder='Seccion'
							value={formik.values.seccion}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			<div>
				<Label htmlFor='redesSociales'>Redes Sociales</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.redesSociales}
					invalidFeedback={formik.errors.redesSociales}
					validFeedback='Good'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='redesSociales'
							autoComplete='redesSociales'
							name='redesSociales'
							placeholder='redesSociales'
							value={formik.values.redesSociales}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			<div className='flex justify-end gap-10'>
				<Button
					size='lg'
					variant='default'
					className='font-semibold'
					onClick={handleCloseModal}>
					Cancelar
				</Button>

				<Button
					size='lg'
					variant='solid'
					className='font-semibold'
					onClick={() => formik.handleSubmit()}>
					Guardar
				</Button>
			</div>
		</form>
	);
};
export default FormAddPromovido;
