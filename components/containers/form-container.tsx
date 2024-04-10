import { PropsWithChildren } from 'react';

export function FormContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center flex-grow py-10">
      {children}
    </div>
  );
}
