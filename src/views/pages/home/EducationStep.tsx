import { useState, ChangeEvent, useEffect, useMemo, useContext, SyntheticEvent } from 'react'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Box, CardContent, CardContentProps, Divider, TextField } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material/Select'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
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
import { GridRowsProp } from '@mui/x-data-grid';
import CustomTable from 'src/@core/components/tables/BasicTables'
import { nanoid } from 'nanoid'
import RHFDateField from 'src/@core/components/hook-form/RHFDateField'
import { formatDate } from 'src/@core/utils/format'
import format from 'date-fns/format';

const EducationStep = ({ allPosts, steps, isEdit, isLoading, onNext, }: any) => {
    console.log(allPosts)
    const { data } = useContext<any>(UserContext);
    console.log(data?.data, data, steps)
    const [edueDatas, setEduData] = useState<any>()
    const [rowId, setRowId] = useState<any>()
    const gradeArray = ['دیپلم', 'فوق دیپلم', 'لیسانس', 'فوق لیسانس', 'دکتری و بالاتر']
    const fieldArray = ['نرم افزار', 'شبکه', 'آی تی', 'سخت افزار', 'برنامه نویسی']

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
                last_update,
                grade: '',
                field: '',
                fromDate: '',
                toDate: '',
                address: '',
                score: '',
            }),
            []
        );
    const [grade, setGrade] = useState<string[]>([])
    const [field, setField] = useState<string[]>([])

    const handleChange = (event: SelectChangeEvent<typeof grade>) => {
        const {
            target: { value }
        } = event
        setGrade(typeof value === 'string' ? value.split(',') : value)
    }
    const handleChangefld = (event: SelectChangeEvent<typeof field>) => {
        const {
            target: { value }
        } = event
        setField(typeof value === 'string' ? value.split(',') : value)
    }
    const rows: GridRowsProp = [
        {
            id: 1,
            grade: <RHFSelect name={'grade'} SelectProps={{
                multiple: false,
                value: grade,
                onChange: (e: any) => handleChange(e as SelectChangeEvent<typeof grade>),
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
                {gradeArray.map((grade: any) => (
                    <MenuItem key={grade} value={grade} sx={{ flexDirection: 'row-reverse' }}>
                        {grade}
                    </MenuItem>
                ))}
            </RHFSelect>,
            field: <RHFSelect name={'field'} SelectProps={{
                multiple: false,
                value: field,
                onChange: (e: any) => handleChangefld(e as SelectChangeEvent<typeof field>),
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
                {fieldArray.map((field: any) => (
                    <MenuItem key={field} value={field} sx={{ flexDirection: 'row-reverse' }}>
                        {field}
                    </MenuItem>
                ))}
            </RHFSelect>,
            fromDate: <RHFDateField name={'fromDate'} />,
            toDate: <RHFDateField name={'toDate'} />,
            address: <RHFTextField name={'address'} />,
            score: <RHFTextField name={'score'} />,
            action: <>{renderFooter()}</>,
        },
    ];

    const columns = [
        { field: `grade`, headerName: 'مقطع تحصیلی', width: 110 },
        { field: 'field', headerName: 'رشته تحصیلی', width: 110 },
        { field: 'fromDate', headerName: 'از تاریخ', width: 110 },
        { field: 'toDate', headerName: 'تا تاریخ', width: 110 },
        { field: 'address', headerName: 'آدرس', width: 110 },
        { field: 'score', headerName: 'معدل', width: 110 },
        {
            field: 'action',
            headerName: 'عملیات',
        },
    ];
    const [row, setRow] = useState<any>(rows);

    useEffect(() => {
        console.log(rowId)
        if (data) {
            console.log(data, edueDatas)
        }
    }, [])

    const schema = yup.object().shape({
        grade: yup.string().required(),
        field: yup.string().required(),
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

    const onSubmit = async (edueData: any) => {
        edueData.id = nanoid()

        const edueDatas = {
            ...edueData,
            id: nanoid(),
            fromDate: format(edueData.fromDate, 'MM/dd/yyyy'),
            toDate: format(edueData.toDate, 'MM/dd/yyyy'),
            action: <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button
                    onClick={() => {
                        console.log(edueData.id)
                        setRow((rows: any) => rows.filter((row: any) => row.id !== edueDatas.id))
                    }}
                    variant='contained'
                    color={'error'}
                >
                    {'-'}
                </Button>
            </Box>
        }
        console.log(edueDatas)

        setEduData(edueDatas)
        setRow((prev: any) => [...prev, edueDatas]);
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

    const [expanded, setExpanded] = useState<string | false>('panel3')

    const handleChangeA = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }
    const expandIcon = (value: string) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />

    return (
        <Accordion expanded={expanded === 'panel3'} onChange={handleChangeA('panel3')}>
            <AccordionSummary
                id='customized-panel-header-3'
                expandIcon={expandIcon('panel3')}
                aria-controls='customized-panel-content-3'
            >
                <Icon fontSize='1.25rem' icon='tabler:user' color='red' />
                <Typography sx={{ ml: 2, color: 'red' }}>🚀مشخصات تحصیلی</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography sx={{ color: 'green' }}>
                    سوابق تحصیلی
                </Typography>
                <Divider sx={{ backgroundColor: 'green', my: 2, mb: 2 }} />
                <Box sx={{ my: 5 }}>
                    <Typography>
                        کاربر گرامی، لطفااطلاعات مربوط به مشخصات تحصیلی(در صورت تاهل، مشخصات همسر و فرزندان و سپس والدین) را وارد نموده، سپس دکمه ثبت را کلیک نمایید.
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

export default EducationStep
