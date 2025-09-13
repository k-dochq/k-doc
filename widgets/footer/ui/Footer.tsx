import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className='flex flex-col items-start justify-start gap-4 bg-neutral-100 px-5 pt-5 pb-16'>
      {/* K-DOC 로고 */}
      <div className='h-4 w-[61px]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='61'
          height='16'
          viewBox='0 0 61 16'
          fill='none'
        >
          <path
            d='M0 15.7273V0.454545H3.92646V6.48715L8.5062 0.454545H12.6826L7.89284 6.37279L13.4087 15.6019H9.23227L5.59462 9.53066L3.92646 11.494V15.7273H0Z'
            fill='#A3A3A3'
          />
          <path d='M11.8034 9.18182V6.63636H17.8467V9.18182H11.8034Z' fill='#A3A3A3' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M24.7789 0.385653C26.474 0.385655 27.8704 0.704086 28.9681 1.34091C30.0797 1.96326 30.8996 2.84613 31.4276 3.98952C31.9695 5.11845 32.2404 6.45002 32.2404 7.9842C32.2404 9.5039 31.9695 10.8355 31.4276 11.9789C30.8996 13.1078 30.0797 13.9907 28.9681 14.6276C27.8704 15.2644 26.474 15.5827 24.7789 15.5827H19.7142V0.385653H24.7789ZM24.1327 9.05176C22.9797 9.05177 22.045 9.95151 22.045 11.0613C22.045 12.1712 22.9797 13.0708 24.1327 13.0708C25.2857 13.0708 26.2204 12.1712 26.2204 11.0613C26.2204 9.95151 25.2857 9.05176 24.1327 9.05176Z'
            fill='#A3A3A3'
          />
          <path
            d='M55.7674 16C54.7482 16 53.7864 15.8342 52.882 15.5026C51.9776 15.171 51.1737 14.6736 50.4702 14.0104C49.7812 13.3333 49.2357 12.5043 48.8337 11.5233C48.4461 10.5285 48.2523 9.38169 48.2523 8.0829C48.2523 6.79793 48.4533 5.65803 48.8553 4.66321C49.2716 3.65458 49.8314 2.80484 50.5348 2.11399C51.2526 1.42314 52.0709 0.8981 52.9896 0.538859C53.9084 0.17962 54.8774 0 55.8966 0C56.9446 0 57.8777 0.200346 58.6959 0.601036C59.5286 1.00173 60.2176 1.4715 60.7631 2.01036L58.7605 4.37306C58.3586 4.01382 57.9351 3.72366 57.4901 3.50259C57.0451 3.28152 56.5354 3.17098 55.9612 3.17098C55.2722 3.17098 54.6405 3.36442 54.0663 3.7513C53.4921 4.12435 53.0327 4.67012 52.6882 5.3886C52.358 6.09326 52.1929 6.94991 52.1929 7.95855C52.1929 8.981 52.3436 9.85838 52.6451 10.5907C52.9609 11.3092 53.3988 11.8618 53.9586 12.2487C54.5185 12.6218 55.1717 12.8083 55.9182 12.8083C56.5642 12.8083 57.1384 12.6701 57.6408 12.3938C58.1576 12.1174 58.6026 11.7858 58.9759 11.399L61 13.7202C60.3253 14.4801 59.5429 15.0535 58.6529 15.4404C57.7772 15.8135 56.8154 16 55.7674 16Z'
            fill='#A3A3A3'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M40.3107 0.00878906C44.3459 0.00878906 47.6171 3.149 47.6171 7.98482C47.6171 12.8206 44.3459 15.9608 40.3107 15.9608C36.2754 15.9608 33.0042 12.8834 33.0042 7.98482C33.0042 3.0862 36.2754 0.00879048 40.3107 0.00878906ZM38.6146 9.05247C37.4616 9.05247 36.5269 9.95222 36.5269 11.0621C36.5269 12.1721 37.4616 13.0718 38.6146 13.0718C39.7675 13.0718 40.7021 12.172 40.7021 11.0621C40.7021 9.95224 39.7675 9.05249 38.6146 9.05247Z'
            fill='#A3A3A3'
          />
        </svg>
      </div>

      {/* 회사 정보 */}
      <div className='flex w-full flex-col items-start justify-start gap-1'>
        <div className='flex items-center justify-start gap-2'>
          <p className='text-xs text-neutral-900'>{dict.footer.companyName}</p>
          <div className='flex h-0 w-0 items-center justify-center'>
            <div className='flex-none rotate-90'>
              <div className='h-0 w-2.5'>
                <div className='absolute top-[-1px] right-0 bottom-0 left-0'>
                  <svg width='10' height='1' viewBox='0 0 10 1' fill='none'>
                    <path d='M0 0.5H10' stroke='#A3A3A3' strokeWidth='1' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p className='text-xs text-neutral-900'>{dict.footer.ceo}</p>
        </div>
        <div className='text-xs leading-4 text-neutral-500'>
          <p className='mb-0'>{dict.footer.address}</p>
          <p className='mb-0'>{dict.footer.businessNumber}</p>
          <p className='mb-0'>{dict.footer.customerEmail}</p>
        </div>
      </div>

      {/* 정책 링크 */}
      <div className='flex flex-col items-start justify-start gap-1 text-xs font-medium text-neutral-500'>
        <div>
          <p className='leading-4'>{dict.footer.companyInfo}</p>
        </div>
        <div>
          <p className='leading-4'>{dict.footer.termsOfService}</p>
        </div>
        <div>
          <p className='leading-4'>{dict.footer.privacyPolicy}</p>
        </div>
      </div>
    </footer>
  );
}
