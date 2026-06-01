interface GuestInfo {
  name: string;
  email: string;
  nationality: string;
}

interface KdocGuestInfoFormProps {
  guestInfo: GuestInfo;
  isSubmitting: boolean;
  onChangeInfo: (partial: Partial<GuestInfo>) => void;
  onSubmit: () => void;
}

const FIELDS: {
  key: keyof GuestInfo;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { key: 'name', label: '이름', type: 'text', placeholder: 'bm' },
  { key: 'email', label: '이메일', type: 'email', placeholder: 'bm@k-doc.kr' },
  { key: 'nationality', label: '국적', type: 'text', placeholder: 'USA' },
];

export function KdocGuestInfoForm({
  guestInfo,
  isSubmitting,
  onChangeInfo,
  onSubmit,
}: KdocGuestInfoFormProps) {
  const isValid = guestInfo.name.trim() && guestInfo.email.trim() && guestInfo.nationality.trim();

  return (
    <div className='mb-4 flex flex-col gap-2 pl-[38px]'>
      <div className='rounded-xl border border-[#e5e5e5] bg-white px-5 py-5'>
        <div className='flex flex-col gap-4'>
          {FIELDS.map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className='mb-1 block text-sm font-medium text-[#404040]'>{label}</label>
              <input
                type={type}
                value={guestInfo[key]}
                onChange={(e) => onChangeInfo({ [key]: e.target.value })}
                placeholder={placeholder}
                className='w-full border-b border-[#e5e5e5] py-1 text-sm text-[#404040] outline-none focus:border-[#7657ff]'
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={!isValid || isSubmitting}
        className='ml-auto text-sm font-medium text-[#7657ff] disabled:text-[#a3a3a3]'
      >
        {isSubmitting ? '연결 중...' : '상담 시작하기'}
      </button>
    </div>
  );
}
