import React, { useEffect, useState } from 'react';
import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ClipLoader from 'react-spinners/ClipLoader';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import Container from '../../components/layouts/Container/Container';
import { appPages } from '../../config/pages.config';
import usersDb, { TUser } from '../../mocks/db/users.db';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Icon from '../../components/icon/Icon';
import Input from '../../components/form/Input';
import TableTemplate, { TableCardFooterTemplate } from '../../templates/common/TableParts.template';
import Badge from '../../components/ui/Badge';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownNavLinkItem,
	DropdownToggle,
} from '../../components/ui/Dropdown';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../components/layouts/Subheader/Subheader';
import FieldWrap from '../../components/form/FieldWrap';
import Avatar from '../../components/Avatar';
import Tooltip from '../../components/ui/Tooltip';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../components/ui/Modal';
import PromovidosService from '../../services/promovidos.service';
import { FetchService } from '../../services/config/FetchService';
import FormAddPromotor from './components/FormAddPromotor/FormAddPromotor';
import PromotorService from '../../services/promotor.service';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import { useAuth } from '../../context/authContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import { formatDateCalendarInput } from '../../components/utils/functions';
import Cobertura from '../Cobertura/Cobertura.page';
import ReportesService from '../../services/reportes.service';
import Spinner from '../../components/ui/Spinner';
import SearchBox from '../../components/search-box/SearchBox';
import { URIS_CONFIG } from '../../config/uris.config';
import GoogleSearchBoxWithMap from '../../components/search-box/GoogleSearchBoxWithMap';

const MySwal = withReactContent(Swal);
const columnHelper = createColumnHelper<any>();

