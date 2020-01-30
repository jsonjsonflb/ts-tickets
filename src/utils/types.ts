// action
export interface ActionType {
  type: string;
  payload?: SkipCheck;
}

// 组件容器
export interface ContainerPropsInterface<T> {
  dispatch(action: { type: string; payload?: any }): void;
  state: T;
  [random: string]: any;
}

// 跳过检查
export interface SkipCheck {
  [random: string]: any;
}
