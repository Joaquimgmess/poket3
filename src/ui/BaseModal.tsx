import { cn } from "~/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/solid";
import * as Dialog from "@radix-ui/react-dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { ComponentProps, ReactNode, forwardRef } from "react";

interface Props extends DialogProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  subTitle?: string;
  trigger?: ReactNode;
}

export function BaseModal({
  children,
  trigger,
  title,
  subTitle,
  open,
  onClose,
  onOpenChange,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 flex max-h-screen items-center justify-center bg-neutral-700/50 px-4 py-9">
          <Dialog.Content
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
            className="relative z-50 max-h-full min-w-[80vw] overflow-y-auto rounded-xl bg-white p-4 md:min-w-[30rem] lg:min-w-[40rem] xl:max-w-6xl"
          >
            <div className="flex w-full justify-between">
              {title && (
                <Dialog.Title className="text-primary mb-4 flex flex-col gap-2 text-base font-bold xl:text-[20px]">
                  {title}
                </Dialog.Title>
              )}

              <Dialog.Close onClick={() => onClose && onClose()} asChild>
                <XMarkIcon className="text-error h-6 w-6 cursor-pointer" />
              </Dialog.Close>
            </div>
            {subTitle && (
              <small className="text-primary text-sm font-light leading-5">
                {subTitle}
              </small>
            )}
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const BaseTrigger = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={cn(
          "text-alt-light hover:text-alt-lighter text-[14px] font-bold transition-colors",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

BaseTrigger.displayName = "BaseModal.Trigger";

BaseModal.Trigger = BaseTrigger;
