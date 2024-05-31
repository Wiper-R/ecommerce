'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { LoginUserSchema } from '@/lib/validation/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { SubmitButton } from '@/components/submit-button';
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useSession } from '@/auth';
import { LoginSuccessAction } from './page';
import { loginUser } from '@/actions/auth';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { addProductToCart } from '@/actions/cart';

export default function LoginForm({ action }: { action?: LoginSuccessAction }) {
  const form = useForm<LoginUserSchema>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: { email: '', password: '' }
  });

  const router = useRouter();
  const { session, dispatch } = useSession();

  const onValid = async (data: LoginUserSchema) => {
    const result = await loginUser(data);
    if ('error' in result) {
      toast({ title: 'Error', description: result.error });
      return;
    }

    toast({ title: 'Success', description: 'Log in successful' });
    dispatch({ type: 'login_success', payload: result });

    // Handle Login Success actions
    if (action?.addToCart) {
      await addProductToCart(
        action.addToCart.productId,
        action.addToCart.amount
      );
      toast({ description: 'Added item to cart.' });
    }

    router.push(action?.redirectTo || '/');

    // Handle user data?
  };

  return (
    <Card className="max-w-[360px] w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Log in to existing account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onValid)} noValidate>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton className="mt-5">Log in</SubmitButton>
          </form>
        </Form>
        {form.formState.errors.root && (
          <span className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </span>
        )}
        <div className="text-sm mt-4">
          {"Don't have an account? "}
          <Link href="/signup" className={buttonVariants({ variant: 'link' })}>
            create one
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
