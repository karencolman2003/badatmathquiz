import Link from "next/link";
import { getButtonClassName } from "@/components/ui/Button";
import { questions } from "@/lib/questions";
import { trapTypes } from "@/lib/types";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[620px] px-6 py-16 md:px-8 md:py-20">
      <div className="space-y-12">
        <section>
          <h1 className="font-serif text-[34px] font-normal leading-[1.15] text-[#1a1a18] md:text-[44px]">
            bad at math quiz
          </h1>
          <div className="mt-2 text-[12px] text-[#888880]">
            reasoning traps disguised as easy math
          </div>
        </section>

        <section className="border-t border-[#d8d5ce] pt-4">
          <div className="mb-4 text-[11px] lowercase tracking-[0.08em] text-[#888880]">about</div>
          <div className="space-y-3 text-[13px] text-[#1a1a18]">
            <p>
              Every question looks straightforward until wording, assumptions, units, and overconfidence get involved.
            </p>
            <p>
              This is not a speed test. It is a test of whether you notice when your brain answers before you have actually finished reading.
            </p>
          </div>
        </section>

        <section className="border-t border-[#d8d5ce] pt-4">
          <div className="mb-4 text-[11px] lowercase tracking-[0.08em] text-[#888880]">start</div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/quiz" className={getButtonClassName("primary")}>
              start quiz
            </Link>
            <span className="text-[12px] text-[#888880]">{questions.length} starter questions</span>
          </div>
        </section>

        <section className="border-t border-[#d8d5ce] pt-4">
          <div className="mb-4 text-[11px] lowercase tracking-[0.08em] text-[#888880]">included trap types</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-[#888880]">
            {trapTypes.map((trapType) => (
              <span key={trapType}>{trapType.replaceAll("_", " ")}</span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
