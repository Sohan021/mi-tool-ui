import Providers from "../store/reducers/provider";

export const metadata = {
  title: "Mi-Tool",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
