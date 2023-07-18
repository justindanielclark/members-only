type Props = {
  title: string;
  text: string;
};
export default function ToastWithHeader({ title, text }: Props) {
  return (
    <div>
      <h1 className="font-bold underline underline-offset-2">{title}</h1>
      <p>{text}</p>
    </div>
  );
}
