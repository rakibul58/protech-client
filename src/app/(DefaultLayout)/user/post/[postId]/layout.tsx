export default function layout({
  children,
  comments,
}: {
  children: React.ReactNode;
  comments: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {comments}
    </div>
  );
}
