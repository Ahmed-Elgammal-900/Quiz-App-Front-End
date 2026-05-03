import type { ModalData } from "@/types/quiz-modal-hook.types"
import { useState, useCallback } from "react"

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
