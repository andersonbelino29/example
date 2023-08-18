import React, { useState, createContext, useContext, useCallback, ReactNode } from 'react'

import DialogAlert from './DialogAlert'
import { DialogType } from './types'

type DialogOptions = {
  type: DialogType
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
}

interface DialogContextType {
  showDialog: (options: Omit<DialogOptions, 'onConfirm' | 'onCancel'> & { type: DialogType }) => Promise<void>
}

const DialogServiceContext = createContext<DialogContextType | undefined>(undefined)

interface DialogServiceProviderProps {
  children: ReactNode
}

export const DialogServiceProvider: React.FC<DialogServiceProviderProps> = ({ children }) => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null)

  const showDialog = useCallback((options: Omit<DialogOptions, 'onConfirm' | 'onCancel'> & { type: DialogType }) => {
    return new Promise<void>((resolve, reject) => {
      setDialogOptions({
        ...options,
        onConfirm: () => {
          resolve()
          setDialogOptions(null)
        },
        onCancel: () => {
          reject()
          setDialogOptions(null)
        }
      })
    })
  }, [])

  return (
    <DialogServiceContext.Provider value={{ showDialog }}>
      {children}
      {dialogOptions && <DialogAlert {...dialogOptions} />}
    </DialogServiceContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogServiceContext)
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogServiceProvider')
  }

  return context
}
