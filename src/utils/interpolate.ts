

type Params = {
  value: number;
  input_range: Array<number>;
  output_range: Array<number>;
}


export function interpolate({ value, input_range, output_range }: Params) {

  const rangeLen = input_range.length - 1;

  for (let i = 0; i < rangeLen; i++) {
    if (value >= input_range[i] && value <= input_range[i + 1]) {

      const input = input_range[i + 1] - input_range[i];
      const output = output_range[i + 1] - output_range[i];
      const minInputRange = input_range[i];
      const minOutputRange = output_range[i];


      const count1 = ((value - minInputRange) * 100) / input;
      const count2 = (output * count1) / 100;

      return count2 + minOutputRange

    } else if (value < input_range[0]) {
      return output_range[0]
    } else if (value > input_range[rangeLen]) {
      return output_range[rangeLen]
    }

  }
} 