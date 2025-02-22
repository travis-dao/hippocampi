'use client';

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

import { useState } from 'react';

export default function Billing() {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Subscription</CardTitle>
          <CardDescription>Access your billing details and manage your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleManageSubscription} disabled={isLoading}>
            {isLoading ? "Loading..." : "Access Customer Portal"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}