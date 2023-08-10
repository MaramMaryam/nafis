import { useState, ChangeEvent, useEffect, useMemo, useContext } from 'react'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { CustomRadioIconsData, CustomRadioIconsProps } from 'src/@core/components/custom-radio/types'
import { Box } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material/Select'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
// import ProfileContext from 'src/context/UserProfileContext'
import RHFTextField from 'src/@core/components/hook-form/RHFTextField'
import UserContext from 'src/@core/context/userContext'
import FormProvider from 'src/@core/components/hook-form/FormProvider'

const datas: CustomRadioIconsData[] = [
    {
        value: 'builder',
        isSelected: true,
        content: 'List property as Builder, list your project and get highest reach.',
        title: (
            <Typography variant='h6' sx={{ mb: 1 }}>
                I am the Builder
            </Typography>
        )
    },
    {
        value: 'owner',
        content: 'Submit property as an Individual. Lease, Rent or Sell at the best price.',
        title: (
            <Typography variant='h6' sx={{ mb: 1 }}>
                I am the Owner
            </Typography>
        )
    },
    {
        value: 'broker',
        content: 'Earn highest commission by listing your clients properties at the best price.',
        title: (
            <Typography variant='h6' sx={{ mb: 1 }}>
                I am the Broker
            </Typography>
        )
    }
]

const StepPersonalDetails = ({ steps, isEdit, isLoading, onNext }: any) => {
    const maritalStatusArray = ['مجرد', 'متاهل', 'متارکه']
    const theme = useTheme()
    const [maritalStatus, setMaritalStatus] = useState<string[]>([])
    const { data, setData, activeStep, setActiveStep } = useContext<any>(UserContext);
    console.log(data?.data?.personalData, data?.data, data, steps)

    const showErrors = (field: string, valueLen: number, min: number) => {
        if (valueLen === 0) {
            return `${field} field is required`
        } else if (valueLen > 0 && valueLen < min) {
            return `${field} must be at least ${min} characters`
        } else {
            return ''
        }
    }

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        lastName: yup
            .string()
            .min(3, obj => showErrors('lastName', obj.value.length, obj.min))
            .required(),
        firstName: yup
            .string()
            .min(3, obj => showErrors('firstName', obj.value.length, obj.min))
            .required()
    })
    const handleChange = (event: SelectChangeEvent<typeof maritalStatus>) => {
        const {
            target: { value }
        } = event
        setMaritalStatus(typeof value === 'string' ? value.split(',') : value)
    }
    const last_update = new Date()
    const defaultValues = useMemo(
        () => ({
            //   activeStep, 
            last_update,
            email: '',
            lastName: '',
            firstName: '',
            code: '',
            bitrthDate: '',
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
        mode: "onChange"
    });

    const {
        handleSubmit, control,
        formState: { isSubmitting, errors },
    } = methods

    // const onSubmits = async (values: any) => {
    //     console.log(values, values.personalData);
    //     setData((prev: any) => ({ steps: steps, ...data?.data?.values, ...prev, personalData: values?.personalData }));
    //     setActiveStep(activeStep + 1)
    // }

    const onSubmit = async (personalData: any) => {
        console.log(personalData)

        // try {
        //     await fetch('/api/createProfile', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             step: steps[0].id,
        //             data: personalData,
        //             steps,
        //             last_update
        //         }),
        //     });
        //     setData((prev: any) => ({
        //         ...prev, ...data,
        //         step: steps[0].id,
        //         step0: personalData,
        //         last_update,
        //         steps
        //     }))
        //     onNext();
        // } catch (error) {
        //     console.error('Error saving data:', error);
        // }
    };
    const renderFooter = () => {
        const stepCondition = activeStep === steps.length - 1

        return (
            <Box sx={{ mt: 6, display: 'flex', flexDirection: 'row-reverse' }}>
                <Button type='submit'
                    variant='contained'
                    color={stepCondition ? 'success' : 'primary'}
                    endIcon={
                        <Icon
                            icon={
                                stepCondition ? 'tabler:check' : theme.direction === 'ltr' ? 'tabler:arrow-right' : 'tabler:arrow-left'
                            }
                        />
                    }
                >
                    {stepCondition ? 'Submit' : 'Next'}
                </Button>
            </Box>
        )
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <RHFTextField name={'firstName'} label='نام' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFTextField name={'lastName'} label='نام خانوادگی' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFTextField name={'email'} label='آدرس الکترونیک' placeholder='john.doe@gmail.com' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFTextField name={'bitrthDate'} label='تاریخ تولد' placeholder='مثال:1394/01/01' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFSelect name={'maritalStatus'} label='وضعیت تاهل' SelectProps={{
                        multiple: false,
                        value: maritalStatus,
                        onChange: (e: any) => handleChange(e as SelectChangeEvent<typeof maritalStatus>),
                        renderValue: (selected: any) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {(selected as string[]).map(value => (
                                    <CustomChip rounded key={value} label={value} skin='light' />
                                ))}
                            </Box>
                        )
                    }}>
                        {maritalStatusArray.map((maritalStatus: any) => (
                            <MenuItem key={maritalStatus} value={maritalStatus}>
                                {maritalStatus}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFTextField name={'code'} label='شماره شناسنامه' placeholder='24' />
                </Grid>

                <Grid item xs={12}>
                    <RHFTextField name={'Mobile'} label='تلفن همراه' />
                </Grid>
            </Grid>
            {renderFooter()}
        </FormProvider>
    )
}

export default StepPersonalDetails
