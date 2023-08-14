import { useFormContext, Controller } from 'react-hook-form';
import CustomTextField from 'src/@core/components/mui/text-field';
import { forwardRef, useState, ChangeEvent } from 'react'
import { DateType } from 'src/types/froms/reactDatepickerTypes'
import { InputAdornment } from "@mui/material"
import Icon from 'src/@core/components/icon'
import DatePicker, { CalendarContainer, CalendarContainerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface RHFTextFieldProp {
    name: string, onChange?: () => any, value?: any, placeholder?: string, label?: string, disabled?: boolean, multiline?: boolean, minRows?: any
};

interface CustomInputProps {
    value: DateType
    label?: string
    error: boolean
    onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} InputProps={{
        endAdornment: (
            <InputAdornment position="start">
                <Icon icon='tabler:calendar' fontSize='1.75rem' cursor={'pointer'} />
            </InputAdornment>
        )
    }} />
})

export default function RHFDateField({ name, onChange, value, placeholder, label, disabled, multiline, minRows, ...other }: RHFTextFieldProp) {

    const { control, } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, field: { value, onChange }, fieldState: { error } }) => (
                <CalendarContainer>
                    <DatePicker wrapperClassName='date_picker full-width'
                        selected={value}
                        showYearDropdown
                        showMonthDropdown
                        onChange={e => onChange(e)}
                        placeholderText='MM/DD/YYYY'
                        customInput={
                            <CustomInput
                                value={value}
                                onChange={onChange}
                                label={label}
                                error={!!error}
                                {...other}
                            />} />
                </CalendarContainer>

            )}
        />
    );
}
