import React, { useEffect, useState } from 'react';
import {
	ColumnFiltersState,
	createColumnHelper,
	FilterFn,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import Container from '../../components/layouts/Container/Container';
import { appPages } from '../../config/pages.config';
import usersDb, { TUser } from '../../mocks/db/users.db';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Icon from '../../components/icon/Icon';
import Input from '../../components/form/Input';
import TableTemplate, { TableCardFooterTemplate } from '../../templates/common/TableParts.template';
import Badge from '../../components/ui/Badge';
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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import FormAddEnlace from './components/FormAddEnlace/FormAddEnlace';
import PromovidosService from '../../services/promovidos.service';
import { FetchService } from '../../services/config/FetchService';
import PromotorService from '../../services/promotor.service';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import { useAuth } from '../../context/authContext';
import { formatDateCalendarInput } from '../../components/utils/functions';
import EnlaceService from '../../services/enlace.service';


const MySwal = withReactContent(Swal)

  
const columnHelper = createColumnHelper<any>();
const editLinkPath = `../${appPages.crmAppPages.subPages.customerPage.subPages.editPageLink.to}/`;
const sinRegistro = 'N/A';
const columns = (handleOpenEditModal, handleOpenDeleteAlert, handleOpenViewModal) => {
	return [
		columnHelper.accessor('nombres', {
			cell: (info) => (
					<div>
						{info.row.original.nombres}&nbsp;{info.row.original.apellidos}
					</div>
			),
			header: 'Nombre',
			footer: 'Nombre',
			enableGlobalFilter: true,
			enableSorting: true,
		}),
		columnHelper.accessor('calle', {
			cell: (info) => (
				<div>{info.getValue() ?? sinRegistro}</div>
			),
			header: 'Calle',
			footer: 'Calle',
		}),
		columnHelper.accessor('colonia', {
			cell: (info) => (
				<div>{info.getValue() ?? sinRegistro}</div>
			),
			header: 'Colonia',
			footer: 'Colonia',
		}),
		columnHelper.accessor('cp', {
			cell: (info) => (
				<div>{info.getValue() ?? sinRegistro}</div>
			),
			header: 'Codigo postal',
			footer: 'Codigo postal',
		}),

		columnHelper.accessor('problematica', {
			cell: (info) => (
				<div className='flex flex-row justify-center gap-2 '>
					<span>{info.getValue()  ?? sinRegistro }</span>
				</div>
			),
			header: 'Problematica',
			footer: 'Problematica',
		}),

		columnHelper.accessor('mail', {
			cell: (info) => (
				<div className='flex flex-row justify-center gap-2 '>
					<span>{info.getValue() ?? sinRegistro }</span>
				</div>
			),
			header: 'Email',
			footer: 'Email',
		}),
		columnHelper.accessor('telefono', {
			cell: (info) => (
				<div className=''>
					<span>{info.getValue()  ?? sinRegistro }</span>
				</div>
			),
			header: 'Telefono',
			footer: 'Telefono',
			enableGlobalFilter: true,
			enableSorting: true,
		}),
		columnHelper.accessor('Promotor.Usuario.nombres', {
			cell: (info) => (
				<div className=''>
					<span>{info.getValue()  ?? sinRegistro }</span>
				</div>
			),
			header: 'Enlace',
			footer: 'Enlace',
			enableGlobalFilter: true,
			enableSorting: true,
		}),

		columnHelper.display({
			cell: (_info) => (
				<div className='flex items-center gap-2'>
					<Tooltip text='Ver'>
						<Button icon='HeroEye' isActive color='sky'  onClick={() => { handleOpenViewModal(_info.row.original) }} />
					</Tooltip>
					<Tooltip text='Editar'>
						<Button icon='HeroPencil' isActive color='violet' onClick={() => { handleOpenEditModal(_info.row.original) }} />
					</Tooltip>
					<Tooltip text='Eliminar'>
						<Button icon='HeroTrash' isActive  color='red' colorIntensity='800' onClick={() => { handleOpenDeleteAlert(_info.row.original) }} />
					</Tooltip>
				</div>
			),
			header: 'Acciones',
			footer: 'Acciones',
		}),
	];
}

const Enlace = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const [exModal1, setExModal1] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [enlaces, setEnlaces] = useState<any>([]);
	const [promotores, setPromotores] = useState<any>([]);
	const [currentValue, setCurrentValue] = useState<any>();
	const [isEdit, setIsEdit] = useState<any>();
	const [isView, setIsView] = useState<any>();
	const { token } = JSON.parse(window.localStorage.getItem(`user`));
	const _enlaceService: EnlaceService = new EnlaceService(new FetchService(token));
	const _promotorService: PromotorService = new PromotorService(new FetchService(token));
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	  )
	async function obtenerPromotres() {
		setLoading(true);
		const _promotores = await _promotorService.obtenerPromotores();
		setPromotores([..._promotores]);
		setLoading(false);
	}

	async function obtenerPromovidos() {
		setLoading(true);
		const _enlaces = await _enlaceService.obtenerEnlaces();
		setEnlaces([..._enlaces]);
		setLoading(false);
	}

	const handleOpenEditModal = (data) => {
		
		if(data.fechaNacimiento && data.fechaNacimiento.toString().length > 0){
			data.fechaNacimiento = formatDateCalendarInput(data.fechaNacimiento)
		}
		setIsEdit(true)
		setIsView(false)
		setCurrentValue(data)
		setExModal1(true)
	}

	const handleOpenViewModal = (data) => {
		
		if(data.fechaNacimiento && data.fechaNacimiento.toString().length > 0){
			data.fechaNacimiento = formatDateCalendarInput(data.fechaNacimiento)
		}
		setIsView(true)
		setIsEdit(false)
		setCurrentValue(data)
		setExModal1(true)
	}

	const handleOpenAddModal = () => {
		setCurrentValue({})
		setIsEdit(false)
		setExModal1(true)
	}

	const handleOpenDeleteAlert = (data) =>{
		MySwal.fire({
			title: `<span class="text-lg">Estas seguro que deseas eliminar el enlace: <span> <br/> <span class="text-xl text-red-700">${data.nombres}<span>`,
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "Eliminar",
			confirmButtonColor:"#991b1b"
		  }).then(async (result) => {
			if(result.isConfirmed){
				 await _enlaceService.eliminarEnlace(data.idEnlace)
				 await obtenerPromovidos()
			}
		  })
	}

	useEffect(() => {
		obtenerPromovidos();
		obtenerPromotres();
		return () => { };
	}, []);

	const filterTable = () =>{

	}

	const table = useReactTable({
		data: enlaces,
		columns:columns(handleOpenEditModal, handleOpenDeleteAlert, handleOpenViewModal),
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

		debugTable: true,
	});
	


	const handleCloseModal = () => {
		setExModal1(false);
	};
	const handleCloseModalWithReload = async () => {
		setExModal1(false);
		await obtenerPromovidos();
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
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
					<SubheaderRight>
						<Button variant='solid' icon='HeroPlus' onClick={() => handleOpenAddModal()}>
							Agregar
						</Button>
					</SubheaderRight>
				</Subheader>
				<Container>
					<Card className='h-full'>
						<CardHeader>
							<CardHeaderChild>
								<CardTitle>Enlaces</CardTitle>
								<Badge
									variant='outline'
									className='border-transparent px-4'
									rounded='rounded-full'>
									{table.getFilteredRowModel().rows.length} registros
								</Badge>
							</CardHeaderChild>
						</CardHeader>

						<CardBody className='overflow-auto'>
							<TableTemplate
								className='table-fixed max-md:min-w-[70rem]'
								table={table}
							/>
						</CardBody>
						<TableCardFooterTemplate table={table} />
					</Card>
				</Container>
				<Modal isOpen={exModal1} setIsOpen={setExModal1} isStaticBackdrop>
					<ModalHeader>Agregar Promovido</ModalHeader>
					<ModalBody>
						<FormAddEnlace
							handleCloseModal={handleCloseModal}
							handleCloseModalWithReload={handleCloseModalWithReload}
							promotores={promotores}
							valuesForm={currentValue}
							isEdit={isEdit}
							isView={isView}
						/>
					</ModalBody>
				</Modal>
			</PageWrapper>
		</>
	);
};

export default Enlace;
