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

export default function TimeoutModal({
  isFinished,
  onFinish,
}: CompleteModalProps) {
  return (
    <>
      <Dialog open={isFinished} onOpenChange={() => {}}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Timeout</DialogTitle>
            <DialogDescription>
              your time is out go to check your result
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
