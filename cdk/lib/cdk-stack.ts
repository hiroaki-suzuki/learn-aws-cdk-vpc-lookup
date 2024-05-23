import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EnvValues } from './modules/env/env-values';
import { Subnet, Vpc } from 'aws-cdk-lib/aws-ec2';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export interface CdkStackProps extends cdk.StackProps {
  readonly namePrefix: string;
  readonly envValues: EnvValues;
}

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CdkStackProps) {
    super(scope, id, props);

    const { namePrefix, envValues } = props;

    const vpc = Vpc.fromLookup(this, 'Vpc', {
      vpcId: envValues.vpcId,
    });

    const subnets = [
      Subnet.fromSubnetAttributes(this, `Subnet1`, {
        subnetId: envValues.subnet1.id,
        availabilityZone: envValues.subnet1.az,
      }),
      Subnet.fromSubnetAttributes(this, `Subnet2`, {
        subnetId: envValues.subnet2.id,
        availabilityZone: envValues.subnet2.az,
      }),
    ];

    new ApplicationLoadBalancer(this, 'ALB', {
      loadBalancerName: `${namePrefix}-alb`,
      vpc,
      internetFacing: true,
      vpcSubnets: vpc.selectSubnets({
        subnets: subnets,
      }),
    });
  }
}
