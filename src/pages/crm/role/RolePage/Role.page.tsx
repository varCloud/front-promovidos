import React from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../../../components/layouts/Container/Container';
import rolesDb from '../../../../mocks/db/roles.db';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/Input';
import Checkbox from '../../../../components/form/Checkbox';
import modulesDb from '../../../../mocks/db/modules.db';
import PERMISSION from '../../../../constants/permissions.constant';

const RolePage = () => {
	const { id } = useParams();

	const roleDb = rolesDb.find((i) => i.id === id);

	const formik = useFormik({
		initialValues: {
			id: roleDb?.id,
			name: roleDb?.name,
			modules: roleDb?.modules,
		},
		onSubmit: () => {},
	});

	return (
		<PageWrapper name={formik.values.name}>
			<Container>
				<div className='grid grid-cols-12 gap-4'>
					<div className='col-span-12'>
						<h1 className='my-4 font-bold'>Role Edit</h1>
					</div>
					<div className='col-span-12'>
						<Card>
							<CardHeader>
								<CardHeaderChild>
									<CardTitle>General Info</CardTitle>
								</CardHeaderChild>
							</CardHeader>
							<CardBody>
								<div className='grid grid-cols-12 gap-4'>
									<div className='col-span-12 lg:col-span-6'>
										<Label htmlFor='id'>ID</Label>
										<Input
											id='id'
											name='id'
											onChange={formik.handleChange}
											value={formik.values.id}
											disabled
										/>
									</div>
									<div className='col-span-12 lg:col-span-6'>
										<Label htmlFor='name'>name</Label>
										<Input
											id='name'
											name='name'
											onChange={formik.handleChange}
											value={formik.values.name}
										/>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-span-12'>
						<Card>
							<CardHeader>
								<CardHeaderChild>
									<CardTitle>General Info</CardTitle>
								</CardHeaderChild>
							</CardHeader>
							<CardBody>
								<div className='grid grid-cols-12 gap-4'>
									{modulesDb.map((module) => (
										<div className='col-span-12 lg:col-span-6' key={module.id}>
											<Label htmlFor={module.id}>{module.name}</Label>
											<div className='grid grid-cols-12 gap-4'>
												<Input
													className='col-span-3'
													type='number'
													id={module.id}
													name={module.id}
													max={7}
													min={0}
													onChange={(e) =>
														formik.setFieldValue(
															`modules.${module.id}`,
															e.target.value,
														)
													}
													// @ts-ignore
													//  eslint-disable-next-line @typescript-eslint/restrict-template-expressions
													value={formik.values.modules[`${module.id}`]}
												/>
												{['read', 'write', 'execute'].map((i) => {
													return (
														<Checkbox
															className='col-span-3'
															variant='switch'
															key={i}
															id={`${module.id}-${i}`}
															name={i}
															label={
																i.charAt(0).toUpperCase() +
																i.slice(1)
															}
															onChange={() => {
																// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
																const newValues = {
																	...PERMISSION?.[
																		// @ts-ignore
																		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
																		formik.values?.modules?.[
																			`${module.id}`
																		]
																	],
																	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
																	[`${i}`]:
																		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
																		!PERMISSION?.[
																			// @ts-ignore
																			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
																			formik.values
																				?.modules?.[
																				`${module.id}`
																			]
																		]?.[`${i}`],
																};
																const filteredPermissions =
																	Object.values(PERMISSION).find(
																		(permission) => {
																			return (
																				permission.read ===
																					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
																					newValues.read &&
																				permission.write ===
																					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
																					newValues.write &&
																				permission.execute ===
																					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
																					newValues.execute
																			);
																		},
																	)?.value;
																formik
																	.setFieldValue('modules', {
																		...formik.values?.modules,
																		[`${module.id}`]:
																			filteredPermissions,
																	})
																	.then(() => {})
																	.catch(() => {});
															}}
															checked={
																// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
																PERMISSION?.[
																	// @ts-ignore
																	formik.values?.modules?.[
																		`${module.id}`
																	]
																]?.[`${i}`]
															}
														/>
													);
												})}
											</div>
										</div>
									))}
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Container>
		</PageWrapper>
	);
};

export default RolePage;
