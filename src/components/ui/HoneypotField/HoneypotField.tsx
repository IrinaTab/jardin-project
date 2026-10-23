// src/components/ui/HoneypotField/HoneypotField.tsx

import React from 'react';
import './HoneypotField.css';

export interface HoneypotFieldProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const HoneypotField: React.FC<HoneypotFieldProps> = ({ id, value, onChange }) => {
    return (
        <div className="honeypot-field" aria-hidden="true">
            <label htmlFor={id}>Website</label>
            <input
                type="text"
                id={id}
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};