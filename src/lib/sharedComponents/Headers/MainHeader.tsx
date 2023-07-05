type Props = {
  children: React.ReactNode;
};
export default function MainHeader({ children }: Props) {
  return <h1 className="font-bold text-3xl underline">{children}</h1>;
}
