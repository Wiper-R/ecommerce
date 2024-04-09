'use client';

import { createUser } from '@/actions';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

function Loading() {
  const { pending } = useFormStatus();
  return pending && 'Loading....';
}

export default function Page() {
  const [state, dispatch, isPending] = useFormState(
    async (_: any, formdata: FormData) =>
      await createUser({
        firstName: formdata.get('firstName'),
        lastName: formdata.get('lastName'),
        password: formdata.get('password'),
        email: formdata.get('email')
      }),
    null
  );
  return (
    <form action={dispatch}>
      <div>
        <label>Firstname</label>
        <input type="text" name="firstName" />
      </div>
      <div>
        <label>Lastname</label>
        <input type="text" name="lastName" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" />
      </div>
      <button type="submit">Create User</button>

      <Loading />
      {state && 'errors' in state ? '' : state?.firstName}
    </form>
  );
}
