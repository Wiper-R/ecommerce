import { User } from '@prisma/client';

export type Session = {
  user: User | null;
};

export type SessionAction =
  | { type: 'logout' | 'login_failed' }
  | { type: 'login_success'; payload: User };

export type SessionStateKind = 'loading' | 'authenticated' | 'unauthenticated';

export type TSession = Session | undefined | null;

export type SessionContext = {
  session: SessionState;
  dispatch: React.Dispatch<SessionAction>;
};

export type SessionState = {
  data?: Session | undefined | null;
  state: SessionStateKind;
};
