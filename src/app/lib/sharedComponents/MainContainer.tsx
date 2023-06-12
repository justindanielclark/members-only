type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MainContainer({ children, className }: Props) {
  const containerClasses = ["max-w-3xl", "lg:max-w-6xl", "mx-auto"];
  if (className) {
    const addedClasses = className.split(" ");
    containerClasses.push(...addedClasses);
  }
  return (
    <main className="flex-1 bg-slate-800 overflow-x-hidden">
      <div className={containerClasses.join(" ")}>{children}</div>
    </main>
  );
}
