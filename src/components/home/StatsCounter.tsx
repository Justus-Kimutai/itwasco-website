import { useEffect, useRef, useState } from "react";
import { companyStats } from "../../data/stats";
import { formatNumber } from "../../lib/utils";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl font-bold text-primary-600 sm:text-5xl">
      {formatNumber(count)}{suffix}
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Impact in Numbers
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Growing steadily to serve more communities across Elgeyo Marakwet County
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {companyStats.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <AnimatedCounter value={stat.value} suffix={stat.suffix} />

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {stat.label}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-secondary-600">6x growth</span> in connections since 2007
          </p>
        </div>
      </div>
    </section>
  );
}
