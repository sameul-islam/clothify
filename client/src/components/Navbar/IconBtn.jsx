export default function IconBtn({
  onClick,
  label,
  children,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`
        relative
        flex
        items-center
        justify-center
        w-9
        h-9
        rounded-full
        text-[--text-primary]
        transition-colors
        duration-200
        hover:bg-black/5
        ${className}
      `}
    >
      {children}
    </button>
  );
}