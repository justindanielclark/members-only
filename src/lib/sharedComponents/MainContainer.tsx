type Props = {
  children: React.ReactNode;
  className?: string;
};

export const mainContainerDefaultClasses = "flex-1 grow bg-slate-800 overflow-x-hidden";

export default function MainContainer({ children, className }: Props) {
  const containerClasses = [];
  if (className) {
    const addedClasses = className.split(" ");
    containerClasses.push(...addedClasses);
  }
  return (
    <main className={mainContainerDefaultClasses}>
      <div className={"max-w-6xl mx-auto p-4" + " " + containerClasses.join(" ")}>{children}</div>
    </main>
  );
}

export function SubMainContainer({ children, className }: Props) {
  const containerClasses = [];
  if (className) {
    const addedClasses = className.split(" ");
    containerClasses.push(...addedClasses);
  }
  return <div className={"max-w-3xl lg:max-w-6xl mx-auto" + " " + containerClasses.join(" ")}>{children}</div>;
}
