import { useFormContext, Controller } from 'react-hook-form';
import React from 'react';
import CustomTextField from 'src/@core/components/mui/text-field';


interface RHFSelectProps {
    children?: React.ReactNode,
    name: string,
    onSelect?: () => any,
    onClick?: () => any,
    defaultValue?: any,
    SelectProps?: any,
    label?: string,
    placeholder?: any
};

export default function RHFSelect({ name, children, defaultValue, onSelect, onClick, SelectProps, label, placeholder, ...other }: RHFSelectProps) {
    const { control } = useFormContext();
    
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error, } }) => (
                <CustomTextField fullWidth {...field} select error={!!error}
                    helperText={error?.message} defaultValue='' label={label} placeholder={placeholder} id='custom-select'{...other}>
                    {children}
                </CustomTextField>
            )}
        />
    );
}
