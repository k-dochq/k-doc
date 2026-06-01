import { type Dictionary } from 'shared/model/types';

function PencilIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 12 12' fill='none'>
      <path
        d='M11.5045 2.88749C11.6615 2.73046 11.7861 2.54402 11.8712 2.33882C11.9562 2.13363 12 1.91369 12 1.69158C12 1.46947 11.9563 1.24952 11.8713 1.0443C11.7864 0.839088 11.6618 0.652618 11.5048 0.49554C11.3477 0.338462 11.1613 0.213854 10.9561 0.128829C10.7509 0.0438041 10.531 2.78715e-05 10.3089 1.33047e-08C10.0868 -2.78449e-05 9.86682 0.0436931 9.6616 0.128667C9.45639 0.21364 9.26992 0.338202 9.11284 0.49524L1.10517 8.50482C0.965861 8.64373 0.862837 8.81475 0.805168 9.00283L0.0125608 11.6141C-0.00294619 11.666 -0.00411733 11.7211 0.00917143 11.7736C0.0224602 11.8261 0.0497133 11.874 0.0880393 11.9123C0.126365 11.9506 0.174335 11.9777 0.226858 11.9909C0.279381 12.0042 0.334499 12.0029 0.386364 11.9873L2.99819 11.1953C3.18609 11.1381 3.3571 11.0357 3.49619 10.8971L11.5045 2.88749Z'
        fill='#737373'
      />
    </svg>
  );
}

interface GuestInfo {
  name: string;
  email: string;
  nationality: string;
}

interface KdocGuestInfoFormProps {
  dict: Dictionary;
  guestInfo: GuestInfo;
  isSubmitting: boolean;
  onChangeInfo: (partial: Partial<GuestInfo>) => void;
  onSubmit: () => void;
}

export function KdocGuestInfoForm({
  dict,
  guestInfo,
  isSubmitting,
  onChangeInfo,
  onSubmit,
}: KdocGuestInfoFormProps) {
  const t = dict.kdocChat.guestForm;
  const isValid =
    guestInfo.name.trim() && guestInfo.email.trim() && guestInfo.nationality.trim();

  const fields = [
    { key: 'name' as const, label: t.nameLabel, type: 'text' },
    { key: 'email' as const, label: t.emailLabel, type: 'email' },
    { key: 'nationality' as const, label: t.nationalityLabel, type: 'text' },
  ];

  return (
    <div className='mb-4 pl-[38px]'>
      <div className='rounded-2xl border border-[#e5e5e5] bg-white p-5'>
        <div className='flex flex-col gap-3'>
          {fields.map(({ key, label, type }) => (
            <div key={key} className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-[#404040]'>{label}</label>
              <input
                type={type}
                value={guestInfo[key]}
                onChange={(e) => onChangeInfo({ [key]: e.target.value })}
                placeholder={t.placeholder}
                className='rounded-lg border border-[#e5e5e5] px-3 py-[10px] text-sm text-[#404040] outline-none placeholder:text-[#a3a3a3] focus:border-[#7657ff]'
              />
            </div>
          ))}
          <button
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className='mt-1 rounded-xl py-3 text-sm font-medium disabled:bg-[#e5e5e5] disabled:text-[#a3a3a3] enabled:bg-[#7657ff] enabled:text-white'
          >
            {isSubmitting ? t.savingButton : t.saveButton}
          </button>
        </div>
      </div>
    </div>
  );
}

interface KdocGuestInfoCardProps {
  dict: Dictionary;
  guestInfo: GuestInfo;
  onEdit: () => void;
}

export function KdocGuestInfoCard({ dict, guestInfo, onEdit }: KdocGuestInfoCardProps) {
  const t = dict.kdocChat.guestForm;
  const fields = [
    { label: t.nameLabel, value: guestInfo.name },
    { label: t.emailLabel, value: guestInfo.email },
    { label: t.nationalityLabel, value: guestInfo.nationality },
  ];

  return (
    <div className='mb-4 flex flex-col gap-[18px] pl-[38px]'>
      <div className='rounded-2xl border border-[#e5e5e5] bg-white p-5'>
        <div className='flex flex-col gap-3'>
          {fields.map(({ label, value }) => (
            <div key={label} className='flex flex-col gap-1'>
              <p className='text-sm font-semibold text-[#404040]'>{label}</p>
              <p className='text-sm text-[#737373]'>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onEdit}
        className='flex items-center gap-[6px]'
        aria-label={t.editButton}
      >
        <PencilIcon />
        <span className='text-sm font-semibold text-[#737373]'>{t.editButton}</span>
      </button>
    </div>
  );
}
