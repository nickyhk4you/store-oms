import { NextPage } from 'next';

declare module 'next' {
  export type NextPageWithParams<P = {}, IP = P> = NextPage<P, IP> & {
    params?: any;
  };
} 