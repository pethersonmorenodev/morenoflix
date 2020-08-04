import React from 'react';
import { ThemedStyledFunction } from 'styled-components';

export function withProps<TypeComponent>() {
  return <P extends keyof JSX.IntrinsicElements | React.ComponentType<any>, T extends object, O extends object = {}>(
    fn: ThemedStyledFunction<P, T, O>,
  ): ThemedStyledFunction<React.ComponentType<TypeComponent>, T, O> =>
    (fn as unknown) as ThemedStyledFunction<React.ComponentType<TypeComponent>, T, O>;
}
