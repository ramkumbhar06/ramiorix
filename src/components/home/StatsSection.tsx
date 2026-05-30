// src/components/home/StatsSection.tsx
// Stats counter section — shows key platform numbers

const stats = [
  { value: "12,000+", label: "Active Jobs" },
  { value: "800+", label: "Companies Hiring" },
  { value: "5,000+", label: "Interview Q&As" },
  { value: "50,000+", label: "Career Seekers" },
];

export default function StatsSection() {
  return (
    <section className="border-b border-neutral-100 bg-white">
      <div className="container-custom py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl text-neutral-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
