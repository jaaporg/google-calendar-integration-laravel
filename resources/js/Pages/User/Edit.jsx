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

export default function Edit({ auth, user, roles, userRole, countries }) {
    const { t } = useTranslation();
    const { data, setData, patch, processing, errors, progress } = useForm({
        name: user.name,
        address: user.address ?? '',
        username: user.username,
        role: userRole,
        email: user.email,
        country_id: user.country_id ?? 0,
        status: user.status,
        password: '',
        password_confirmation: '',
        avatar: '',
    });

    const status = [
        { id: '1', name: t('active') },
        { id: '2', name: t('inactive') },
    ]

    const submit = (e) => {
        e.preventDefault();
        patch(route('user.update', user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('update user')}</h2>}
        >
            <Head title={t('update user')} />

            <Breadcrumb breadcrumbs={[{name: t('home')}, {name: t('users')}, {name: t('update')}]}/>

            <div className='row'>
                <div className='col-md-8'>
                    <div className="card flex-fill w-100">
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <div className='mb-3'>
                                    <InputLabel htmlFor="name" value={t('name')} className='form-label' />

                                    <TextInput
                                        id="name"
                                        type="name"
                                        name="name"
                                        value={data.name}
                                        className="form-control form-control-lg"
                                        autoComplete="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className='mb-3'>
                                    <InputLabel htmlFor="username" value={t('username')} className='form-label' />

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
                                    <InputLabel htmlFor="email" value={t('email')} className='form-label' />

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
                                    <InputLabel htmlFor="role" value={t('roles')} className='form-label' />

                                    <SelectInput
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        className="form-control form-control-lg"
                                        autoComplete="role"
                                        placeholder={t('select role')}
                                        trackBy={'name'}
                                        options={roles}
                                        onChange={(e) => setData('role', e.target.value)}
                                    />

                                    <InputError message={errors.role_id} className="mt-2" />
                                </div>
                                <div className='mb-3'>
                                    <InputLabel htmlFor="address" value={t('address')} className='form-label' />

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

                                <div className='mb-3'>
                                    <InputLabel htmlFor="country_id" value={t('country')} className='form-label' />

                                    <SelectInput
                                        id="country_id"
                                        name="country_id"
                                        value={data.country_id}
                                        className="form-control form-control-lg"
                                        autoComplete="country_id"
                                        placeholder={t('select country')}
                                        options={countries}
                                        onChange={(e) => setData('country_id', e.target.value)}
                                    />

                                    <InputError message={errors.country_id} className="mt-2" />
                                </div>

                                <div className='mb-3'>
                                    <InputLabel htmlFor="status" value={t('status')} className='form-label' />

                                    <SelectInput
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        className="form-control form-control-lg"
                                        autoComplete="status"
                                        placeholder={t('select status')}
                                        options={status}
                                        onChange={(e) => setData('status', e.target.value)}
                                    />

                                    <InputError message={errors.status} className="mt-2" />
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
                                    />

                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <PrimaryButton className="btn btn-lg btn-primary" disabled={processing}>Save</PrimaryButton>
                                <SecondaryLink href={route('user.index')} className='ml-1'>Back</SecondaryLink>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className="card flex-fill w-100">
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <TextInput 
                                    type="file"
                                    value={data.avatar}
                                    className="form-control"
                                    onChange={e => setData('avatar', e.target.files[0])}
                                />
                                {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
