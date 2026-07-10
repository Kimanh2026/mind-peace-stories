import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n";

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[280px] rounded-[2.6rem] border border-forest/15 bg-pine p-2.5 shadow-lift ${className}`}
      role="img"
      aria-label="App screen preview"
    >
      <div className="absolute left-1/2 top-4 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-pine" />
      <div className="overflow-hidden rounded-[2.1rem] bg-paper">{children}</div>
    </div>
  );
}

function ScreenHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="bg-forest px-5 pb-4 pt-9 text-paper">
      <p className="text-[10px] uppercase tracking-widest text-sage">{sub}</p>
      <p className="font-display text-lg font-medium">{title}</p>
    </div>
  );
}

export function CoachScreen({ t }: { t: Dictionary }) {
  const vi = t.locale === "vi";
  return (
    <div className="flex h-[520px] flex-col">
      <ScreenHeader title="AI Coach" sub={vi ? "Luôn ở đây vì bạn" : "Here for you"} />
      <div className="flex-1 space-y-3 overflow-hidden px-3.5 py-4 text-[11.5px] leading-snug">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-forest px-3.5 py-2.5 text-paper">
          {t.home.coach.chat.userMsg}
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-forest/10 bg-white px-3.5 py-2.5 text-charcoal/90 shadow-soft">
          {t.home.coach.chat.aiMsg}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-3 py-2.5 text-[11px] font-medium text-forest">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-gold" />
          {t.home.coach.chat.action}
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-forest/10 px-3.5 py-3">
        <div className="h-8 flex-1 rounded-full bg-mist" />
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest">
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-paper" fill="currentColor" aria-hidden>
            <path d="M2 10l14-6-4 6 4 6z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function StoryScreen({ t }: { t: Dictionary }) {
  const s = t.home.stories.sample;
  const vi = t.locale === "vi";
  return (
    <div className="flex h-[520px] flex-col">
      <ScreenHeader title={vi ? "Chuyện hôm nay" : "Today's story"} sub={vi ? "2 phút" : "2 min"} />
      <div className="flex-1 space-y-3 px-4 py-4 text-[11.5px] leading-snug">
        <p className="font-display text-[15px] font-semibold text-forest">{s.title}</p>
        <p className="text-[10px] uppercase tracking-wider text-sagedeep">{s.source}</p>
        <p className="text-charcoal/85">{s.body}</p>
        <div className="rounded-xl border-l-4 border-gold bg-gold/10 px-3 py-2.5">
          <p className="font-medium text-forest">{s.wisdom}</p>
        </div>
        <p className="text-charcoal/75">{s.science}</p>
      </div>
      <div className="border-t border-forest/10 px-4 py-3">
        <div className="rounded-full bg-forest py-2 text-center text-[11px] font-semibold text-paper">
          {vi ? "Việc hôm nay của tôi" : "My action for today"}
        </div>
      </div>
    </div>
  );
}

export function DashboardScreen({ t }: { t: Dictionary }) {
  const vi = t.locale === "vi";
  const bars = [34, 52, 46, 68, 60, 82, 90];
  const days = vi ? ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] : ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="flex h-[520px] flex-col">
      <ScreenHeader title={vi ? "Gia đình mình" : "Our family"} sub={vi ? "Tuần này" : "This week"} />
      <div className="flex-1 space-y-3.5 px-4 py-4 text-[11.5px]">
        <div className="flex items-center justify-between rounded-xl border border-forest/10 bg-white p-3 shadow-soft">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-sagedeep">{vi ? "Chuỗi ngày" : "Streak"}</p>
            <p className="font-display text-xl font-semibold text-forest">{vi ? "12 ngày" : "12 days"}</p>
          </div>
          <div className="flex gap-1" aria-hidden>
            {[0.35, 0.5, 0.62, 0.74, 0.86, 1].map((o, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-forest" style={{ opacity: o }} />
            ))}
            <span className="h-2.5 w-2.5 rounded-full bg-gold" />
          </div>
        </div>
        <div className="rounded-xl border border-forest/10 bg-white p-3 shadow-soft">
          <p className="text-[10px] uppercase tracking-wider text-sagedeep">
            {vi ? "Phút kết nối mỗi tối" : "Connection minutes each evening"}
          </p>
          <div className="mt-2 flex h-20 items-end gap-1.5" aria-hidden>
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-md ${i === 6 ? "bg-gold" : "bg-sage"}`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[8px] text-charcoal/50">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-forest/10 bg-white p-3 shadow-soft">
          <p className="text-[10px] uppercase tracking-wider text-sagedeep">
            {vi ? "Thử thách: Làm mới giờ màn hình" : "Challenge: Gentle Screen Reset"}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist" aria-hidden>
            <div className="h-full w-[71%] rounded-full bg-forest" />
          </div>
          <p className="mt-1.5 text-[10px] text-charcoal/60">{vi ? "Ngày 5 / 7" : "Day 5 of 7"}</p>
        </div>
      </div>
    </div>
  );
}
