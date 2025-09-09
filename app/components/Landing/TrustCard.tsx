export default function TrustCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className='rounded-3xl border border-slate-200 dark:bg-[#e1d9d9] p-6 shadow-sm bg-[#17332d] dark:text-[#17332d] text-green-100'>
      <h3 className='font-semibold '>{title}</h3>
      <p className='mt-1.5 text-sm '>{desc}</p>
    </div>
  );
}
