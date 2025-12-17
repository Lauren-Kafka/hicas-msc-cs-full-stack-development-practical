import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../ui';

export const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            await login(data);
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...register('password', { required: 'Password is required' })}
            />
            <Button
                type="submit"
                text="Sign In"
                variant="primary"
                className="w-full"
                isLoading={isSubmitting}
            />
        </form>
    );
};
