'use client';

import { PropsWithChildren, createContext, useEffect, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/actions/auth';
import { SessionAction, type SessionContext, SessionState } from '../types';

const initialState: SessionState = {
  state: 'loading'
};

const sessionReducer = (
  state: SessionState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case 'login_success':
      return {
        ...state,
        data: { user: action.payload },
        state: 'authenticated'
      };

    case 'login_failed':
    case 'logout':
      return {
        ...state,
        data: { user: null },
        state: 'unauthenticated'
      };
  }
};

const SessionContext = createContext<SessionContext | null>(null);

const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatch] = useReducer(sessionReducer, initialState);

  const { data, isFetched } = useQuery({
    queryFn: async () => await getCurrentUser(),
    queryKey: ['user']
  });

  useEffect(() => {
    if (!isFetched) return;
    if (data) {
      dispatch({ type: 'login_success', payload: data });
    } else {
      dispatch({ type: 'login_failed' });
    }
  }, [data, isFetched]);

  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext };
