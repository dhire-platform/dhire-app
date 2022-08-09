import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function Redirect(to: string) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);
}
