interface Config {
  allowed_countries: string[];
  success_url: string;
  cancel_url: string;
}

const countries = {
  IE: 'Ireland',
};

function join(arr: string[]): string {
  let output = '';

  if (arr.length === 1) return arr.pop();

  for (let i = 0; i < arr.length; i++) {
    output += arr[i];

    output += i === arr.length - 2 ? ' & ' : ', ';
  }

  return output;
}

export function getCountryById(
  ids: string[],
) {
  return join(ids.map((id) => countries[id]));
}

const config: Config = {
  allowed_countries: ['IE'],
  success_url: `${process.env.URL}/checkout/success`,
  cancel_url: `${process.env.URL}`,
};

export default config;
