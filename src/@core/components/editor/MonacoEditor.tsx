// components/MonacoEditor.tsx
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false // Evita a renderização do lado do servidor
})

export default MonacoEditor
