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

  return <ChatWidget agentId="69406fcf735f39e09b0ea297" />;
}