// This code makes it so we have correct types when using our theme.

import theme from '../theme';

type CustomTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
