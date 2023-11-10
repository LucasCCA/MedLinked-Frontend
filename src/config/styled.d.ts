import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    border_radius: string;

    colors: {
      white: string;
      dark_blue_100: string;
      dark_blue_80: string;
      dark_blue_60: string;
      blue_100: string;
      blue_80: string;
      blue_60: string;
      light_blue_100: string;
      light_blue_80: string;
      light_blue_60: string;
      black_100: string;
      black_80: string;
      black_60: string;
      gray_100: string;
      gray_80: string;
      gray_60: string;
      red_100: string;
      red_80: string;
      red_60: string;
      yellow: string;
      green: string;
    };
    font_sizes: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
    };
  }
}
