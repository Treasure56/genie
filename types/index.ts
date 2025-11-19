export type ActionResponse<T = unknown> = {
  error?: string,
  success?: string,
  data?: T,
  fieldErrors?: Record<string, string[]>;
}
export type AppLayoutProps = Readonly<{ children: React.ReactNode }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppPageProps<T = any, K = unknown> = { params?: Promise<T>, searchParams?: Promise<K> };

export type AppPageError = {
  error: Error & { digest?: string },
  reset: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ANY = any;