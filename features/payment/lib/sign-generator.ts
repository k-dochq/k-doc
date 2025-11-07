/**
 * Payverse 서명 생성 유틸리티
 *
 * 서명 생성 규칙:
 * - 형식: ||secretKey||mid||orderId||amount||reqDate||
 * - 해시 알고리즘: SHA-512
 *
 * 참고 문서:
 * https://docs.payverseglobal.com/ko/apisdk/v1.0.0/integration-pre-check/performing-encryption/
 */

import * as crypto from 'crypto';

/**
 * Payverse 서명 생성 함수
 *
 * @param secretKey - API 연동 시 필요한 Secret Key
 * @param mid - 상점 ID
 * @param orderId - 주문 ID
 * @param amount - 결제 금액 (문자열 또는 숫자)
 * @param reqDate - 요청 일시 (YYYYMMDDHHmmss 형식)
 * @returns SHA-512 해시 값 (소문자 hex 문자열)
 */
export function generatePayverseSign(
  secretKey: string,
  mid: string,
  orderId: string,
  amount: string | number,
  reqDate: string,
): string {
  // 서명 생성 형식: ||secretKey||mid||orderId||amount||reqDate||
  const plainText = `||${secretKey}||${mid}||${orderId}||${amount}||${reqDate}||`;

  // SHA-512 해시 생성
  const hash = crypto.createHash('sha512').update(plainText, 'utf8').digest('hex');

  return hash;
}

/**
 * 웹훅 서명 검증 함수
 *
 * 서명 검증 규칙:
 * - 승인: ||secretKey||mid||orderId||requestAmount||approvalDay||
 * - 취소: ||secretKey||mid||orderId||requestAmount||cancelDay||
 * - 해시 알고리즘: SHA-512
 *
 * @param secretKey - API 연동 시 필요한 Secret Key
 * @param mid - 상점 ID
 * @param orderId - 주문 ID
 * @param requestAmount - 요청 금액
 * @param day - 승인일 또는 취소일 (YYYYMMDD 형식)
 * @param receivedSign - 수신한 서명
 * @returns 서명이 유효한지 여부
 */
export function verifyWebhookSign(
  secretKey: string,
  mid: string,
  orderId: string,
  requestAmount: string,
  day: string,
  receivedSign: string,
): boolean {
  const plainText = `||${secretKey}||${mid}||${orderId}||${requestAmount}||${day}||`;
  const expectedSign = crypto.createHash('sha512').update(plainText, 'utf8').digest('hex');
  return expectedSign === receivedSign;
}
