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
import PromotorService from '../../../../services/promotor.service';
import { getAge } from '../../../../components/utils/functions';

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
	idPromotor: string;
	idRol:number;
	edad: string;
};



const FormAddPromovido = ({ handleCloseModal, handleCloseModalWithReload , promotores }) => {
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
			idPromotor: '',
			idRol:4,
			edad:''
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

			if(values.fechaNacimiento){
				values.edad = getAge(values.fechaNacimiento).toString()
			}

			return errors;
		},
		onSubmit: async () => {
			await _promovidosService.crearPromovido(formik.values);
			handleCloseModalWithReload();
		},
	
	});

	console.log(formik.values)

	return (
		<form className='flex flex-col gap-4' noValidate>
			<div>
				<Label htmlFor='nombres'>Nombres</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.nombres}
					invalidFeedback={formik.errors.nombres}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='nombres'
							autoComplete='nombres'
							name='nombres'
							placeholder='Nombres'
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
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='apellidos'
							autoComplete='apellidos'
							name='apellidos'
							placeholder='Apellidos'
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
					validFeedback='Información correcta'>
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
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='direccion'
							autoComplete='direccion'
							name='direccion'
							placeholder='Direccion'
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
					validFeedback='Información correcta'>
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
			<div className='flex flex-row gap-3'>
				<div className='w-[90%]'>
				<Label htmlFor='fechaNacimiento'>Fecha de nacimiento</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.fechaNacimiento}
					invalidFeedback={formik.errors.fechaNacimiento}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='fechaNacimiento'
							autoComplete='fechaNacimiento'
							name='fechaNacimiento'
							placeholder='Telefono celular'
							value={formik.values.fechaNacimiento}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							type='date'
						/>
					</FieldWrap>
				</Validation>

				</div>
				<div>
				<Label htmlFor='edad'>Edad</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.edad}
					invalidFeedback={formik.errors.edad}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='edad'
							autoComplete='edad'
							name='edad'
							placeholder='Edad'
							value={formik.values.edad}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							disabled
						/>
					</FieldWrap>
				</Validation>
				</div>
			</div>
			<div>
				<Label htmlFor='genero'>Genero</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.genero}
					invalidFeedback={formik.errors.genero}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUserCircle' className='mx-2' size='text-xl' />}
						lastSuffix={
							<Icon className='mx-2 cursor-pointer' icon='HeroChevronDown' />
						}>
						<Select
							id='genero'
							name='genero'
							placeholder='Selecciona un genero'
							value={formik.values.genero}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}>
							<option value='masculino'>Masculino</option>
							<option value='femenino'>Femenino</option>
						</Select>
					</FieldWrap>
				</Validation>
			</div>
			<div>
				<Label htmlFor='seccion'>Seccion</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.seccion}
					invalidFeedback={formik.errors.seccion}
					validFeedback='Información correcta'>
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
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='redesSociales'
							autoComplete='redesSociales'
							name='redesSociales'
							placeholder='Redes sociales'
							value={formik.values.redesSociales}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			<div>
				<Label htmlFor='idPromotor'>Promotor</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.idPromotor}
					invalidFeedback={formik.errors.idPromotor}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUserCircle' className='mx-2' size='text-xl' />}
						lastSuffix={
							<Icon className='mx-2 cursor-pointer' icon='HeroChevronDown' />
						}>
						<Select
							id='idPromotor'
							name='idPromotor'
							placeholder='Selecciona un promotor'
							value={formik.values.idPromotor}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}>
							{
								promotores.map((item) => {
									return (<option key={item.idPromotor} value={item.idPromotor}>{item.Usuario.nombres}</option>)
								})
							}
						</Select>
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
