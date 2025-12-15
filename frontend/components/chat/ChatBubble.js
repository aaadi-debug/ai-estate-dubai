import { clsx } from 'clsx';

export function ChatBubble({ message, isBot = false }) {
  return (
    <div
      className={clsx(
        'max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-sm',
        isBot
          ? 'bg-gray-100 text-gray-900 rounded-bl-none'
          : 'bg-blue-600 text-white ml-auto rounded-br-none'
      )}
    >
      <p className="text-sm leading-relaxed">{message}</p>
    </div>
  );
}