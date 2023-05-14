import styled from 'styled-components';
import { ContainerProps } from './types';

const FlexContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justify || 'flex-start'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  width: ${props => (props.container ? '100%' : props.width || 'auto')};
  ${props => props.cursor && `cursor: ${props.cursor};`}
  ${props => props.borderRadius && `border-radius: ${props.borderRadius};`}
  ${props => props.wrap && `flex-wrap: ${props.wrap};`}
  ${props => props.position && `position: ${props.position};`}
  ${props => props.height && `height: ${props.height};`}
  ${props => props.flex && `flex: ${props.flex};`}
  ${props => props.minWidth && `min-width: ${props.minWidth};`}
  ${props => props.minHeight && `min-height: ${props.minHeight};`}
  ${props => props.maxWidth && `max-width: ${props.maxWidth};`}
  ${props => props.maxHeight && `max-height: ${props.maxHeight};`}
  ${props =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`}
  ${props => props.borderColor && `border: 1px solid ${props.borderColor};`}
  ${props => props.overflow && `overflow: ${props.overflow};`}
  ${props => props.alignSelf && `align-self: ${props.alignSelf};`}
  ${props => props.borderTop && `border-top: ${props.borderTop};`}
  ${props => props.borderBottom && `border-bottom: ${props.borderBottom};`}
  ${props => props.boxShadow && `box-shadow: ${props.boxShadow};`}

  &:hover::-webkit-scrollbar-thumb {
    background-color: #BEBED3;
  }
`;

export default FlexContainer;
