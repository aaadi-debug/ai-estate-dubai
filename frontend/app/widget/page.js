'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClientChatWidget } from '@/components/chat/ClientChatWidget';

// Wrapper component that uses search params
function WidgetContent() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get('agentId') || 'demo-agent-123';

  return <ClientChatWidget agentId={agentId} />;
}

// Main page component with Suspense boundary
export default function WidgetPage() {
  return (
    <Suspense fallback={<div>Loading widget...</div>}>
      <WidgetContent />
    </Suspense>
  );
}

// IMPORTANT: Force dynamic rendering (no static prerendering)
export const dynamic = 'force-dynamic';