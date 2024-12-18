import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	SortingState,
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import Avatar from '../../components/Avatar';
import CreatorService from '../../services/creator.service';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../components/layouts/Subheader/Subheader';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Input from '../../components/form/Input';
import Button from '../../components/ui/Button';
import Container from '../../components/layouts/Container/Container';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import TableTemplate, { TableCardFooterTemplate } from '../../templates/common/TableParts.template';
import Tooltip from '../../components/ui/Tooltip';
import Modal, { ModalBody, ModalHeader } from '../../components/ui/Modal';
import FormAddResultadoSeccion from './components/FormAddResultadoSeccion';

const editLinkPath = `../`;
const columnHelper = createColumnHelper<any>();
const sinRegistro = 'N/A';

const columns = (handleOpenAddModal) => {
	return [
		columnHelper.accessor('idSeccion', {
			cell: (id) => <span>{id.getValue()}</span>,
			header: '#',
			footer: '#',
			enableGlobalFilter: false,
			enableSorting: false,
			size: 10,
		}),

		columnHelper.accessor('seccion', {
			cell: (seccion) => <span>{seccion.getValue()}</span>,
			header: 'Seccion',
			footer: 'Seccion',
			enableGlobalFilter: true,
			enableSorting: true,
		}),

		columnHelper.display({
			cell: (_info) => (
				<div className='flex items-center gap-2'>
					<Tooltip text='Agregar Resultado'>
						<Button
							icon='HeroRocketLaunch'
							isActive
							color='sky'
							onClick={() => {
								handleOpenAddModal(_info.row.original);
							}}
						/>
					</Tooltip>
				</div>
			),
			header: 'Acciones',
			footer: 'Acciones',
		}),
	];
};

const Secciones = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [Secciones, setSecciones] = useState<any>([]);
	const [currentSeccion, setCurrentSeccion] = useState<any>([]);
	const [coaliciones, setColiciones] = useState<any>([]);
	const _creatorService: any = new CreatorService().createInstanceServices();
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const [openModalSeguimiento, setOpenModalSeguimiento] = useState<boolean>(false);

	useEffect(() => {
		obtenerSecciones();
		obtenerCoaliciones();
		return () => {};
	}, []);

	async function obtenerSecciones() {
		setLoading(true);
		const _casiilas = await _creatorService.seccionesService.obtenerSecciones();
		setSecciones([..._casiilas]);
		setLoading(false);
	}

	async function obtenerCoaliciones() {
		setLoading(true);
		const _coaliciones =
			await _creatorService.coalicionesPartidosService.obtenerCoalicionesPartidos();
		setColiciones([..._coaliciones]);
		setLoading(false);
	}

	const handleOpenAddModal = (value) => {
		setCurrentSeccion(value);
		console.log(`handleOpenAddModal`);
		setOpenModalSeguimiento(true);
	};

	const handleCloseModal = (realoadPage = false) => {
		setOpenModalSeguimiento(false);
		if (realoadPage) {
			obtenerSecciones();
		}
	};

	const handleExportarPromovidos = () => {};

	const table = useReactTable({
		data: Secciones,
		columns: columns(handleOpenAddModal),
		state: {
			sorting,
			globalFilter,
		},
		onSortingChange: setSorting,
		enableGlobalFilter: true,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: { pageSize: 20 },
		},
		defaultColumn: {
			size: 10, // starting column size
			minSize: 50, // enforced during column resizing
			maxSize: 500, // enforced during column resizing
		},
	});

	return (
		<PageWrapper name='Customer List'>
			<Subheader>
				<SubheaderLeft>
					<FieldWrap
						firstSuffix={<Icon className='mx-2' icon='HeroMagnifyingGlass' />}
						lastSuffix={
							globalFilter && (
								<Icon
									icon='HeroXMark'
									color='red'
									className='mx-2 cursor-pointer'
									onClick={() => {
										setGlobalFilter('');
									}}
								/>
							)
						}>
						<Input
							id='example'
							name='example'
							placeholder='Buscar...'
							value={globalFilter ?? ''}
							onChange={(e) => setGlobalFilter(e.target.value)}
						/>
					</FieldWrap>
				</SubheaderLeft>
				{/* <SubheaderRight className='flex-col sm:flex-row'>
						<Tooltip text='Generar el reporte de todos los promovidos que se han dado de alta'>
							<Button variant='solid' color='red' colorIntensity='300' icon='HeroDocumentText' onClick={() => handleExportarPromovidos()}>
								Generar Promovidos
							</Button>
						</Tooltip>
						<Button variant='solid' icon='HeroPlus' onClick={() => handleOpenAddModal()}>
							Agregar
						</Button>
					</SubheaderRight> */}
			</Subheader>
			<Container>
				<Card className='h-full'>
					<CardHeader>
						<CardHeaderChild>
							<CardTitle>Secciones</CardTitle>
							<Badge
								variant='outline'
								className='border-transparent px-4'
								rounded='rounded-full'>
								{table.getFilteredRowModel().rows.length} registros
							</Badge>
						</CardHeaderChild>
					</CardHeader>

					<CardBody className='overflow-auto'>
						<TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} />
					</CardBody>
					<TableCardFooterTemplate table={table} />
				</Card>
			</Container>

			<Modal
				isOpen={openModalSeguimiento}
				setIsOpen={setOpenModalSeguimiento}
				isStaticBackdrop>
				<ModalHeader>Agregar número de votos</ModalHeader>
				<ModalBody>
					<FormAddResultadoSeccion
						// handleCloseModal={handleCloseModalObservaciones}
						// handleCloseModalWithReload={handleCloseModalWithReload}
						coaliciones={coaliciones}
						handleCloseModal={handleCloseModal}
						seccion={currentSeccion}
					/>
				</ModalBody>
			</Modal>
		</PageWrapper>
	);
};

export default Secciones;
