const dibujos = {
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M4 8h16M3 12h18M4 16h16" /></>,
  search: <><circle cx="10.8" cy="10.8" r="5.8" /><path d="m15 15 4.2 4.2" /></>,
  moon: <path d="M20.8 14.6A8.8 8.8 0 0 1 9.4 3.2a9 9 0 1 0 11.4 11.4Z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4" /></>,
  check: <path d="m5 12 4 4L19 6" />,
}

function Icon({ name }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {dibujos[name]}
    </svg>
  )
}

export default Icon
