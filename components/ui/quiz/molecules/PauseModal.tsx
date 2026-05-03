"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/system/dialog"
import { Button } from "@/components/ui/system/button"
import { useState } from "react"
import { Pause } from "lucide-react"
import { PauseModalProps } from "@/types/quiz.types"

export default function PauseModal({
  onPause,
  setTimerPaused,
}: PauseModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        className="hover:cursor-pointer"
        onClick={() => {
          setOpen(true)
          setTimerPaused(true)
        }}
        aria-label="Pause quiz"
      >
        <Pause aria-hidden="true" focusable="false" />
      </Button>

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          setTimerPaused(isOpen)
        }}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Pause</DialogTitle>
            <DialogDescription>Are you sure to Pause quiz?</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false)
                setTimerPaused(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={onPause}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
