// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const Home = () => {
  return (
    <Grid container spacing={6} >
      <Grid item xs={12}>
        <Card>
          <CardHeader sx={{ '& .css-x8z8fw-MuiTypography-root': { color: 'red' } }} title='🚀مشخصات فردی'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}></Typography>

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader sx={{ '& .css-x8z8fw-MuiTypography-root': { color: 'red' } }} title='🔒مشخصات تکمیلی'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>

            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader  title='🔒سوابق تحصیلی'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>

            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
