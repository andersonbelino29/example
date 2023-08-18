import React, { Fragment, forwardRef, Ref, ReactElement } from 'react'
import Button from '@mui/material/Button'
import Fade, { FadeProps } from '@mui/material/Fade'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { Dialog, DialogContent, DialogActions, Typography, Box } from '@mui/material'

import Icon from 'src/@core/components/icon'

import { DialogType } from './types'

type ConfirmDialogProps = {
  type: DialogType
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

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

const ImageIllustration = styled('img')(() => ({
  zIndex: 2,
  maxHeight: 128
}))

const DialogAlert: React.FC<ConfirmDialogProps> = ({ type, title, description, onConfirm, onCancel }) => {
  let IconComponent
  let TitleComponent
  switch (type) {
    case DialogType.Confirm:
      IconComponent = <ImageIllustration alt='confirm-illustration' src={`/images/dialogsAlerts/confirmedDialog.svg`} />
      TitleComponent = (
        <Typography variant='h3' sx={{ mb: 3 }}>
          {title}
        </Typography>
      )
      break
    case DialogType.Cancel:
      IconComponent = <ImageIllustration alt='confirm-illustration' src={`/images/dialogsAlerts/cancelDialog.svg`} />
      TitleComponent = (
        <Typography variant='h3' sx={{ mb: 3 }}>
          {title}
        </Typography>
      )
      break
    case DialogType.Error:
      IconComponent = <ImageIllustration alt='confirm-illustration' src={`/images/dialogsAlerts/errorDialog.svg`} />
      TitleComponent = (
        <Typography variant='h3' sx={{ mb: 3 }}>
          {title}
        </Typography>
      )
      break
    case DialogType.Success:
      IconComponent = <ImageIllustration alt='confirm-illustration' src={`/images/dialogsAlerts/sucessDialog.svg`} />
      TitleComponent = (
        <Typography variant='h3' sx={{ mb: 3 }}>
          {title}
        </Typography>
      )
      break
    case DialogType.Question:
      IconComponent = <ImageIllustration alt='confirm-illustration' src={`/images/dialogsAlerts/questionDialog.svg`} />
      TitleComponent = (
        <Typography variant='h3' sx={{ mb: 3 }}>
          {title}
        </Typography>
      )
      break
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        open={true}
        maxWidth='sm'
        scroll='body'
        onClose={onCancel}
        onBackdropClick={onCancel}
        TransitionComponent={Transition}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={onCancel}>
            {' '}
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>{IconComponent}</Box>
          <Box sx={{ mb: 4, textAlign: 'center' }}>{TitleComponent}</Box>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h6' sx={{ mb: 3 }}>
              {description}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button
            type='submit'
            variant='contained'
            sx={{ mr: 1 }}
            color={type == DialogType.Error ? 'error' : 'primary'}
            onClick={onConfirm}
          >
            {type === DialogType.Question ? 'Sim' : 'Ok'}
          </Button>
          {type === DialogType.Question && (
            <Button variant='tonal' color='secondary' onClick={onCancel}>
              Não
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogAlert
