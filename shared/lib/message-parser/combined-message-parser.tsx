'use client';

import React from 'react';
import { extractPictureTags, removePictureTags } from 'shared/lib/image-parser';
import { extractFileTags, removeFileTags } from 'shared/lib/file-parser';
import { extractPaymentFlag, removePaymentFlag } from 'shared/lib/payment-parser/payment-parser';
import { extractSurveyFlag, removeSurveyFlag } from 'shared/lib/survey-parser/survey-parser';
import { parseTextWithLinks } from 'shared/lib/url-parser';
import { PaymentButtons } from 'shared/ui/payment-buttons';
import { SurveyButton } from 'shared/ui/survey-button/SurveyButton';
import { MessageImage } from 'shared/ui/message-image';
import { MessageFile } from 'shared/ui/message-file';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ParseCombinedMessageParams {
  message: string;
  lang: Locale;
  dict: Dictionary;
  returnUrl?: string;
}

/**
 * 메시지에서 <picture>, <file>, <payment>, <survey>, URL 링크를 모두 처리하는 통합 파서
 * 우선순위: picture → file → payment → survey → links
 */
export function parseCombinedMessage({
  message,
  lang,
  dict,
  returnUrl,
}: ParseCombinedMessageParams): (string | React.ReactElement)[] {
  if (!message) return [message];

  const result: (string | React.ReactElement)[] = [];

  // 1. Picture 태그 추출 및 처리
  const pictures = extractPictureTags(message);
  let textWithoutPictures = removePictureTags(message);

  // 2. File 태그 추출 및 처리
  const files = extractFileTags(textWithoutPictures);
  let textWithoutFiles = removeFileTags(textWithoutPictures);

  // 3. Payment 태그 추출 및 처리
  const paymentData = extractPaymentFlag(textWithoutFiles);
  let textWithoutPayment = paymentData ? removePaymentFlag(textWithoutFiles) : textWithoutFiles;

  // 4. Survey 태그 추출 및 처리
  const surveyData = extractSurveyFlag(textWithoutPayment);
  const textWithoutSurvey = surveyData ? removeSurveyFlag(textWithoutPayment) : textWithoutPayment;

  // 5. 텍스트가 있으면 링크 파싱하여 추가
  if (textWithoutSurvey.trim()) {
    const parsedText = parseTextWithLinks(textWithoutSurvey);
    parsedText.forEach((item, index) => {
      if (React.isValidElement(item)) {
        result.push(React.cloneElement(item, { key: `link-${index}` }));
      } else {
        result.push(item);
      }
    });
  }

  // 6. Picture 이미지 추가
  pictures.forEach((picture, index) => {
    result.push(<MessageImage key={`picture-${index}`} url={picture.url} dict={dict} />);
  });

  // 7. File 문서 추가
  files.forEach((file, index) => {
    result.push(
      <MessageFile
        key={`file-${index}`}
        url={file.url}
        fileName={file.fileName || 'Unknown file'}
        fileSize={file.fileSize}
        mimeType={file.mimeType}
        dict={dict}
      />,
    );
  });

  // 8. Payment 버튼 추가
  if (paymentData) {
    const paymentDataWithReturnUrl = returnUrl ? { ...paymentData, returnUrl } : paymentData;
    result.push(
      <PaymentButtons
        key='payment-buttons'
        data={paymentDataWithReturnUrl}
        lang={lang}
        dict={dict}
      />,
    );
  }

  // 9. Survey 버튼 추가
  if (surveyData) {
    result.push(<SurveyButton key='survey-button' data={surveyData} lang={lang} />);
  }

  return result;
}
