export default function Toast({ toast }) {
  if (!toast?.message) return null;
  return <div className={`toast toast-${toast.type || 'info'}`}>{toast.message}</div>;
}
