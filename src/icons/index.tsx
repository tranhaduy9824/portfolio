export const HeaderLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      id="header-logo-svg"
      viewBox="0 0 56 61"
      xmlns="http://www.w3.org/2000/svg"
      height="60"
      width="56"
      className={className}
    >
      <defs>
        <path
          id="logo-path"
          d="M3 14L24 2C28 0 28 0 32 2L53 14C56 16 56 17 56 19L56 43C56 46 55 47 51 49L32 59C28 61 28 61 24 59L5 49C1 47 0 46 0 43L0 19C0 17 0 16 3 14M28 4L5 17L28 28L51 17L28 4M53 20L30 31L30 56L53 44L53 20M40 42L33 35C33 35 32 34 33 33C34 32 35 33 36 34L36 34L43 41C44 42 44 42 43 43L35 51C35 51 34 52 33 51C32 50 33 49 33 49L40 42M16 42L23 35C23 35 24 34 23 33C22 32 21 33 20 34L13 41C12 42 12 42 13 43L21 51C21 51 22 52 23 51C24 50 23 49 23 49L16 42"
        ></path>
        <clipPath id="logo-clip-path">
          <use fill="white" href="#logo-path" transform="scale(0.87)"></use>
        </clipPath>
      </defs>
      <g clipPath="url(#logo-clip-path)">
        <rect width="100%" height="100%" fill="currentColor" />
      </g>
    </svg>
  );
};
