// frontend/app/widget/page.js
'use client';

import { useSearchParams } from 'next/navigation';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { ClientChatWidget } from '@/components/chat/ClientChatWidget';

export default function WidgetPage() {
    const searchParams = useSearchParams();
    const agentId = searchParams.get('agentId') || '69406fcf735f39e09b0ea297';

    //   return (
    //     <div className="fixed inset-0 bg-transparent overflow-hidden pointer-events-none">
    //       <div className="pointer-events-auto fixed bottom-0 right-0 m-4">
    //         <ChatWidget agentId={agentId} />
    //       </div>
    //     </div>
    //   );
    return <ClientChatWidget agentId={agentId} />;
}