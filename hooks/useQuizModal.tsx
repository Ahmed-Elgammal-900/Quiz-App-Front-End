import { useState, useCallback } from "react"

interface ModalData {
  title: string
  score: number | null
  questionsCount: number
  status: string | null
  passed: boolean | null
  timeInSeconds: number
  description: string
  quizId: string
}

export function useQuizModal() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<ModalData | null>(null)

  const openModal = useCallback((data: ModalData) => {
    setData(data)
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
    setData(null)
  }, [])

  return { open, data, openModal, closeModal }
}
