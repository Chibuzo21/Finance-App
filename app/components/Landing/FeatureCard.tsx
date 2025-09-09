import { motion } from "framer-motion";
export default function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className='rounded-3xl border border-slate-200 text-green-100 dark:text-[#17332d] dark:bg-[#e1d9d9] bg-[#17332d] p-6 shadow-sm hover:shadow-md transition-shadow'>
      <div className='h-10 w-10 rounded-2xl bg-white dark:bg-[#17332d] grid place-items-center mb-4 dark:text-green-100 text-[#17332d]'>
        {icon}
      </div>
      <h3 className='font-semibold text-lg'>{title}</h3>
      <p className='mt-1.5 text-sm '>{desc}</p>
    </motion.div>
  );
}
