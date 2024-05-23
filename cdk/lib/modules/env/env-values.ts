export interface EnvValues {
  readonly env: Env;
  readonly vpcId: string;
  readonly subnet1: Subnet;
  readonly subnet2: Subnet;
}

export interface Subnet {
  readonly id: string;
  readonly az: string;
}

export type Env = 'dev';
