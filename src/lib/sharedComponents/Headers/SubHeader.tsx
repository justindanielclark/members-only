type Props = {
  children: React.ReactNode;
};
export default function SubHeader({ children }: Props) {
  return <h1 className="font-bold text-2xl bg-slate-900 p-4">{children}</h1>;
}
