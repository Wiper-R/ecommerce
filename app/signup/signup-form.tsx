'use client';

import { createUser } from '@/actions/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { CreateUserSchema } from '@/lib/validation/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubmitButton } from '@/components/submit-button';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function SignUpForm() {
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: { email: '', password: '', firstName: '', lastName: '' }
  });

  const onValid = async (data: CreateUserSchema) => {
    const result = await createUser(data);
    if ('error' in result) {
      toast({ title: 'Error', description: result.error });
      return;
    }

    toast({
      title: 'Success',
      description: 'Sign up successful, you can now login'
    });
  };
  return (
    <Card className="max-w-[360px] w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Create a new account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onValid)} noValidate>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
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
            <SubmitButton className="mt-5">Create Account</SubmitButton>
          </form>
        </Form>
        <div className="text-sm mt-4">
          Already have an account?{' '}
          <Link href="/login" className={buttonVariants({ variant: 'link' })}>
            login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
