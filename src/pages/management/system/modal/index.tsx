import { Ref, forwardRef, ReactElement, useRef } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Alert, AlertTitle, CircularProgress } from '@mui/material'

import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import { usePatchSystem, usePostSystem } from 'src/@core/hooks/useSystem'
import { SystemDataInterface } from 'src/@core/types/system.interface'

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogAddSystemProps {
  open: boolean
  action: string
  onClose: () => void
  onSubmit: () => void
  data: SystemDataInterface | null
}

const DialogAddSystem: React.FC<DialogAddSystemProps> = ({ open, onClose, action, onSubmit, data }) => {
  const formRef = useRef<FormHandles>(null)
  const postSystemMutate = usePostSystem()
  const mutationPatchSystem = usePatchSystem()

  const handleClose = () => {
    onClose()
  }

  /*useEffect(() => {
    if (open) {
      postSystemMutate.reset()
      mutationPatchSystem.reset()
    }
  }, [open, postSystemMutate.isError, mutationPatchSystem.isError])*/

  const handleSubmit: SubmitHandler<SystemDataInterface> = async formData => {
    try {
      postSystemMutate.reset()
      mutationPatchSystem.reset()
      if (formRef.current) {
        formRef.current.setErrors({})
      }

      const schema = Yup.object().shape({
        nome: Yup.string()
          .min(4, 'O nome da permissão deve ter pelo menos 6 caracteres')
          .required('O nome da permissão é obrigatório'),
        descricao: Yup.string()
          .min(4, 'A descrição da permissão deve ter pelo menos 6 caracteres')
          .required('A descrição da permissão é obrigatória'),
        assunto: Yup.string()
          .min(4, 'A assunto da permissão deve ter pelo menos 6 caracteres')
          .required('A assunto da permissão é obrigatória')
      })

      await schema.validate(formData, {
        abortEarly: false
      })

      if (action === 'create') {
        if (formData.id === 0) {
          delete formData.id
        }
        await handlePostSystem(formData)
      } else {
        await handlePatchSystem(formData)
      }
    } catch (err) {
      const validationErrors: { [key: string]: string } = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          if (error.path) {
            validationErrors[error.path] = error.message
          }
        })

        if (formRef.current) {
          formRef.current.setErrors(validationErrors)
        }
      }
    }
  }

  const handlePostSystem = async (formData: SystemDataInterface) => {
    try {
      await postSystemMutate.mutateAsync(formData)
      onSubmit()
    } catch (err) {
      if (postSystemMutate.isError) {
        return
      }
    }
  }

  const handlePatchSystem = async (formData: SystemDataInterface) => {
    try {
      await mutationPatchSystem.mutateAsync(formData)
      onSubmit()
    } catch (err) {
      if (mutationPatchSystem.isError) {
        return
      }
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='sm'
      scroll='body'
      onClose={handleClose}
      onBackdropClick={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <Form initialData={data ? data : undefined} ref={formRef} onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={handleClose}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              {data?.id ? 'Editar Categoria' : 'Criar Novo Categoria  '}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {data?.id ? 'Edite' : 'Cadastre'} o Categoria de acordo com seus requisitos.
            </Typography>
          </Box>
          {(mutationPatchSystem.isError || postSystemMutate.isError) && (
            <Alert severity='error' sx={{ maxWidth: '500px', mb: 3 }}>
              <AlertTitle>Ops, algo deu errado!</AlertTitle>
              {mutationPatchSystem.isError
                ? mutationPatchSystem.mutateError?.errors[0]?.message
                : postSystemMutate.mutateError?.errors[0]?.message}
            </Alert>
          )}
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} display={'none'}>
                  <CustomTextField
                    fullWidth
                    name='id'
                    type='number'
                    id='form-props-number'
                    InputLabelProps={{ shrink: true }}
                    autoComplete='off'
                    label='id'
                    placeholder='id'
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <CustomTextField
                    fullWidth
                    name='name'
                    autoComplete='off'
                    label='Descrição do Categoria'
                    placeholder='Descrição do Categoria'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          {action != 'view' && (
            <Button
              type='submit'
              variant='contained'
              sx={{ mr: 1 }}
              disabled={postSystemMutate.isLoading || mutationPatchSystem.isLoading}
            >
              {postSystemMutate.isLoading || mutationPatchSystem.isLoading ? (
                <CircularProgress size={24} />
              ) : data?.id ? (
                'Atualizar'
              ) : (
                'Cadastrar'
              )}
            </Button>
          )}
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default DialogAddSystem
