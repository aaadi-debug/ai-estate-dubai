'use client';

import { useEffect, useState } from 'react';
import { ChatWidget } from './ChatWidget';

export function ClientChatWidget({ agentId }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a placeholder floating button
  }

  return <ChatWidget agentId={agentId} />;
}