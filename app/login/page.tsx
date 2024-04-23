import { FormContainer } from '@/components/containers/form-container';
import SignUpForm from './login-form';

export default function Page({
  searchParams
}: {
  searchParams?: { action?: string };
}) {
  return (
    <FormContainer>
      <SignUpForm
        action={
          searchParams?.action &&
          JSON.parse(decodeURIComponent(searchParams?.action))
        }
      />
    </FormContainer>
  );
}

export type LoginSuccessAction = {
  addToCart: { productId: string; amount: number };
};
