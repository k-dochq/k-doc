import { type Dictionary } from 'shared/model/types';
import { ArticleSection } from '../terms-of-service/ui/ArticleSection';

interface ReservationPolicyContentProps {
  dict: Dictionary;
}

export function ReservationPolicyContent({ dict }: ReservationPolicyContentProps) {
  const p = dict.reservationPolicy;

  return (
    <div className='min-w-0 px-5 pt-8 pb-20'>
      <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>
        {dict.footer.reservationPolicy}
      </h1>

      <div className='flex min-w-0 flex-col gap-10'>
        <ArticleSection title={p.section1.title}>
          <div className='flex flex-col gap-4 text-base leading-6 font-normal text-neutral-700'>
            <p>{p.section1.p1}</p>
            <p>{p.section1.p2}</p>
            <p>{p.section1.p3}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section2.title}>
          <div className='flex flex-col gap-3 text-base leading-6 font-normal text-neutral-700'>
            {p.section2.items.map((item: string, i: number) => (
              <p key={i}>- {item}</p>
            ))}
            <p className='mt-1'>{p.section2.note}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section3.title}>
          <div className='flex flex-col gap-3 text-base leading-6 font-normal text-neutral-700'>
            <p>{p.section3.p1}</p>
            <p>{p.section3.intro}</p>
            <ul className='ml-4 flex flex-col gap-1'>
              {p.section3.items.map((item: string, i: number) => (
                <li key={i}>- {item}</li>
              ))}
            </ul>
            <p>{p.section3.p2}</p>
            <p>{p.section3.p3}</p>
            <p>{p.section3.p4}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section4.title}>
          <div className='flex flex-col gap-3 text-base leading-6 font-normal text-neutral-700'>
            <p>{p.section4.p1}</p>
            <p>{p.section4.intro}</p>
            <ul className='ml-4 flex flex-col gap-1'>
              {p.section4.items.map((item: string, i: number) => (
                <li key={i}>- {item}</li>
              ))}
            </ul>
            <p>{p.section4.p2}</p>
            <p>{p.section4.p3}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section5.title}>
          <div className='flex flex-col gap-3 text-base leading-6 font-normal text-neutral-700'>
            {p.section5.items.map((item: string, i: number) => (
              <p key={i}>- {item}</p>
            ))}
            <p className='mt-1'>{p.section5.note}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section6.title}>
          <div className='flex flex-col gap-4 text-base leading-6 font-normal text-neutral-700'>
            <p>{p.section6.intro}</p>

            <div className='overflow-hidden rounded-lg border border-neutral-200'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-neutral-200 bg-neutral-50'>
                    <th className='px-4 py-3 text-left font-semibold text-neutral-700'>
                      {p.section6.tableHeaderTiming}
                    </th>
                    <th className='border-l border-neutral-200 px-4 py-3 text-left font-semibold text-neutral-700'>
                      {p.section6.tableHeaderRate}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { timing: p.section6.row1Timing, rate: p.section6.row1Rate },
                    { timing: p.section6.row2Timing, rate: p.section6.row2Rate },
                    { timing: p.section6.row3Timing, rate: p.section6.row3Rate },
                    { timing: p.section6.row4Timing, rate: p.section6.row4Rate },
                  ].map((row, i) => (
                    <tr key={i} className='border-b border-neutral-100 last:border-0'>
                      <td className='px-4 py-3 text-neutral-700'>{row.timing}</td>
                      <td className='border-l border-neutral-200 px-4 py-3 font-medium text-neutral-700'>
                        {row.rate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>{p.section6.p1}</p>
            <p>{p.section6.p2}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section7.title}>
          <div className='flex flex-col gap-3 text-base leading-6 font-normal text-neutral-700'>
            <p>{p.section7.p1}</p>
            <p>{p.section7.intro}</p>
            <ul className='ml-4 flex flex-col gap-1'>
              {p.section7.items.map((item: string, i: number) => (
                <li key={i}>- {item}</li>
              ))}
            </ul>
            <p>{p.section7.p2}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section8.title}>
          <div className='flex flex-col gap-3 text-base leading-6 font-normal text-neutral-700'>
            {p.section8.items.map((item: string, i: number) => (
              <p key={i}>- {item}</p>
            ))}
            <p className='mt-1'>{p.section8.note1}</p>
            <p>{p.section8.note2}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section9.title}>
          <div className='flex flex-col gap-3 text-base leading-6 font-normal text-neutral-700'>
            <p>{p.section9.intro}</p>
            <ul className='ml-4 flex flex-col gap-1'>
              {p.section9.items.map((item: string, i: number) => (
                <li key={i}>- {item}</li>
              ))}
            </ul>
            <p>{p.section9.p1}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section10.title}>
          <div className='flex flex-col gap-3 text-base leading-6 font-normal text-neutral-700'>
            <p>{p.section10.p1}</p>
            <p>{p.section10.p2}</p>
            <p>{p.section10.p3}</p>
            <p className='mt-2 font-medium'>{p.section10.effectiveDate}</p>
            <p>{p.section10.p4}</p>
          </div>
        </ArticleSection>

        <ArticleSection title={p.section11.title}>
          <p className='text-base leading-6 font-normal text-neutral-700'>{p.section11.p1}</p>
        </ArticleSection>
      </div>
    </div>
  );
}
