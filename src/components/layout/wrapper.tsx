import Footer from "./footer";
import Header from "./header";

export default function WrapperLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-1 sm:py-10 px-1 ">
      <div className="flex flex-col items-center justify-center lg:w-256 ml-auto mr-auto min-h-screen">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
