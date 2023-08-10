import { useFormContext, Controller } from 'react-hook-form';
import CustomTextField from 'src/@core/components/mui/text-field';


interface RHFTextFieldProp {
  name: any, onChange?: () => any, value?: any, placeholder?: string,
  label?: string, disabled?: boolean, multiline?: boolean, minRows?: any, id?: any, defaultValue?: any
};

export default function RHFTextField({ name, onChange, value, placeholder, label, disabled, multiline, minRows, id,defaultValue, ...other }: RHFTextFieldProp) {
  const { control, getValues, setValue, register,setError } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CustomTextField 
          label={label} id={value}  placeholder={placeholder} disabled={disabled} 
          defaultValue={defaultValue}
          multiline={multiline} minRows={minRows} {...field} fullWidth
          error={!!error} helperText={error?.message} {...other} 
        />
      )}
    />
  );
}
