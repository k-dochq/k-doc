import { v4 as uuidv4 } from 'uuid';
import { prisma } from 'shared/lib/prisma';
import { ReservationStatus } from '@prisma/client';
import type { Locale } from 'shared/config';

const LOCALE_TO_RESERVATION_LANGUAGE: Record<Locale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  th: 'th_TH',
  'zh-Hant': 'zh_Hant',
  ja: 'ja_JP',
  hi: 'hi_IN',
  tl: 'tl_PH',
  ar: 'ar_SA',
  ru: 'ru_RU',
};

const RESERVATION_LANGUAGE_TO_LOCALE: Record<string, Locale> = {
  ko_KR: 'ko',
  en_US: 'en',
  th_TH: 'th',
  zh_Hant: 'zh-Hant',
  ja_JP: 'ja',
  hi_IN: 'hi',
  tl_PH: 'tl',
  ar_SA: 'ar',
  ru_RU: 'ru',
};

const DAY_NAMES: Record<Locale, string[]> = {
  ko: ['일', '월', '화', '수', '목', '금', '토'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  th: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
  'zh-Hant': ['日', '一', '二', '三', '四', '五', '六'],
  ja: ['日', '月', '火', '水', '木', '金', '土'],
  hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  tl: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};

const CUSTOMER_CHANGE_REQUEST_TEMPLATES: Record<string, string> = {
  ko_KR: `(자동 생성 예약 변경 신청서)\n예약 일정을 아래와 같이 변경 요청드립니다.\n- 변경 일정: {reservationDate} {reservationTime} (KST)`,
  en_US: `(Auto-Generated Reservation Change Request)\nPlease change the reservation schedule as follows.\n- Requested New Schedule: {reservationDate} {reservationTime} (KST)`,
  th_TH: `(แบบฟอร์มขอเปลี่ยนแปลงการนัดหมายที่สร้างโดยอัตโนมัติ)\nขอเปลี่ยนแปลงตารางนัดหมายดังนี้\n- ตารางใหม่ที่ขอ: {reservationDate} {reservationTime} (KST)`,
  zh_Hant: `（系統自動產生的預約變更申請書）\n請依下方資訊變更預約時間。\n- 變更時間：{reservationDate} {reservationTime} (KST)`,
  ja_JP: `（自動生成予約変更申請書）\n以下の通り予約日程の変更をお願いいたします。\n- 変更希望日程：{reservationDate} {reservationTime} (KST)`,
  hi_IN: `(स्वतः-निर्मित अपॉइंटमेंट परिवर्तन अनुरोध)\nकृपया निम्नानुसार अपॉइंटमेंट शेड्यूल बदलें।\n- नई शेड्यूल: {reservationDate} {reservationTime} (KST)`,
  tl_PH: `(Auto-Generated na Kahilingan sa Pagbabago ng Reserbasyon)\nMangyaring baguhin ang iskedyul ng reserbasyon tulad ng sumusunod.\n- Hiniling na Bagong Iskedyul: {reservationDate} {reservationTime} (KST)`,
  ar_SA: `(طلب تغيير الحجز المُنشأ تلقائياً)\nيرجى تغيير جدول الحجز على النحو التالي.\n- الجدول الجديد المطلوب: {reservationDate} {reservationTime} (KST)`,
  ru_RU: `(Автоматически сгенерированный запрос на изменение бронирования)\nПожалуйста, измените расписание бронирования следующим образом.\n- Запрашиваемое новое расписание: {reservationDate} {reservationTime} (KST)`,
};

const COUNSELOR_AUTO_REPLY_TEMPLATES: Record<string, string> = {
  ko_KR: `안녕하세요\n예약 변경 요청이 정상적으로 접수되었습니다.\n\n고객님께서 변경 요청하신 일정은\n{reservationDate}({dayOfWeek}) {reservationTime} (KST) 입니다.\n\n현재 예약 가능 여부를 확인 중이며,\n확인 후 상담을 통해 최종 예약 일정을 안내드리겠습니다.`,
  en_US: `Hello,\nYour reservation change request has been successfully received.\n\nYour requested new schedule is:\n{reservationDate}({dayOfWeek}) {reservationTime} (KST)\n\nWe are currently checking availability and will confirm your final reservation schedule through consultation.`,
  th_TH: `สวัสดีครับ/ค่ะ\nคำขอเปลี่ยนแปลงการนัดหมายของคุณได้รับการรับเรื่องเรียบร้อยแล้ว\n\nตารางใหม่ที่คุณขอคือ:\n{reservationDate}({dayOfWeek}) {reservationTime} (KST)\n\nขณะนี้เรากำลังตรวจสอบความพร้อมและจะยืนยันตารางนัดหมายสุดท้ายของคุณผ่านการปรึกษา`,
  zh_Hant: `您好，\n您的預約變更請求已成功受理。\n\n您所請求的新時間為：\n{reservationDate}({dayOfWeek}) {reservationTime} (KST)\n\n我們目前正在確認可用性，將通過諮詢告知您最終預約時間。`,
  ja_JP: `こんにちは。\n予約変更のご要望を正常に受け付けました。\n\nご希望の新しい日程は：\n{reservationDate}({dayOfWeek}) {reservationTime} (KST)\n\n現在予約可否を確認中です。\n確認後、ご相談を通じて最終的な予約日程をご案内いたします。`,
  hi_IN: `नमस्ते,\nआपका अपॉइंटमेंट परिवर्तन अनुरोध सफलतापूर्वक प्राप्त हो गया है।\n\nआपका अनुरोधित नया शेड्यूल है:\n{reservationDate}({dayOfWeek}) {reservationTime} (KST)\n\nहम वर्तमान में उपलब्धता की जांच कर रहे हैं और परामर्श के माध्यम से आपके अंतिम अपॉइंटमेंट शेड्यूल की पुष्टि करेंगे।`,
  tl_PH: `Magandang araw,\nAng iyong kahilingan sa pagbabago ng reserbasyon ay matagumpay na natanggap.\n\nAng iyong hiniling na bagong iskedyul ay:\n{reservationDate}({dayOfWeek}) {reservationTime} (KST)\n\nSinusuri namin ang availability at kukumpirmahin ang iyong panghuling iskedyul ng reserbasyon sa pamamagitan ng konsultasyon.`,
  ar_SA: `مرحباً،\nتم استلام طلب تغيير حجزك بنجاح.\n\nجدولك الجديد المطلوب هو:\n{reservationDate}({dayOfWeek}) {reservationTime} (KST)\n\nنحن نتحقق حالياً من التوفر وسنؤكد جدول حجزك النهائي من خلال الاستشارة.`,
  ru_RU: `Здравствуйте,\nВаш запрос на изменение бронирования успешно получен.\n\nВаше запрошенное новое расписание:\n{reservationDate}({dayOfWeek}) {reservationTime} (KST)\n\nМы в настоящее время проверяем доступность и подтвердим ваше окончательное расписание бронирования через консультацию.`,
};

interface CreateChangeRequestParams {
  reservationId: string;
  userId: string;
  requestedDate: string;
  requestedTime: string;
  locale: Locale;
}

interface CreateChangeRequestResult {
  success: boolean;
  error?: string;
}

export async function createChangeRequest(
  params: CreateChangeRequestParams,
): Promise<CreateChangeRequestResult> {
  const { reservationId, userId, requestedDate, requestedTime, locale } = params;

  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      select: {
        id: true,
        userId: true,
        hospitalId: true,
        status: true,
        metadata: true,
      },
    });

    if (!reservation) {
      return { success: false, error: 'RESERVATION_NOT_FOUND' };
    }

    if (reservation.userId !== userId) {
      return { success: false, error: 'UNAUTHORIZED' };
    }

    if (reservation.status === 'CANCELLED') {
      return { success: false, error: 'ALREADY_CANCELLED' };
    }

    if (reservation.status === 'CHANGE_REQUESTED') {
      return { success: false, error: 'ALREADY_CHANGE_REQUESTED' };
    }

    const meta =
      reservation.metadata && typeof reservation.metadata === 'object' && !Array.isArray(reservation.metadata)
        ? (reservation.metadata as Record<string, unknown>)
        : {};

    const reservationLang = (() => {
      const stored = meta.language as string | undefined;
      if (stored && COUNSELOR_AUTO_REPLY_TEMPLATES[stored]) return stored;
      return LOCALE_TO_RESERVATION_LANGUAGE[locale] || 'en_US';
    })();

    const effectiveLocale = RESERVATION_LANGUAGE_TO_LOCALE[reservationLang] || locale;
    const dayIndex = new Date(requestedDate).getDay();
    const dayOfWeek = DAY_NAMES[effectiveLocale][dayIndex];

    const customerMessage = (
      CUSTOMER_CHANGE_REQUEST_TEMPLATES[reservationLang] || CUSTOMER_CHANGE_REQUEST_TEMPLATES['en_US']
    )
      .replace(/{reservationDate}/g, requestedDate)
      .replace(/{reservationTime}/g, requestedTime);

    const counselorMessage = (
      COUNSELOR_AUTO_REPLY_TEMPLATES[reservationLang] || COUNSELOR_AUTO_REPLY_TEMPLATES['en_US']
    )
      .replace(/{reservationDate}/g, requestedDate)
      .replace(/{dayOfWeek}/g, dayOfWeek)
      .replace(/{reservationTime}/g, requestedTime);

    await prisma.$transaction(async (tx) => {
      await tx.reservation.update({
        where: { id: reservationId },
        data: {
          status: ReservationStatus.CHANGE_REQUESTED,
          updatedAt: new Date(),
        },
      });

      await tx.reservationStatusHistory.create({
        data: {
          id: uuidv4(),
          reservationId,
          fromStatus: reservation.status,
          toStatus: ReservationStatus.CHANGE_REQUESTED,
          reason: '고객 예약 변경 요청',
          createdAt: new Date(),
        },
      });

      await tx.consultationMessage.create({
        data: {
          id: uuidv4(),
          userId,
          hospitalId: reservation.hospitalId,
          senderType: 'USER',
          content: customerMessage,
          createdAt: new Date(),
        },
      });

      await tx.consultationMessage.create({
        data: {
          id: uuidv4(),
          userId,
          hospitalId: reservation.hospitalId,
          senderType: 'ADMIN',
          content: counselorMessage,
          createdAt: new Date(),
        },
      });
    });

    return { success: true };
  } catch (error) {
    console.error('[createChangeRequest] error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
    };
  }
}
