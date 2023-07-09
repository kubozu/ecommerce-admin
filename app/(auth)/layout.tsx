export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center w-full h-full justify-center">
      {children}
    </div>
  );
}
