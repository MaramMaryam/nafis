import { useState, ChangeEvent, useEffect, useMemo, useContext, SyntheticEvent } from 'react'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Box, Divider } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import RHFTextField from 'src/@core/components/hook-form/RHFTextField'
import UserContext from 'src/@core/context/userContext'
import FormProvider from 'src/@core/components/hook-form/FormProvider'
import { styled } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import {  GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CustomTable from 'src/@core/components/tables/BasicTables'
import {nanoid} from 'nanoid'

const CompeleteStep = ({ steps, isEdit, isLoading, onNext,  }: any) => {
    const { data, setData, activeStep, setActiveStep } = useContext<any>(UserContext);
    console.log( data?.data, data, steps)
    const [compeleteDatas, setCompeleteData] = useState<any>()
const [rowId, setRowId] = useState<any>()

    const renderDelete = (params?:any) => {

        return (
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button 
                // type='submit'
                onClick={() => console.log(rows.filter((row:any) => row.id !== rowId))}
                // onChange={deleteRow}
                    variant='contained'
                    color={'error'}
                >
                    {'-'}
                </Button>
            </Box>
        )
    }
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
    const last_update = new Date()
    const defaultValues = 
    useMemo(
        () => ({
            id: '',
            //   activeStep, 
            last_update,
            name: '',
            nesbat: '',
            job: '',
            address: '',
            tel: '',
            // action: renderDelete(),
            // delete: ''
            // renderDelete()
        }),
        []
    );
    const rows: GridRowsProp = [
        {
            id: 1,
            name: <RHFTextField name={`name`} />,
            nesbat: <RHFTextField name={'nesbat'} />,
            job: <RHFTextField name={'job'} />,
            address: <RHFTextField name={'address'} />,
            tel: <RHFTextField name={'tel'} />,
            action: <>{renderFooter()}</>,
        },
    ];

    const columns: GridColDef[] = [
        { field: `name`, headerName: 'نام و نام خانوادگی', width: 110 },
        { field: 'nesbat', headerName: 'نسبت', width: 110 },
        { field: 'job', headerName: 'شغل', width: 110 },
        { field: 'address', headerName: 'آدرس محل سکونت', width: 110 },
        { field: 'tel', headerName: 'تلفن', width: 110 },
          { 
            field: 'action',
            headerName: 'عملیات',
            },
    ];
    const [row, setRow] = useState<any>(rows);
    console.log(row)
    useEffect(()=>{
        console.log(rowId)
    if(data){
        console.log(data,compeleteDatas)
    }
    },[])
    async function getApiData() {
        const res = await fetch('/api/getInfos', { method: 'GET' });
        const data = await res.json();
        console.log(...data, ...row)
        if (data) {
            setData((prev: any) => ({
                ...prev,
                data,
        }))
    console.log(...data, ...row)
        setRow((prevRows:any) => [...prevRows, ...data]); 
        }
    }

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

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
        mode: "all"
    });

    const {
        handleSubmit, control,
        formState: { isSubmitting, errors },
    } = methods

    const onSubmit = async (compeleteData:any) => {
        console.log(row,'compeleteData:',compeleteData,row, compeleteData.id)
        compeleteData.id = nanoid(),
        console.log(row,'compeleteData:',compeleteData,row, compeleteData.id)
        const compeleteDatas={
            ...compeleteData, 
            id: nanoid(),
            action:  <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button 
            // type='submit'
            onClick={() => {console.log(compeleteDatas.id)
                setRow((rows:any) => rows.filter((row:any) => row.id !== compeleteDatas.id))}}
                variant='contained'
                color={'error'}
            >
                {'-'}
            </Button>
        </Box>
        }
        console.log(compeleteDatas)
       
        setCompeleteData(compeleteDatas)
        // setData((prev:any)=> [...prev, compeleteDatas] )
        setRow((prev:any)=>[...prev, compeleteDatas]); 
        // setRowId((prev:any)=>compeleteDatas.id)
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
                    <CustomTable columns={columns} rows={row} />
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