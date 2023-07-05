type Props = {
  children: React.ReactNode;
  id?: string;
};
export default function SectionContainer({ children, id }: Props) {
  return (
    <section className="mx-2 mt-4 last:mb-4" id={id ? id : undefined}>
      {children}
    </section>
  );
}
