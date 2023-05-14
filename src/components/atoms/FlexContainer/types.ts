type AlignOptions =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'stretch'
  | 'baseline';
type WrapOptions = 'wrap' | 'nowrap';

export type ContainerProps = {
  justify?: AlignOptions;
  alignItems?: AlignOptions;
  direction?: 'row' | 'column';
  container?: boolean;
  borderRadius?: string;
  flex?: string;
  wrap?: WrapOptions;
  position?: string;
  cursor?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  borderColor?: string;
  overflow?: string;
  alignSelf?: string;
  borderTop?: string;
  disabled?: boolean;
  borderBottom?: string;
  boxShadow?: string;
};
