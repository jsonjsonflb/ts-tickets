import * as React from 'react';

// 首次加载
export default function Loading({
  isLoading,
  error
}: {
  isLoading: any;
  error: any;
}) {
  if (isLoading) {
    return <div>加载中...</div>;
  } else if (error) {
    return <div>页面加载出现问题, 请刷新后重试</div>;
  }
  return null;
}
