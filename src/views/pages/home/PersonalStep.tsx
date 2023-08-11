import { useState, ChangeEvent, useEffect, useMemo, useContext, SyntheticEvent } from 'react'
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
import RHFTextField from 'src/@core/components/hook-form/RHFTextField'
import UserContext from 'src/@core/context/userContext'
import FormProvider from 'src/@core/components/hook-form/FormProvider'
import RHFSelect from 'src/@core/components/hook-form/RHFSelect'
import { styled } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import { useSettings } from 'src/@core/hooks/useSettings'
import themeConfig from 'src/configs/themeConfig'

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
    const { settings } = useSettings()
    console.log(settings.direction, themeConfig.direction)
    const maritalStatusArray = ['مجرد', 'متاهل', 'متارکه']
    const housingStatusArray = ['استیجاری', 'شخصی']
    const theme = useTheme()
    const [maritalStatus, setMaritalStatus] = useState<string[]>([])
    const [housingStatus, setHousingStatus] = useState<string[]>([])
    const { data, setData, activeStep, setActiveStep } = useContext<any>(UserContext);
    console.log( data?.data, data, steps)

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

        return (
            <Box sx={{ mt: 6, display: 'flex', flexDirection: 'row-reverse' }}>
                <Button type='submit'
                    variant='contained'
                    color={'primary'}
                    startIcon={
                        <Icon style={{ marginLeft: 6 }}
                            icon={
                                'tabler:arrow-right'
                            }
                        />
                    }
                >
                    {'Next'}
                </Button>
            </Box>
        )
    }


    // Styled component for Accordion component
    const Accordion = styled(MuiAccordion)<AccordionProps>(({ theme }) => ({
        margin: 0,
        borderRadius: 0,
        boxShadow: 'none !important',
        border:
            theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
        '&:not(:last-of-type), &:last-child .MuiAccordionSummary-root:not(.Mui-expanded)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        },
        '&.Mui-expanded': {
            margin: 'auto'
        },
        '&:first-of-type': {
            '& .MuiButtonBase-root': {
                borderTopLeftRadius: theme.shape.borderRadius,
                borderTopRightRadius: theme.shape.borderRadius
            }
        },
        '&:last-of-type': {
            '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
                borderBottomLeftRadius: theme.shape.borderRadius,
                borderBottomRightRadius: theme.shape.borderRadius
            }
        }
    }))

    // Styled component for AccordionSummary component
    const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(({ theme }) => ({
        marginBottom: -1,
        padding: theme.spacing(0, 4),
        minHeight: theme.spacing(12),
        transition: 'min-height 0.15s ease-in-out',
        backgroundColor: theme.palette.action[theme.palette.mode === 'light' ? 'hover' : 'selected'],
        borderBottom:
            theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
        '&.Mui-expanded': {
            minHeight: theme.spacing(12)
        },
        '& .MuiAccordionSummary-content': {
            alignItems: 'center',
            '&.Mui-expanded': {
                margin: '13px 0'
            }
        },
        '& .MuiTypography-root': {
            fontWeight: 400
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
            color: theme.palette.text.secondary
        }
    }))

    // Styled component for AccordionDetails component
    const AccordionDetails = styled(MuiAccordionDetails)<AccordionDetailsProps>(({ theme }) => ({
        padding: `${theme.spacing(4)} !important`
    }))

    // ** State
    const [expanded, setExpanded] = useState<string | false>('panel1')

    const handleChangeA = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    const expandIcon = (value: string) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />



    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChangeA('panel1')}>
            <AccordionSummary
                id='customized-panel-header-1'
                expandIcon={expandIcon('panel1')}
                aria-controls='customized-panel-content-1'
            >
                <Icon fontSize='1.25rem' icon='tabler:user' color='red' />
                <Typography sx={{ ml: 2, color: 'red' }}>🚀مشخصات فردی</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'firstName'} label='نام' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'lastName'} label='نام خانوادگی' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'code'} label='شماره شناسنامه' placeholder='24' />
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
                            <RHFSelect name={'housingStatus'} label='وضعیت مسکن'
                                SelectProps={{
                                    multiple: false,
                                    value: housingStatus,
                                    onChange: (e: any) => handleChange(e as SelectChangeEvent<typeof housingStatus>),
                                    renderValue: (selected: any) => (
                                        <Box
                                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, }}
                                        >
                                            {(selected as string[]).map(value => (
                                                <CustomChip rounded key={value} label={value} skin='light' />
                                            ))}
                                        </Box>
                                    )
                                }}>
                                {housingStatusArray.map((housingStatus: any) => (
                                    <MenuItem key={housingStatus} value={housingStatus} sx={{ flexDirection: 'row-reverse' }}>
                                        {housingStatus}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'email'} label='آدرس الکترونیک' placeholder='john.doe@gmail.com' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'Mobile'} label='تلفن همراه' />
                        </Grid>
                    </Grid>
                    {renderFooter()}
                </FormProvider>
            </AccordionDetails>
        </Accordion>

    )
}

export default StepPersonalDetails
