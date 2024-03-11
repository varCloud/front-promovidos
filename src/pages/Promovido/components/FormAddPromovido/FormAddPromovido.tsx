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
import SelectReact from '../../../../components/form/SelectReact';

type TValues = {
	nombres: string;
	apellidos: string;
	fechaNacimiento: string;
	genero: string;
	calle: string;
	colonia: string;
	cp: string;
	telefono: string;
	mail: string;
	seccion: string;
	redesSociales: string;
	idPromotor: undefined;
	idRol: number;
	edad: string;
};

const initialValues = {
	nombres: '',
	apellidos: '',
	fechaNacimiento: '',
	genero: '',
	calle: '',
	telefono: '',
	mail: '',
	seccion: '',
	redesSociales: '',
	idPromotor: undefined,
	idRol: 4,
	colonia: '',
	cp: '',
	edad: ''
}


const FormAddPromovido = ({ handleCloseModal, handleCloseModalWithReload, promotores, valuesForm, isEdit, isView }) => {
	const { token } = JSON.parse(window.localStorage.getItem(`user`));
	const _promovidosService: PromovidosService = new PromovidosService(new FetchService(token));
	const [currentSelectPromtor, setCurrentSelectPromotor] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);
	const formik = useFormik({
		initialValues: { ...initialValues },
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.nombres) {
				errors.nombres = 'Campo Requerido';
			} else if (values.nombres.length < 3) {
				errors.nombres = 'Must be 3 letters or longer';
			} else if (values.nombres.length > 100) {
				errors.nombres = 'Must be 100 letters or shorter';
			}

			if (
				values.mail &&
				values.mail.toString().length > 0 &&
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)
			) {
				errors.mail = 'la estructrura del email es incorrecta';
			}

			if (values.fechaNacimiento) {
				values.edad = getAge(values.fechaNacimiento).toString()
			}

			return errors;
		},
		onSubmit: async () => {
			setLoading(true)
			try {
				if (isEdit) {
					await _promovidosService.actualizarPromovido(formik.values);
				} else {
					await _promovidosService.crearPromovido(formik.values);
				}
				setLoading(false)
				handleCloseModalWithReload();
			} catch (error) {
				console.log(error)
			}
		},

	});

	useEffect(() => {
		setCurrentIdPromotor()
		formik.setValues({ ...valuesForm, idRol: 4 })

	}, [])

	const onChangeSelectPromotor = (data) => {
		formik.setFieldValue(`idPromotor`, data.value)
	}

	const setCurrentIdPromotor = () => {
		const valuePromotor = promotores.find((item) => item.idPromotor == valuesForm.idPromotor);
		if (valuePromotor) {
			setCurrentSelectPromotor({ value: valuePromotor.idPromotor, label: valuePromotor.Usuario.nombres })
		}

	}

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
							disabled={isView}
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
							disabled={isView}
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
							disabled={isView}
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
			{/*  Calle */}
			<div>
				<Label htmlFor='direccion'>Calle</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.calle}
					invalidFeedback={formik.errors.calle}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroHome' className='mx-2' size='text-xl' />}>
						<Input
							id='calle'
							disabled={isView}
							autoComplete='calle'
							name='calle'
							placeholder='Ejem: Acceso condominal 432 int 49'
							value={formik.values.calle}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			
			{/* Codigo postal y Colonia */}
			<div className="flex gap-10">
				<div className='flex-none'>
					<Label htmlFor='direccion'>Codigo postal</Label>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.cp}
						invalidFeedback={formik.errors.cp}
						validFeedback='Información correcta'>
						<FieldWrap
							firstSuffix={<Icon icon='HeroHome' className='mx-2' size='text-xl' />}>
							<Input
								id='cp'
								disabled={isView}
								autoComplete='cp'
								name='cp'
								placeholder='58000'
								value={formik.values.cp}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FieldWrap>
					</Validation>
				</div>
				<div className='flex-initial w-full'>
					<Label htmlFor='direccion'>Colonia</Label>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.colonia}
						invalidFeedback={formik.errors.colonia}
						validFeedback='Información correcta'>
						<FieldWrap
							firstSuffix={<Icon icon='HeroHome' className='mx-2' size='text-xl' />}>
							<Input
								id='colonia'
								disabled={isView}
								autoComplete='colonia'
								name='colonia'
								placeholder='Fraccionamiento terrazas quinceo'
								value={formik.values.colonia}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FieldWrap>
					</Validation>
				</div>
			</div>
			<div>
				<Label htmlFor='telefono'>Celular</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.telefono}
					invalidFeedback={formik.errors.telefono}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroDevicePhoneMobile' className='mx-2' size='text-xl' />}>
						<Input
							id='telefono'
							disabled={isView}
							autoComplete='telefono'
							name='telefono'
							placeholder='Telefono'
							value={formik.values.telefono}
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
								disabled={isView}
								autoComplete='fechaNacimiento'
								name='fechaNacimiento'
								placeholder='Fecha de nacimiento'
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
								disabled={isView}
								autoComplete='edad'
								name='edad'
								placeholder='Edad'
								value={formik.values.edad}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
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
							disabled={isView}
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
						firstSuffix={<Icon icon='HeroBolt' className='mx-2' size='text-xl' />}>
						<Input
							id='seccion'
							disabled={isView}
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
						firstSuffix={<Icon icon='HeroHandThumbUp' className='mx-2' size='text-xl' />}>
						<Input
							id='redesSociales'
							disabled={isView}
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
					isTouched={formik.touched.idPromotor && Boolean(formik.touched.idPromotor)}
					invalidFeedback={formik.errors.idPromotor && formik.errors.idPromotor.toString()}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUserCircle' className='mx-2' size='text-xl' />}
					>
						<div className='col-span-12 lg:col-span-4'>
							<SelectReact
								options={promotores.map((item) => { return { value: item.idPromotor, label: item.Usuario.nombres } })}
								id='idPromotor'
								isDisabled={isView}
								name='idPromotor'
								value={currentSelectPromtor}
								onChange={(item) => onChangeSelectPromotor(item)}
							/>
						</div>

					</FieldWrap>
				</Validation>
			</div>
			<div className='flex justify-end gap-8'>
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
export default FormAddPromovido;
