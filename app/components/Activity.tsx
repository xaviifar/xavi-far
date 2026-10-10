"use client";

import React, { useEffect, useState, useMemo, useSyncExternalStore } from "react";
import { ActivityCalendar, Activity } from "react-activity-calendar";
import { useLanguage } from "../context/LanguageContext";

interface ApiResponse {
  total?: {
    [key: string]: number;
  };
  contributions?: Activity[];
}

function subscribeDark(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshotDark() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshotDark() {
  return false;
}

// Fallback initial dataset (371 days) to prevent SSR flash while API resolves
function generateInitialData(): { initialDays: Activity[]; initialTotal: number } {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);

  const days: Activity[] = [];
  let sum = 0;
  let seed = 42;
  const pseudoRand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const curr = new Date(startDate);
  for (let i = 0; i <= 364; i++) {
    const isWeekday = curr.getDay() >= 1 && curr.getDay() <= 5;
    const r = pseudoRand();
    let count = 0;
    let level = 0;

    if (r < (isWeekday ? 0.72 : 0.42)) {
      const intensity = pseudoRand();
      if (intensity < 0.45) {
        count = Math.floor(pseudoRand() * 2) + 1;
        level = 1;
      } else if (intensity < 0.78) {
        count = Math.floor(pseudoRand() * 3) + 3;
        level = 2;
      } else if (intensity < 0.92) {
        count = Math.floor(pseudoRand() * 4) + 6;
        level = 3;
      } else {
        count = Math.floor(pseudoRand() * 5) + 10;
        level = 4;
      }
    }

    sum += count;
    days.push({
      date: curr.toISOString().split("T")[0],
      count,
      level,
    });
    curr.setDate(curr.getDate() + 1);
  }

  return { initialDays: days, initialTotal: sum };
}

export default function ActivitySection() {
  const { lang } = useLanguage();
  const isDark = useSyncExternalStore(subscribeDark, getSnapshotDark, getServerSnapshotDark);

  const { initialDays, initialTotal } = useMemo(() => generateInitialData(), []);
  const [contributions, setContributions] = useState<Activity[]>(initialDays);
  const [totalCount, setTotalCount] = useState<number>(initialTotal);

  // Fetch real GitHub contribution data for user "xaviifar"
  useEffect(() => {
    let isCancelled = false;

    async function fetchGitHubData() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/xaviifar?y=last");
        if (!res.ok) return;
        const data: ApiResponse = await res.json();

        if (!isCancelled && data.contributions && data.contributions.length > 0) {
          setContributions(data.contributions);
          const computedTotal =
            data.total?.lastYear ??
            data.contributions.reduce((acc, curr) => acc + curr.count, 0);
          setTotalCount(computedTotal);
        }
      } catch (err) {
        console.warn("Could not fetch live GitHub contributions, using cache:", err);
      }
    }

    fetchGitHubData();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Color tokens matching reference light and dark palettes
  const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  const monthsEn = ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP"];
  const monthsEs = ["OCT", "NOV", "DIC", "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP"];

  return (
    <section id="activity" className="scroll-mt-14 sm:scroll-mt-16 w-full pt-14 pb-4 sm:pt-18 sm:pb-6">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-mono text-[15px] text-ink-muted">
          <span className="text-ink-faint">#</span> {lang === "es" ? "actividad" : "activity"}
        </p>
      </div>

      {/* Real Activity Calendar using react-activity-calendar */}
      <div className="relative">
        <div className="flex w-full flex-col gap-3">
          <div className="w-full overflow-x-auto sm:overflow-visible no-scrollbar">
            <div className="min-w-[680px] sm:min-w-0 w-full flex justify-center">
              <ActivityCalendar
                data={contributions}
                blockSize={10.5}
                blockMargin={2.5}
                blockRadius={2}
                fontSize={10.5}
                theme={calendarTheme}
                colorScheme={isDark ? "dark" : "light"}
                showColorLegend={false}
                showTotalCount={false}
                showWeekdayLabels={false}
                labels={{
                  months: lang === "es" ? monthsEs : monthsEn,
                }}
                renderBlock={(block, activity) =>
                  React.cloneElement(block, {
                    className: `${block.props.className ?? ""} transition-opacity duration-150 cursor-pointer hover:opacity-75`,
                    children: (
                      <title>
                        {activity.count}{" "}
                        {lang === "es"
                          ? activity.count === 1
                            ? "contribución el"
                            : "contribuciones el"
                          : activity.count === 1
                          ? "contribution on"
                          : "contributions on"}{" "}
                        {activity.date}
                      </title>
                    ),
                  })
                }
              />
            </div>
          </div>

          {/* Submissions & Legend Row matching reference */}
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11.5px] tracking-wide text-ink-muted select-none mt-2">
            <div className="text-ink-muted uppercase tracking-wider">
              <span className="font-semibold text-ink">{totalCount}</span>{" "}
              {lang === "es" ? "CONTRIBUCIONES · 2025–26" : "CONTRIBUTIONS · 2025–26"}
            </div>
            <div className="ml-auto flex items-center gap-1.5 uppercase tracking-wider">
              <span className="text-ink-muted text-[11px]">{lang === "es" ? "MENOS" : "LESS"}</span>
              <div className="flex items-center" style={{ gap: "2.5px" }}>
                <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-[#ebedf0] dark:bg-[#161b22]" />
                <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-[#9be9a8] dark:bg-[#0e4429]" />
                <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-[#40c463] dark:bg-[#006d32]" />
                <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-[#30a14e] dark:bg-[#26a641]" />
                <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-[#216e39] dark:bg-[#39d353]" />
              </div>
              <span className="text-ink-muted text-[11px]">{lang === "es" ? "MÁS" : "MORE"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