const editLinkPath = `../${appPages.crmAppPages.subPages.customerPage.subPages.editPageLink.to}/`;
const sinRegistro = 'N/A';
const columns = (
	handleOpenEditModal,
	handleOpenDeleteAlert,
	handleOpenViewModal,
	handleExportarPromovidosPorPromotor,
	handleExportarProblemticas,
) => {
	return [
		columnHelper.accessor('image', {
			cell: (info) => (
				<Link to={`${editLinkPath}${info.row.original.id}`}>
					<Avatar
						src={info.getValue()?.thumb}
						name={`${info.row.original.Usuario.nombres}`}
						rounded='rounded'
					/>
				</Link>
			),
			header: 'Perfil',
			footer: 'Perfil',
			enableGlobalFilter: false,
			enableSorting: false,
		}),
		columnHelper.accessor('nombres', {
			cell: (info) => (
				<Link to={`${editLinkPath}${info.row.original.id}`}>
					<div>
						{info.row.original.Usuario.nombres} {info.row.original.apellidos}
					</div>
				</Link>
			),
			header: 'Nombres',
			footer: 'Nombres',
		}),
		columnHelper.accessor('calle', {
			cell: (info) => <div>{info.row.original.calle ?? sinRegistro}</div>,
			header: 'Calle',
			footer: 'Calle',
		}),

		columnHelper.accessor('colonia', {
			cell: (info) => (
				<div>
					{info.getValue()}{' '}
					{info.row.original.cp ? `C.P. ${info.row.original.cp}` : sinRegistro}
				</div>
			),
			header: 'Colonia',
			footer: 'Colonia',
		}),

		columnHelper.accessor('Usuario.telefono', {
			cell: (info) => (
				<div className='flex flex-row justify-center gap-2 '>
					<span>{info.getValue()}</span>
				</div>
			),
			header: 'Telefono',
			footer: 'Telefono',
		}),

		columnHelper.accessor('Usuario.mail', {
			cell: (info) => (
				<div className='flex flex-row justify-center gap-2 '>
					<span>{info.getValue() ?? sinRegistro}</span>
				</div>
			),
			header: 'Email',
			footer: 'Email',
		}),

		columnHelper.accessor('seccion', {
			cell: (info) => (
				<div className='flex flex-row justify-center gap-2 '>
					<span>{info.getValue() ?? sinRegistro}</span>
				</div>
			),
			header: 'Distrito/Seccion',
			footer: 'Distrito/Seccion',
		}),

		columnHelper.display({
			cell: (_info) => (
				<div className='flex items-center gap-2'>
					<Dropdown>
						<DropdownToggle>
							<Button variant='outline' color='zinc' icon='HeroRocketLaunch'>
								Selecciona
							</Button>
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem>
								<Tooltip text='Ver'>
									<Button
										icon='HeroEye'
										isActive
										color='sky'
										onClick={() => {
											handleOpenViewModal(_info.row.original);
										}}>
										{' '}
										Ver{' '}
									</Button>
								</Tooltip>
							</DropdownItem>
							<DropdownItem>
								<Tooltip text='Editar'>
									<Button
										icon='HeroPencil'
										isActive
										color='violet'
										onClick={() => {
											handleOpenEditModal(_info.row.original);
										}}>
										{' '}
										Editar{' '}
									</Button>
								</Tooltip>
							</DropdownItem>
							<DropdownItem>
								<Tooltip text='Exportar Promovidos'>
									<Button
										icon='HeroDocumentText'
										isActive
										color='lime'
										onClick={() => {
											handleExportarPromovidosPorPromotor(_info.row.original);
										}}>
										{' '}
										Exportar Promovidos{' '}
									</Button>
								</Tooltip>
							</DropdownItem>
							<DropdownItem>
								<Tooltip text='Exportar Enlaces/Problematicas'>
									<Button
										icon='HeroDocumentText'
										isActive
										color='blue'
										colorIntensity='900'
										onClick={() => {
											handleExportarProblemticas(_info.row.original);
										}}>
										{' '}
										Exportar Enlaces/Problematicas{' '}
									</Button>
								</Tooltip>
							</DropdownItem>
							<DropdownItem>
								<Tooltip text='Eliminar'>
									<Button
										icon='HeroTrash'
										isActive
										color='red'
										colorIntensity='800'
										onClick={() => {
											handleOpenDeleteAlert(_info.row.original);
										}}>
										{' '}
										Eliminar{' '}
									</Button>
								</Tooltip>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			),
			header: 'Acciones',
			footer: 'Acciones',
		}),
	];
};
const Promotor = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const [exModal1, setExModal1] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingPDFPromotores, setLoadingPDFPromotores] = useState<boolean>(false);
	const [promotores, setPromotores] = useState<any>([]);
	const [currentValue, setCurrentValue] = useState<any>();
	const [isEdit, setIsEdit] = useState<any>();
	const [isView, setIsView] = useState<any>();
	const { token } = JSON.parse(window.localStorage.getItem(`user`));
	const _promotorService: PromotorService = new PromotorService(new FetchService(token));
	const _reportesService: ReportesService = new ReportesService(new FetchService(token));
	async function obtenerPromotores() {
		setLoading(true);
		const _promotores = await _promotorService.obtenerPromotores();
		setPromotores([..._promotores]);
		setLoading(false);
	}

	useEffect(() => {
		obtenerPromotores();
		return () => {};
	}, []);

	const handleOpenEditModal = (data) => {
		if (data.fechaNacimiento && data.fechaNacimiento.toString().length > 0) {
			data.fechaNacimiento = formatDateCalendarInput(data.fechaNacimiento);
		}
		setIsView(false);
		setCurrentValue(data);
		setIsEdit(true);
		setExModal1(true);
	};

	const handleOpenViewModal = (data) => {
		if (data.fechaNacimiento && data.fechaNacimiento.toString().length > 0) {
			data.fechaNacimiento = formatDateCalendarInput(data.fechaNacimiento);
		}
		setIsView(true);
		setIsEdit(false);
		setCurrentValue(data);
		setExModal1(true);
	};

	const handleOpenDeleteAlert = (data) => {
		console.log(data);
		MySwal.fire({
			title: `<span class="text-lg">Estas seguro que deseas eliminar el promotor: <span> <br/> <span class="text-xl text-red-700">${
				data.Usuario.nombres
			} ${data.Usuario.apellidos ?? ''}<span>`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Eliminar',
			confirmButtonColor: '#991b1b',
		}).then(async (result) => {
			if (result.isConfirmed) {
				await _promotorService.eliminarPromotor(data.idPromotor);
				await obtenerPromotores();
			}
		});
	};

	const handleOpenAddModal = () => {
		setCurrentValue({});
		setIsEdit(false);
		setIsView(false);
		setExModal1(true);
	};

	const handleCloseModal = () => {
		setExModal1(false);
	};

	const handleCloseModalWithReload = async () => {
		setExModal1(false);
		await obtenerPromotores();
	};

	const handleExportarPromovidosPorPromotor = async (data) => {
		const pdf = await _reportesService.obtenerPromovidosPorPromtorPDF(data.idPromotor);
		// console.log(await pdf.blob())
		const file = new Blob([await pdf.blob()], { type: 'application/pdf' });
		// Build a URL from the file
		const fileURL = URL.createObjectURL(file);
		// Open the URL on new Window
		const pdfWindow = window.open();
		pdfWindow.location.href = fileURL;
	};

	const handleExportarTodosPromovidos = async () => {
		try {
			const pdf = await _reportesService.obtenerTodosLosPromovidosPDF();

			const file = new Blob([await pdf.blob()], { type: 'application/pdf' });

			const fileURL = URL.createObjectURL(file);

			const pdfWindow = window.open();
			pdfWindow.location.href = fileURL;
		} catch (error) {
			console.log(error);
		}
	};

	const handleExportarTodosPromotores = async () => {
		try {
			setLoadingPDFPromotores(true);
			const pdf = await _reportesService.obtenerTodosLosPromotoresPDF();

			const file = new Blob([await pdf.blob()], { type: 'application/pdf' });

			const fileURL = URL.createObjectURL(file);

			const pdfWindow = window.open();
			pdfWindow.location.href = fileURL;
		} catch (error) {
		} finally {
			setLoadingPDFPromotores(false);
		}
	};

	const handleExportarProblemticas = async (data) => {
		try {
			setLoadingPDFPromotores(true);
			const pdf = await _reportesService.obtenerTodosEnlacesPorPromotorPDF(data.idPromotor);

			const file = new Blob([await pdf.blob()], { type: 'application/pdf' });

			const fileURL = URL.createObjectURL(file);

			const pdfWindow = window.open();
			pdfWindow.location.href = fileURL;
		} catch (error) {
		} finally {
			setLoadingPDFPromotores(false);
		}
	};

	const table = useReactTable({
		data: promotores,
		columns: columns(
			handleOpenEditModal,
			handleOpenDeleteAlert,
			handleOpenViewModal,
			handleExportarPromovidosPorPromotor,
			handleExportarProblemticas,
		),
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

		// debugTable: true,
	});

	if (loading) {
		return <Spinner fullView />;
	}

	return (
		<PageWrapper name='Promotor List'>
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
				<SubheaderRight className='flex-col sm:flex-row'>
					<Tooltip text='Generar el reporte de todos tus promotores incluyendo sus promovidos'>
						<Button
							variant='solid'
							color='lime'
							icon='HeroDocumentText'
							onClick={() => handleExportarTodosPromovidos()}>
							Generar Promovidos
						</Button>
					</Tooltip>
					<Tooltip text='Exportar todos los promotores que se han dado de alta'>
						<Button
							variant='solid'
							color='violet'
							icon='HeroDocumentText'
							isLoading={loadingPDFPromotores}
							onClick={() => handleExportarTodosPromotores()}>
							Generar Promotores
						</Button>
					</Tooltip>
					<Tooltip text='Agrega un nuevo promotor para despues asociarle promovidos'>
						<Button
							variant='solid'
							icon='HeroPlus'
							onClick={() => handleOpenAddModal()}>
							Agregar
						</Button>
					</Tooltip>
				</SubheaderRight>
			</Subheader>
			<Container>
				<Card className='h-full'>
					<CardHeader>
						<CardHeaderChild>
							<CardTitle>Promotores</CardTitle>
							<Badge
								variant='outline'
								className='border-transparent px-4'
								rounded='rounded-full'>
								{table.getFilteredRowModel().rows.length} registros
							</Badge>
						</CardHeaderChild>
					</CardHeader>
					<div />
					<CardBody className='overflow-auto'>
						<TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} />
					</CardBody>
					<TableCardFooterTemplate table={table} />
				</Card>
			</Container>
			<Modal isOpen={exModal1} setIsOpen={setExModal1} isStaticBackdrop>
				<ModalHeader>Agregar Promotor</ModalHeader>
				<ModalBody>
					<FormAddPromotor
						handleCloseModal={handleCloseModal}
						handleCloseModalWithReload={handleCloseModalWithReload}
						valuesForm={currentValue}
						isEdit={isEdit}
						isView={isView}
					/>
				</ModalBody>
			</Modal>
		</PageWrapper>
	);
};

export default Promotor;
