interface TechTagProps {
  children: string;
}

/**
 * Reusable tech tag component
 * Consistent styling for technology badges across sections
 */
export function TechTag({ children }: TechTagProps) {
  return (
    <span className="px-3 py-1 rounded-full text-xs text-gray-300 bg-white/5 border border-white/10">
      {children}
    </span>
  );
}
