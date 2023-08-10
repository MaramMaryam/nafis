import { useState, ChangeEvent, useEffect, useMemo, useContext, SyntheticEvent } from 'react'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { CustomRadioIconsData, CustomRadioIconsProps } from 'src/@core/components/custom-radio/types'
import { Box, CardContent, CardContentProps, Divider } from '@mui/material'
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
import TableBasic from 'src/@core/components/tables/BasicTables'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CustomTable from 'src/@core/components/tables/BasicTables'
import { GridProps } from '@mui/system'


const CompeleteStep = ({ allPosts, steps, isEdit, isLoading, onNext }: any) => {
    const theme = useTheme()
    console.log(allPosts)
    const { data, setData, activeStep, setActiveStep } = useContext<any>(UserContext);
    console.log(data?.data?.personalData, data?.data, data, steps)
    const [compeleteData, setCompeleteData] = useState<any>([])

      useEffect(() => {
        async function getApiData() {
            const res = await fetch('/api/getInfos', { method: 'GET' });
            const data = await res.json();
            if (data) {
                setData((prev: any) => ({
                    ...prev,
                    data: data,
                }))
            }
            console.log(data)
        }
        getApiData();
    }, [setData]);

    const renderFooter = () => {

        return (
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button type='submit'
                    variant='contained'
                    color={'success'}

                >
                    {'تایید'}
                </Button>
            </Box>
        )
    }
    const rows: GridRowsProp = [
        {
            // id: 1,
            col1: <RHFTextField name={'name'} />,
            col2: <RHFTextField name={'nesbat'} />,
            col3: <RHFTextField name={'job'} />,
            col4: <RHFTextField name={'address'} />,
            col5: <RHFTextField name={'tel'} />,
            col6: <>{renderFooter()}</>,
        },
    ];
    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'نام و نام خانوادگی', width: 110 },
        { field: 'col2', headerName: 'نسبت', width: 110 },
        { field: 'col3', headerName: 'شغل', width: 110 },
        { field: 'col4', headerName: 'آدرس محل سکونت', width: 110 },
        { field: 'col5', headerName: 'تلفن', width: 110 },
        { field: 'col6', headerName: 'عملیات', width: 110 },
    ];

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
        job: yup.string().required(),
        name: yup
            .string()
            .min(3, obj => showErrors('name', obj.value.length, obj.min))
            .required(),
        nesbat: yup
            .string()
            .min(3, obj => showErrors('nesbat', obj.value.length, obj.min))
            .required()
    })

    const last_update = new Date()
    const defaultValues = useMemo(
        () => ({
            //   activeStep, 
            last_update,
            name: '',
            nesbat: '',
            job: '',
            address: '',
            tel: '',
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
        mode: "all"
    });

    const {
        handleSubmit, control,
        formState: { isSubmitting, errors },
    } = methods

    const onSubmit = async (compeleteData: any) => {
        console.log(compeleteData)
        let res = await fetch("/api/infos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: compeleteData
            }),
          });
        //   res = await res.json();
          console.log(res.status)
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

    const AccordionDetails = styled(MuiAccordionDetails)<AccordionDetailsProps>(({ theme }) => ({
        padding: `${theme.spacing(4)} !important`
    }))

    const [expanded, setExpanded] = useState<string | false>('panel2')

    const handleChangeA = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    const expandIcon = (value: string) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />
    const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
        padding: theme.spacing(1),
        '& .repeater-wrapper + .repeater-wrapper': {
            marginTop: theme.spacing(8)
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: theme.spacing(10)
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(6)
        }
    }))
    const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
        paddingRight: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        '& .col-title': {
            top: '-2.375rem',
            position: 'absolute'
        },
        [theme.breakpoints.down('md')]: {
            '& .col-title': {
                top: '0',
                position: 'relative'
            }
        }
    }))
    return (
        <Accordion expanded={expanded === 'panel2'} onChange={handleChangeA('panel2')}>
            <AccordionSummary
                id='customized-panel-header-2'
                expandIcon={expandIcon('panel2')}
                aria-controls='customized-panel-content-2'
            >
                <Icon fontSize='1.25rem' icon='tabler:user' color='red' />
                <Typography sx={{ ml: 2, color: 'red' }}>🚀مشخصات تکمیلی</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography sx={{ color: 'green' }}>
                    مشخصات خانوادگی:
                </Typography>
                <Divider sx={{ backgroundColor: 'green', my: 2, mb: 2 }} />
                <Box sx={{ my: 5 }}>
                    <Typography>
                        کاربر گرامی، لطفااطلاعات مربوط به مشخصات خانوادگی(در صورت تاهل، مشخصات همسر و فرزندان و سپس والدین) را وارد نموده، سپس دکمه ثبت را کلیک نمایید.
                    </Typography>
                    <Typography>
                        در صورت مشاهده خطا در اطلاعات وارد شده پس از ثبت آن، می توانید ردیف مورد نظر را حذف کرده و دوباره آن را ثبت کنید.
                    </Typography>
                </Box>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <CustomTable columns={columns} rows={rows} />
                    {
                        compeleteData && (<CustomTable />)
                    }
                </FormProvider>
            </AccordionDetails>
        </Accordion>
    )
}

export default CompeleteStep

// export async function getServerSideProps(context:any) {
//     let res = await fetch("http://localhost:3000/api/infos", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     let allPosts = await res.json();
  
//     return {
//       props: { allPosts },
//     };
//   }