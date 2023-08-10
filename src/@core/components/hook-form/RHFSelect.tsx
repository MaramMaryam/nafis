import { useFormContext, Controller } from 'react-hook-form';
import React from 'react';
import CustomTextField from 'src/@core/components/mui/text-field';
import { useTheme } from '@mui/material/styles'


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
    const theme = useTheme()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error, } }) => (
                <CustomTextField sx={{
                    '& .css-22rpjl-MuiSvgIcon-root-MuiSelect-icon': { position: 'relative', marginLeft: 2 },
                    '& .MuiSvgIcon-root .MuiSvgIcon-fontSizeMedium .MuiSelect-icon .MuiSelect-iconFilled .css-22rpjl-MuiSvgIcon-root-MuiSelect-icon': { textAlign: 'left' },
                    '& .MuiSelect-iconOpen': { position: 'relative', marginLeft: 2, flexDirection: 'row-reverse' }
                }} fullWidth
                    {...field} select error={!!error}
                    helperText={error?.message} defaultValue='' label={label} placeholder={placeholder} id='custom-select'{...other}>
                    {children}
                </CustomTextField>
            )}
        />
    );
}
