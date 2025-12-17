import React from 'react';
import { Link } from 'react-router-dom';

export const AuthFooter = ({ text, linkText, to }) => (
    <div className="text-center text-sm text-slate-500">
        {text}{' '}
        <Link to={to} className="font-semibold text-slate-900 hover:underline">
            {linkText}
        </Link>
    </div>
);
