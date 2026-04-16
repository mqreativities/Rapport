import logoImg from 'figma:asset/b54f7aeabb890038b56286386005eeff25d86e68.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
}

export function Logo({ size = 'md', showText = true, textColor = '#0F172A' }: LogoProps) {
  const imgSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };
  const textSizes = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
  };

  return (
    <div className="flex items-center gap-2.5">
      <img src={logoImg} alt="Rapport logo" className={`${imgSizes[size]} object-contain`} />
      {showText && (
        <span
          style={{
            fontSize: textSizes[size],
            color: textColor,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          Rapport
        </span>
      )}
    </div>
  );
}
