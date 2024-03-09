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
import EnlaceService from '../../../../services/enlace.service';

type TValues = {
	nombres: string;
	telefono: string;
	mail: string;
	calle: string;
	colonia: string;
	cp: string;
	problematica: string;
	idPromotorEnlace: undefined;
};

const initialValues = {
	nombres: '',
	telefono: '',
	mail: '',
	calle: '',
	colonia: '',
	cp: '',
	problematica: '',
	idPromotorEnlace: undefined,
}


const FormAddEnlace = ({ handleCloseModal, handleCloseModalWithReload, promotores, valuesForm, isEdit, isView }) => {
	const { token } = JSON.parse(window.localStorage.getItem(`user`));
	const _enlaceService: EnlaceService = new EnlaceService(new FetchService(token));
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
			setLoading(true)
			try {
				if (isEdit) {
					await _enlaceService.actualizarEnlace(formik.values);
				} else {
					await _enlaceService.crearEnlace(formik.values);
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
		formik.setValues({ ...valuesForm })
	}, [])

	const onChangeSelectPromotor = (data) => {
		formik.setFieldValue(`idPromotorEnlace`, data.value)
	}

	const setCurrentIdPromotor = () => {
		const valuePromotor = promotores.find((item) => item.idPromotor == valuesForm.idPromotorEnalce);
		if (valuePromotor) {
			setCurrentSelectPromotor({ value: valuePromotor.idPromotor, label: valuePromotor.Usuario.nombres })
		}
	}

	console.log(valuesForm)

	return (
		<form className='flex flex-col gap-4' noValidate>
			{/* Nombres */}
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

			{/* Telefono */}
			<div>
				<Label htmlFor='telefono'>Telefono</Label>
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

			{/* Mail */}
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
				<Label htmlFor='problematica'>Problematica</Label>
				<Textarea
					id='problematica'
					name='problematica'
					onChange={formik.handleChange}
					value={formik.values.problematica}
					placeholder='Problematica ...'
					rows={8}
					maxLength={500}
				/>
				<div className='mt-2 flex items-center gap-4 text-xs text-zinc-500'>
					<div className='flex-shrink-0'>
						Max length:{' '}
						<span className='font-mono'>
							{formik.values.problematica?.length ?? 0}
							/500
						</span>
					</div>
					<Progress
						className='!h-2'
						value={formik.values.problematica?.length}
						max={500}
					/>
				</div>
			</div>

			<div>
				<Label htmlFor='idPromotorEnlace'>Promotor</Label>
				<Validation
					isValid={formik.isValid}
					isTouched={formik.touched.idPromotorEnlace && Boolean(formik.touched.idPromotorEnlace)}
					invalidFeedback={formik.errors.idPromotorEnlace && formik.errors.idPromotorEnlace.toString()}
					validFeedback='Información correcta'>
					<FieldWrap
						firstSuffix={<Icon icon='HeroUserCircle' className='mx-2' size='text-xl' />}
					>
						<div className='col-span-12 lg:col-span-4'>
							<SelectReact
								options={promotores.map((item) => { return { value: item.idPromotor, label: item.Usuario.nombres } })}
								id='idPromotorEnlace'
								isDisabled={isView}
								name='idPromotorEnlace'
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
export default FormAddEnlace;
