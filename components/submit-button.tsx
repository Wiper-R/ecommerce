import React from 'react';
import { Button, ButtonProps } from './ui/button';
import { useFormState } from 'react-hook-form';
import { Loader2Icon } from 'lucide-react';

const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'type'>
>(({ children, ...props }, ref) => {
  const formState = useFormState();
  return (
    <Button {...props} type="submit" ref={ref}>
      {formState.isSubmitting && (
        <span className="mr-2">
          <Loader2Icon className="animate-spin" />
        </span>
      )}
      {children}
    </Button>
  );
});

SubmitButton.displayName = 'SubmitButton';

export { SubmitButton };
