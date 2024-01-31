import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import SecondaryLink from '@/Components/SecondaryLink';
import SelectInput from '@/Components/SelectInput';
import Breadcrumb from '@/Components/Breadcrumb';
import { useTranslation } from "react-i18next";

export default function Create({ auth, roles, countries }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: ' ',
        username: '',
        email: '',
        role: '',
        status: '',
        country_id: ' ',
        password: '',
        password_confirmation: '',
    });

    const status = [
        { id: '1', name: 'Active' },
        { id: '2', name: 'Inactive' },
    ]

    const submit = (e) => {
        e.preventDefault();
        post(route('user.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create User</h2>}
        >
            <Head title="Create User" />

            <Breadcrumb breadcrumbs={[{name: t('home')}, {name: 'Users'}, {name: 'Create'}]}/>

            <div className="row">
                <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                    <div className="card flex-fill w-100">
                        <div className="card-body">
                            <div className="col-auto d-none d-sm-block mb-3">
                                <h2><strong>Create User</strong></h2>
                            </div>
                            <form onSubmit={submit}>
                                <div className='mb-3'>
                                    <InputLabel htmlFor="name" value="Name" className='form-label' />

                                    <TextInput
                                        id="name"
                                        type="name"
                                        name="name"
                                        value={data.name}
                                        className="form-control form-control-lg"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className='mb-3'>
                                    <InputLabel htmlFor="username" value="Username" className='form-label' />

                                    <TextInput
                                        id="username"
                                        type="username"
                                        name="username"
                                        value={data.username}
                                        className="form-control form-control-lg"
                                        autoComplete="username"
                                        onChange={(e) => setData('username', e.target.value)}
                                    />

                                    <InputError message={errors.username} className="mt-2" />
                                </div>
                                <div className='mb-3'>
                                    <InputLabel htmlFor="email" value="Email" className='form-label' />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="form-control form-control-lg"
                                        autoComplete="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className='mb-3'>
                                    <InputLabel htmlFor="role" value="Roles" className='form-label' />

                                    <SelectInput
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        className="form-control form-control-lg"
                                        autoComplete="role"
                                        placeholder="Select Role"
                                        trackBy={'name'}
                                        options={roles}
                                        onChange={(e) => setData('role', e.target.value)}
                                    />

                                    <InputError message={errors.role} className="mt-2" />
                                </div>

                                <div className='mb-3'>
                                    <InputLabel htmlFor="country_id" value="Country" className='form-label' />

                                    <SelectInput
                                        id="country_id"
                                        name="country_id"
                                        value={data.country_id}
                                        className="form-control form-control-lg"
                                        autoComplete="country_id"
                                        placeholder="Select Country"
                                        options={countries}
                                        onChange={(e) => setData('country_id', e.target.value)}
                                    />

                                    <InputError message={errors.country_id} className="mt-2" />
                                </div>

                                <div className='mb-3'>
                                    <InputLabel htmlFor="status" value="Status" className='form-label' />

                                    <SelectInput
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        className="form-control form-control-lg"
                                        autoComplete="status"
                                        placeholder="Select Status"
                                        options={status}
                                        onChange={(e) => setData('status', e.target.value)}
                                    />

                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <div className='mb-3'>
                                    <InputLabel htmlFor="address" value="Address" className='form-label' />

                                    <TextareaInput
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        className="form-control form-control-lg"
                                        autoComplete="address"
                                        onChange={(e) => setData('address', e.target.value)}
                                    ></TextareaInput>

                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                <div className="mb-3">
                                    <InputLabel htmlFor="password" value="Password" className='form-label' />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="form-control form-control-lg"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mb-3">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='form-label' />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="form-control form-control-lg"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <PrimaryButton className="btn btn-lg btn-primary" disabled={processing}>Save</PrimaryButton>
                                <SecondaryLink href={route('user.index')} className='ml-1'>Back</SecondaryLink>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
