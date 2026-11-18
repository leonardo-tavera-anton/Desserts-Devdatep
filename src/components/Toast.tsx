export interface ToastMessage {
  type: 'success' | 'error';
  message: string;
}

interface ToastProps extends ToastMessage {
  onClose: () => void;
}

export function Toast({ type, message, onClose }: ToastProps) {
  const isError = type === 'error';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      className={`fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-4 rounded-lg border-l-4 bg-white px-5 py-4 shadow-lg ${
        isError ? 'border-red-600 text-red-800' : 'border-green-600 text-green-800'
      }`}
    >
      <p className="text-sm font-semibold">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar notificacion"
        className="ml-auto rounded px-2 py-1 text-lg leading-none hover:bg-rose-50"
      >
        &times;
      </button>
    </div>
  );
}
