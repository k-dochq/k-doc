// Use Case 인터페이스 정의

export interface UseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}
