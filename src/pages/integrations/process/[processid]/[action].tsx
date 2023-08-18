import {
  Accordion,
  Typography,
  Divider,
  AccordionDetails,
  Grid,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  AccordionSummary
} from '@mui/material'
import React, { useState, SyntheticEvent } from 'react'
import Breadcrumb from 'src/@core/components/breadcrumb/Breadcrumb'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import MonacoEditor from 'src/@core/components/editor/MonacoEditor'
import { useRouter } from 'next/router'
import CustomChip from 'src/@core/components/mui/chip'
import DialogAddSegment from './components/modal'
import { SegmentDataInterface } from 'src/@core/types/segment.interface'

const actionSegmentEnum = {
  UPDATE: 'update',
  CREATE: 'create',
  VIEW: 'view'
} as const

type ActionTypeSegment = (typeof actionSegmentEnum)[keyof typeof actionSegmentEnum]

const ProcessItem = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1')
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [actionSegmente, setActionSegmente] = useState<ActionTypeSegment>(actionSegmentEnum.CREATE)
  const router = useRouter()
  const { processid, action } = router.query
  const title =
    action === 'create' ? 'Cadastrar Novo Processo' : action === 'view' ? 'Visualizar Processo' : 'Editar Processo'
  const breadcrumbItems = [{ title: 'Integrações' }, { title: 'Processos' }, { title: title }]
  const [fields, setFields] = useState([{ id: Date.now(), paramValue: '', paramName: '', paramType: '' }])

  const addField = () => {
    console.log('addField')
    setFields(prevFields => [...prevFields, { id: Date.now(), paramValue: '', paramName: '', paramType: '' }])
    console.log(fields)
  }

  const removeField = (id: number) => {
    console.log(fields)
    setFields(prevFields => prevFields.filter(field => field.id !== id))
  }

  const handleSegmentAction = (rowData: SegmentDataInterface | null, action: ActionTypeSegment) => {
    setActionSegmente(action)
    setEditDialogOpen(!editDialogOpen)
  }

  const handleEditSegment = (id: number) => {
    console.log(id)
    handleSegmentAction(null, actionSegmentEnum.UPDATE)
  }

  const handleDialogToggle = () => {
    console.log('handleDialogToggle')
    setEditDialogOpen(!editDialogOpen)
  }

  const handlesubmit = () => {
    console.log('handleDialogToggle')
    setEditDialogOpen(!editDialogOpen)
  }

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      <Breadcrumb title={title} breadcrumbItems={breadcrumbItems} returnIcon={true} />
      <div>
        Ação: {action} para o parceiro com ID: {processid}
      </div>
      <Card>
        <CardHeader title='Dados do Processo' />
        <Divider sx={{ m: '0 !important' }} />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Identificação
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField fullWidth label='identificador' placeholder='identificador' />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField fullWidth label='process_name' placeholder='process_name' />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField select fullWidth label='type' id='form-layouts-separator-select' defaultValue=''>
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </CustomTextField>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Origem
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField select fullWidth label='Parceiro' id='form-layouts-separator-select' defaultValue=''>
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField select fullWidth label='Cliente' id='form-layouts-separator-select' defaultValue=''>
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Destino
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Api destino'
                  id='form-layouts-separator-select'
                  defaultValue=''
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
        </form>
      </Card>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<Icon icon='tabler:chevron-down' />}
          id='form-layouts-collapsible-header-1'
          aria-controls='form-layouts-collapsible-content-1'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            SQL / API
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: '0 !important' }} />
        <AccordionDetails>
          <Grid container spacing={5} alignItems='center'>
            {/* Chip à esquerda */}
            <Grid item xs={6} sm={10} container justifyContent='flex-start'>
              <CustomChip
                rounded
                size='small'
                skin='light'
                color={'info'}
                label={'Systema1'}
                sx={{ ml: '6px', mb: '6px' }}
              />
              <CustomChip
                rounded
                size='small'
                skin='light'
                color={'info'}
                label={'Systema1'}
                sx={{ ml: '6px', mb: '6px' }}
              />
              <CustomChip
                rounded
                size='small'
                skin='light'
                color={'info'}
                label={'Systema1'}
                sx={{ ml: '6px', mb: '6px' }}
              />
            </Grid>

            {/* Campo de seleção à direita */}
            <Grid item xs={6} sm={2} container justifyContent='flex-end' pr={6} pb={6}>
              <CustomTextField select fullWidth label='System' id='form-layouts-separator-select' defaultValue=''>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </CustomTextField>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Divider sx={{ mb: '0 !important' }} />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #0000'
                }}
              >
                <MonacoEditor
                  height='40vh'
                  defaultLanguage='sql'
                  defaultValue='{"propertyName": "value"}'
                  theme='vs-dark'
                  options={{
                    cursorStyle: 'line',
                    formatOnPaste: true,
                    formatOnType: true,
                    wordWrap: true,
                    renderIndentGuides: true,
                    automaticLayout: true,
                    validate: true
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<Icon icon='tabler:chevron-down' />}
          id='form-layouts-collapsible-header-1'
          aria-controls='form-layouts-collapsible-content-1'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            Parâmetros
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: '0 !important' }} />
        <AccordionDetails>
          <Grid container spacing={5}>
            {fields.map(field => (
              <React.Fragment key={field.id}>
                <Grid item xs={12} sm={3}>
                  <CustomTextField fullWidth label='ParamName' placeholder='ParamName' />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField fullWidth label='ParamType' placeholder='ParamType' />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField fullWidth label='ParamValue' placeholder='ParamValue' />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <div className='demo-space-x'>
                    <Button
                      variant='contained'
                      color='info'
                      onClick={() => handleEditSegment(field.id)}
                      startIcon={<Icon icon='tabler:edit' />}
                    >
                      edit
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      startIcon={<Icon icon='tabler:trash' />}
                      onClick={() => removeField(field.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12} sm={12}>
              <Button
                variant='contained'
                sx={{ mr: 2 }}
                color='success'
                onClick={addField}
                startIcon={<Icon icon='tabler:layout-grid-add' />}
              >
                add
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<Icon icon='tabler:chevron-down' />}
          id='form-layouts-collapsible-header-1'
          aria-controls='form-layouts-collapsible-content-1'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            Horários
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: '0 !important' }} />
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <RadioGroup row aria-label='payment method' name='account-settings-billing-radio'>
                  <FormControlLabel
                    value='interval'
                    control={<Radio />}
                    label='Intervalo'
                    sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  />
                  <FormControlLabel
                    value='hour'
                    control={<Radio />}
                    label='Horário'
                    sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  />
                  <FormControlLabel
                    value='Dayofmonth'
                    label='Dia Do Mês'
                    control={<Radio />}
                    sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  />
                  <FormControlLabel
                    value='cod'
                    label='dayoftheweek'
                    control={<Radio />}
                    sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <DialogAddSegment
        data={null}
        open={editDialogOpen}
        action={actionSegmente}
        onClose={handleDialogToggle}
        onSubmit={handlesubmit}
      />
    </>
  )
}

export default ProcessItem
