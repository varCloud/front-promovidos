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
	usuario: string;
	contrasena: string;
	nombres: string;
	apellidos: string;
	mail: string;
	telefono: string;
	seccion: string;
	genero: string;
	calle: string;
	colonia: string;
	cp: string;
	idRol: number;
	fechaNacimiento: string;
	edad: string;
	redesSociales: string;
};

const initialValues = {
	usuario: '',
	contrasena: '',
	nombres: '',
	mail: '',
	telefono: '',
	seccion: '',
	genero: '',
	fechaNacimiento: '',
	edad: '',
	apellidos: '',
	calle: '',
	redesSociales: '',
	colonia: '',
	cp: '',
	idRol: 3
}

const FormAddPromotor = ({ handleCloseModal, handleCloseModalWithReload, valuesForm, isEdit, isView }: any) => {
	const { token } = JSON.parse(window.localStorage.getItem(`user`));
	const _promotorService: PromotorService = new PromotorService(new FetchService(token));
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
			if (isEdit) {
				await _promotorService.actualizarPromotor(formik.values);
			} else {
				await _promotorService.crearPromotor(formik.values);
			}
			setLoading(false)
			handleCloseModalWithReload();
		},
	});

	useEffect(() => {
		const values = { ...valuesForm, ...valuesForm.Usuario }
		delete values.Usuario
		formik.setValues({ ...values, idRol: 3 })

	}, [])
	console.log(isView)

	return (
		<form className='flex flex-col gap-4' noValidate>
			<div>
				<Label htmlFor='nombres'>Nombres</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.nombres && Boolean(formik.touched.nombres)}
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

			{/* Telefono */}
			<div>
				<Label htmlFor='telefono'>Telefono</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.telefono}
					invalidFeedback={formik.errors.telefono}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={
							<Icon icon='HeroDevicePhoneMobile' className='mx-2' size='text-xl' />
						}>
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
						firstSuffix={<Icon icon='HeroBolt' className='mx-2' size='text-xl' />}>
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
			<div hidden>
				<Label htmlFor='usuario'>Usuario</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.usuario}
					invalidFeedback={formik.errors.usuario}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUser' className='mx-2' size='text-xl' />}>
						<Input
							id='usuario'
							disabled={isView}
							autoComplete='usuario'
							name='usuario'
							placeholder='usuario'
							value={formik.values.usuario}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FieldWrap>
				</Validation>
			</div>
			<div hidden>
				<Label htmlFor='contrasena'>Constraseña</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.nombres}
					invalidFeedback={formik.errors.nombres}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={
							<Icon
								icon='HeroEllipsisHorizontalCircle'
								className='mx-2'
								size='text-xl'
							/>
						}>
						<Input
							id='contrasena'
							disabled={isView}
							autoComplete='contrasena'
							name='contrasena'
							placeholder='contrasena'
							value={formik.values.contrasena}
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
					isDisable={isView}
					isLoading={loading}
					onClick={() => formik.handleSubmit()}>
					Guardar
				</Button>
			</div>
		</form>
	);
};
export default FormAddPromotor;
