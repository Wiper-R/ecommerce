'use client';

import { createUser, loginUser } from '@/actions/auth';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubmitButton } from '@/components/submit-button';
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export default function LoginForm() {
  const form = useForm<LoginUserSchema>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: { email: '', password: '' }
  });

  const onValid = async (data: LoginUserSchema) => {
    const result = await loginUser(data);
    if ('error' in result) {
      toast({ title: 'Error', description: result.error });
      return;
    }

    toast({ title: 'Success', description: 'Log in successfull' });

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
      </CardContent>
    </Card>
  );
}
