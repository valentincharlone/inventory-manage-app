"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  confirmMessage?: string;
  title?: string;
};

export function ConfirmDelete({ id, action, confirmMessage, title }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="destructive"
          aria-label="Open delete confirmation"
          className="cursor-pointer"
        >
          Delete
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="space-y-1">
            <Dialog.Title className="text-lg font-semibold">
              {title || "Delete product"}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              {confirmMessage ||
                "Are you sure you want to delete this product? This action cannot be undone."}
            </Dialog.Description>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2">
            <Dialog.Close asChild>
              <Button
                type="button"
                variant="ghost"
                disabled={submitting}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </Dialog.Close>

            <form
              action={async (formData: FormData) => {
                // This calls the passed server action on the server.
                setSubmitting(true);
                try {
                  await action(formData);
                  router.refresh();
                } finally {
                  setOpen(false);
                  setSubmitting(false);
                }
              }}
            >
              <Input type="hidden" name="id" value={id} />
              <Button
                variant="destructive"
                type="submit"
                disabled={submitting}
                className="cursor-pointer"
              >
                {submitting ? "Deleting…" : "Confirm"}
              </Button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
