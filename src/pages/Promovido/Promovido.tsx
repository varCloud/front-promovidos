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
import FormAddPromovido from './components/FormAddPromovido/FormAddPromovido';
import PromovidosService from '../../services/promovidos.service';
import { FetchService } from '../../services/config/FetchService';
import PromotorService from '../../services/promotor.service';

const columnHelper = createColumnHelper<any>();

const editLinkPath = `../${appPages.crmAppPages.subPages.customerPage.subPages.editPageLink.to}/`;
const sinRegistro = 'N/A';
const columns = [
	columnHelper.accessor('image', {
		cell: (info) => (
			<Link to={`${editLinkPath}${info.row.original.id}`}>
				<Avatar
					src={info.getValue()?.thumb}
					name={`${info.row.original.nombres} ${info.row.original.apellidos}`}
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
				<div className='font-bold'>
					{info.row.original.nombres} {info.row.original.apellidos}
				</div>
			</Link>
		),
		header: 'Nombres',
		footer: 'Nombres',
	}),
	columnHelper.accessor('direccion', {
		cell: (info) => (
			<div className='font-bold'>{info.row.original.direccion ?? sinRegistro}</div>
		),
		header: 'Direccion',
		footer: 'Direccion',
	}),

	columnHelper.accessor('telefono', {
		cell: (info) => (
			<div className='flex flex-row justify-center gap-2 '>
				<span>{info.getValue()}</span>
				{info.getValue() ? (
					<span>
						{' '}
						<Icon icon='HeroCheckBadge' color='blue' />
					</span>
				) : (
					sinRegistro
				)}
			</div>
		),
		header: 'Telefono',
		footer: 'Telefono',
	}),

	columnHelper.accessor('mail', {
		cell: (info) => (
			<div className='flex flex-row justify-center gap-2 '>
				<span>{info.getValue()}</span>
				{info.getValue() ? (
					<span>
						{' '}
						<Icon icon='HeroCheckBadge' color='blue' />
					</span>
				) : (
					sinRegistro
				)}
			</div>
		),
		header: 'Email',
		footer: 'Email',
	}),

	columnHelper.accessor('redesSociales', {
		cell: (info) => (
			<div className='flex flex-row justify-center gap-2 '>
				<span>{info.getValue() ?? sinRegistro}</span>
			</div>
		),
		header: 'Redes Sociales',
		footer: 'Redes Sociales',
	}),

	columnHelper.display({
		cell: (_info) => (
			<div className='flex items-center gap-2'>
				<Tooltip text='Editar'>
					<Button icon='HeroPencil' />
				</Tooltip>
				<Tooltip text='Eliminar'>
					<Button icon='HeroTrash' color='red' colorIntensity='800' />
				</Tooltip>
			</div>
		),
		header: 'Acciones',
		footer: 'Acciones',
	}),
];

const Promovido = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const [exModal1, setExModal1] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [promovidos, setPromovidos] = useState<any>([]);
	const [promotores, setPromotores] = useState<any>([]);
	const _promovidosService: PromovidosService = new PromovidosService(new FetchService());
	const _promotorService: PromotorService = new PromotorService(new FetchService());

	async function obtenerPromotres() {
		setLoading(true);
		const _promotores = await _promotorService.obtenerPromotores();
		setPromotores([..._promotores]);
		setLoading(false);
	}

	async function obtenerPromovidos() {
		setLoading(true);
		const _promovidos = await _promovidosService.obtenerPromovidos();
		setPromovidos([..._promovidos]);
		setLoading(false);
	}

	useEffect(() => {
		obtenerPromovidos();
		obtenerPromotres();
		return () => {};
	}, []);

	const table = useReactTable({
		data: promovidos,
		columns,
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

	if (promovidos.length > 0) {
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
					<SubheaderRight>
						<Button variant='solid' icon='HeroPlus' onClick={() => setExModal1(true)}>
							Agregar
						</Button>
					</SubheaderRight>
				</Subheader>
				<Container>
					<Card className='h-full'>
						<CardHeader>
							<CardHeaderChild>
								<CardTitle>Promovidos</CardTitle>
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
						<FormAddPromovido
							handleCloseModal={handleCloseModal}
							handleCloseModalWithReload={handleCloseModalWithReload}
							promotores={promotores}
						/>
					</ModalBody>
				</Modal>
			</PageWrapper>
		);
	}
};

export default Promovido;
