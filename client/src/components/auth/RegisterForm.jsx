import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../ui';

export const RegisterForm = () => {
    const { register: registerAuth } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            await registerAuth(data);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                icon={User}
                placeholder="Full Name"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
            />
            <Input
                icon={Mail}
                type="email"
                placeholder="name@example.com"
                error={errors.email?.message}
                {...register('email', { required: 'Email is required' })}
            />
            <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
                {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Min 6 chars' }
                })}
            />
            <Button
                type="submit"
                text="Sign Up"
                variant="primary"
                className="w-full"
                isLoading={isSubmitting}
            />
        </form>
    );
};
