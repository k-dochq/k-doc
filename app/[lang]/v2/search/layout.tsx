interface SearchV2LayoutProps {
  children: React.ReactNode;
}

export default function SearchV2Layout({ children }: SearchV2LayoutProps) {
  return (
    <div className='min-h-screen overflow-x-clip bg-white'>
      <main>{children}</main>
    </div>
  );
}
