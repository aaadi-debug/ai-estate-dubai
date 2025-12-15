import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ children, variant = 'primary', className, ...props }) {
  const base = 'px-4 py-2 rounded-lg font-medium transition focus:outline-none';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
  };

  return (
    <button
      className={twMerge(clsx(base, variants[variant], className))}
      {...props}
    >
      {children}
    </button>
  );
}