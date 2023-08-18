import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Typography,
  InputAdornment,
  Button,
  CardActions,
  MenuItem,
  SelectChangeEvent,
  Tab,
  Box,
  Link,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useRouter } from 'next/router'
import Breadcrumb from 'src/@core/components/breadcrumb/Breadcrumb'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import { SyntheticEvent, useState } from 'react'

interface SocialAccountsType {
  title: string
  logo: string
  username?: string
  isConnected: boolean
}

const socialAccountsArr: SocialAccountsType[] = [
  {
    title: 'Facebook',
    isConnected: false,
    logo: '/images/logos/facebook.png'
  },
  {
    title: 'Twitter',
    isConnected: true,
    username: '@Pixinvent',
    logo: '/images/logos/twitter.png'
  },
  {
    title: 'Instagram',
    isConnected: true,
    username: '@Pixinvent',
    logo: '/images/logos/instagram.png'
  },
  {
    title: 'Dribbble',
    isConnected: false,
    logo: '/images/logos/dribbble.png'
  },
  {
    title: 'Behance',
    isConnected: false,
    logo: '/images/logos/behance.png'
  }
]

const PartnerActionPage = () => {
  const router = useRouter()
  const { partnerId, action } = router.query
  console.log(partnerId)
  const title =
    action === 'create' ? 'Cadastrar Novo Cliente' : action === 'view' ? 'Visualizar Cliente' : 'Editar Cliente'
  const breadcrumbItems = [{ title: 'Cadastros' }, { title: 'Clientes' }, { title: title }]
  const [language, setLanguage] = useState<string[]>([])
  const [value, setValue] = useState<string>('config-partner')

  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  return (
    <>
      <Breadcrumb title={title} breadcrumbItems={breadcrumbItems} returnIcon={true} />
      <Card>
        <CardHeader title='Dados do Cliente' />
        <Divider sx={{ m: '0 !important' }} />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Identificação
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField fullWidth label='partnerName' placeholder='partnerName' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField fullWidth type='cnpj' label='cnpj' placeholder='cnpj' />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Endereço
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField fullWidth label='Cep' placeholder='Cep' />
              </Grid>
              <Grid item xs={12} sm={8}>
                <CustomTextField fullWidth label='address' placeholder='address' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField fullWidth label='city' placeholder='city' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField fullWidth label='state' placeholder='state' />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Contato
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='carterleonard@gmail.com'
                  helperText='You can use letters, numbers & periods'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:mail' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  type='number'
                  label='Phone No.'
                  placeholder='123-456-7890'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon fontSize='1.25rem' icon='tabler:phone' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Configurações
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TabContext value={value}>
                  <TabList
                    variant='scrollable'
                    scrollButtons='auto'
                    onChange={handleTabsChange}
                    sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
                  >
                    <Tab
                      value='config-partner'
                      label='Acesso'
                      icon={<Icon fontSize='1.125rem' icon='tabler:access-point' />}
                    />
                    <Tab
                      value='config-notification'
                      label='Notificações'
                      icon={<Icon fontSize='1.125rem' icon='tabler:bell' />}
                    />
                    <Tab value='config-access' label='Conexão' icon={<Icon fontSize='1.125rem' icon='tabler:link' />} />
                  </TabList>
                  <form onSubmit={e => e.preventDefault()}>
                    <CardContent>
                      <TabPanel sx={{ p: 0 }} value='config-partner'>
                        <Grid container spacing={5}>
                          <Grid item xs={12} sm={6}>
                            <CustomTextField fullWidth label='wskey' placeholder='wskey' />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <CustomTextField fullWidth label='urldomain' placeholder='urldomain' />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <CustomTextField
                              select
                              fullWidth
                              label='deployedFlag'
                              id='form-layouts-tabs-select'
                              defaultValue=''
                            >
                              <MenuItem value='UK'>Ativo</MenuItem>
                              <MenuItem value='USA'>USA</MenuItem>
                              <MenuItem value='Australia'>Australia</MenuItem>
                              <MenuItem value='Germany'>Germany</MenuItem>
                            </CustomTextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <CustomTextField
                              select
                              fullWidth
                              defaultValue=''
                              label='activeFlag'
                              id='form-layouts-tabs-multiple-select'
                              SelectProps={{
                                multiple: true,
                                value: language,
                                onChange: e => handleSelectChange(e as SelectChangeEvent<string[]>)
                              }}
                            >
                              <MenuItem value='English'>English</MenuItem>
                              <MenuItem value='French'>French</MenuItem>
                              <MenuItem value='Spanish'>Spanish</MenuItem>
                              <MenuItem value='Portuguese'>Portuguese</MenuItem>
                              <MenuItem value='Italian'>Italian</MenuItem>
                              <MenuItem value='German'>German</MenuItem>
                              <MenuItem value='Arabic'>Arabic</MenuItem>
                            </CustomTextField>
                          </Grid>
                        </Grid>
                      </TabPanel>

                      <TabPanel sx={{ p: 0 }} value='config-access'>
                        <Grid item xs={12}>
                          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                            Display content from social accounts on your site
                          </Typography>

                          {socialAccountsArr.map(account => {
                            return (
                              <Box
                                key={account.title}
                                sx={{
                                  gap: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  '&:not(:last-of-type)': { mb: 4 }
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box sx={{ mr: 4, minWidth: 57, display: 'flex', justifyContent: 'center' }}>
                                    <img src={account.logo} alt={account.title} height='38' />
                                  </Box>
                                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='h6'>{account.title}</Typography>
                                    {account.isConnected ? (
                                      <Typography
                                        href='/'
                                        component={Link}
                                        onClick={e => e.preventDefault()}
                                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                                      >
                                        {account.username}
                                      </Typography>
                                    ) : (
                                      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                                        Not Connected
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                                <Button
                                  variant='tonal'
                                  sx={{ p: 2, minWidth: 38 }}
                                  color={account.isConnected ? 'error' : 'secondary'}
                                >
                                  <Icon icon={account.isConnected ? 'tabler:trash' : 'tabler:link'} />
                                </Button>
                              </Box>
                            )
                          })}
                        </Grid>
                      </TabPanel>

                      <TabPanel sx={{ p: 0 }} value='config-notification'>
                        <Grid item xs={12}>
                          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                            You will receive notification for the below selected items.
                          </Typography>
                          <TableContainer
                            sx={{
                              borderRadius: '6px !important',
                              border: theme => `1px solid ${theme.palette.divider}`
                            }}
                          >
                            <Table sx={{ minWidth: 500 }}>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Type</TableCell>
                                  <TableCell align='center'>Email</TableCell>
                                  <TableCell align='center'>Browser</TableCell>
                                  <TableCell align='center'>App</TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody
                                sx={{ '& .MuiTableRow-root:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                              >
                                <TableRow>
                                  <TableCell sx={{ fontSize: theme => theme.typography.body1.fontSize }}>
                                    New for you
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox defaultChecked />
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox defaultChecked />
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox defaultChecked />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell sx={{ fontSize: theme => theme.typography.body1.fontSize }}>
                                    Account activity
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox defaultChecked />
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox defaultChecked />
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox defaultChecked />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell sx={{ fontSize: theme => theme.typography.body1.fontSize }}>
                                    A new browser used to sign in
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox defaultChecked />
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox defaultChecked />
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox />
                                  </TableCell>
                                </TableRow>
                                <TableRow sx={{ '& .MuiTableCell-root': { border: 0 } }}>
                                  <TableCell sx={{ fontSize: theme => theme.typography.body1.fontSize }}>
                                    A new device is linked
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox defaultChecked />
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox />
                                  </TableCell>
                                  <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Checkbox />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </TabPanel>
                    </CardContent>
                  </form>
                </TabContext>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions>
            <Button type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button type='reset' variant='tonal' color='secondary'>
              Reset
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  )
}

export default PartnerActionPage
