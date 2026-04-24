"use client"
import type { CompleteModalProps } from "@/types/quiz.types"
import { Button } from "../../system/button"
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../system/dialog"

export default function CompleteModal({
  isFinished,
  onFinish,
}: CompleteModalProps) {
  return (
    <>
      <Dialog open={isFinished} onOpenChange={() => {}}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>
              Completion
            </DialogTitle>
            <DialogDescription>
              congrats you finished quiz go to see your record
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={onFinish}>Go</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
