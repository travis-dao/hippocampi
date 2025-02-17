'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '~/components/loading/page';

export default function SuccessPage() {
  const [status, setStatus] = useState('loading');
  const [customerEmail, setCustomerEmail] = useState('');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchSessionStatus();
    }
  }, [sessionId]);

  async function fetchSessionStatus() {
    const response = await fetch('/api/check-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    const { session, error } = await response.json();

    if (error) {
      setStatus('failed');
      console.error(error);
      return;
    }

    setStatus(session.status);
    setCustomerEmail(session.customer_email);
  }

  if (status === 'loading') {
    return <Loading />
  }

  if (status === 'failed') {
    return <div>Failed to process payment. Please try again.</div>;
  }

  return (
    <div>
      <h1>Subscription Successful!</h1>
      <p>Thank you for your purchase. A confirmation email has been sent to {customerEmail}.</p>
    </div>
  );
}