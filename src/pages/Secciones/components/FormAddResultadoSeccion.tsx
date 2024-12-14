import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Label from '../../../components/form/Label';
import Validation from '../../../components/form/Validation';
import FieldWrap from '../../../components/form/FieldWrap';
import Input from '../../../components/form/Input';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/ui/Button';
import CreatorService from '../../../services/creator.service';

const initialValues = [
	{
		idCoalicion: '',
		partidos: null,
		numeroVotos: '',
	},
];

const FormAddResultadoSeccion = ({ handleCloseModal, coaliciones, seccion }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [_coaliciones, _setCoaliciones] = useState<any>(coaliciones);
	const [esEdicion, setEsEdicion] = useState<boolean>(false);
	const [currentVotos, setCurrentVotos] = useState<any>();
	const _creatorService = new CreatorService().createInstanceServices();
	const formik = useFormik({
		initialValues: [...initialValues],
		validate: () => {
			const errors: Partial<any> = [];
			return errors;
		},
		onSubmit: async () => {
			setLoading(true);
			const payload = formik.values.map((x) => {
				return {
					idCoalicion: x.idCoalicion,
					numeroVotos:
						x.numeroVotos && x.numeroVotos.toString().length > 0
							? Number(x.numeroVotos)
							: 0,
					idSeccion: seccion.idSeccion,
					idElecciones: 1,
				};
			});

			if (esEdicion) {
				await _creatorService.votosSeccionesService.ActualizarVotosPorCasilla(
					seccion.idSeccion,
					payload,
				);
			} else {
				await _creatorService.votosSeccionesService.registrarVotos(payload);
			}
			resetVotos();
			setLoading(false);
			handleCloseModal(true);
		},
	});

	const obtenerVotosPorCasilla = async () => {
		setLoading(true);
		let coalicionesActuales = _coaliciones;
		const votos = await _creatorService.votosSeccionesService.obtenerVotosPorCasilla(
			seccion.idSeccion,
		);
		if (votos && votos.length > 1) {
			coalicionesActuales = _coaliciones.map((c) => {
				const voto = votos.find((v) => v.idCoalicion == c.idCoalicion);
				if (voto) {
					return { ...c, numeroVotos: voto.numeroVotos };
				}
				return c;
			});
			setEsEdicion(true);
		} else {
			setEsEdicion(false);
		}
		setLoading(false);
		_setCoaliciones([...coalicionesActuales]);
		formik.setValues([...coalicionesActuales]);
	};

	useEffect(() => {
		resetVotos();
		_setCoaliciones(coaliciones);
		obtenerVotosPorCasilla();
	}, []);

	const onChangeSelectPromotor = (data, idCoalicion) => {
		const c = _coaliciones.find((c) => c.idCoalicion == idCoalicion);
		c.numeroVotos = `${data.target.value ?? ''}`;
		formik.setValues(_coaliciones);
	};

	const resetVotos = () => {
		const resetCoaliciones = _coaliciones.map((c) => {
			return { ...c, numeroVotos: '' };
		});
		_setCoaliciones(resetCoaliciones);
		formik.setValues(resetCoaliciones);
	};

	return (
		<form className='flex flex-col gap-4' noValidate>
			{_coaliciones ? (
				_coaliciones.map((item) => {
					return (
						<div className='flex w-[100%] items-center justify-center'>
							<Label className='w-[80%] !text-[14px]' htmlFor={item.idCoalicion}>
								{item.descripcion} {item.partidos.map((p) => p.nombre).join()}
							</Label>
							<Validation
								isValid
								isTouched
								invalidFeedback='error'
								validFeedback='Información correcta'>
								<FieldWrap
									className=' w-[30%]'
									firstSuffix={
										<Icon
											icon='HeroCog8Tooth'
											className='mx-2'
											size='text-xl'
										/>
									}>
									<Input
										id={item.idCoalicion}
										autoComplete=''
										name={item.idCoalicion}
										placeholder='Número de votos'
										value={item.numeroVotos ?? ''}
										onChange={(e) => {
											onChangeSelectPromotor(e, item.idCoalicion);
										}}
									/>
								</FieldWrap>
							</Validation>
						</div>
					);
				})
			) : (
				<span> cargando </span>
			)}
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
					isLoading={loading}>
					Guardar
				</Button>
			</div>
		</form>
	);
};

export default FormAddResultadoSeccion;
