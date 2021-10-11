export default function DelegateAction(type: string) {
  return (data: any) => ({
    type,
    data,
  });
}