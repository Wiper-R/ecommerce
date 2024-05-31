export default function Page({
  searchParams
}: {
  searchParams: {
    orderId: string;
  };
}) {
  return <div>{searchParams.orderId}</div>;
}
