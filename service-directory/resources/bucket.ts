import {
  ComponentResource,
  CustomResource,
  getStack,
  ComponentResourceOptions,
} from "@pulumi/pulumi";
import { s3 } from "@pulumi/aws";

type FmBucketArgs = {
  Name: string;
  Product: string;
};

export class FmBucket extends ComponentResource {
  constructor(args: FmBucketArgs, opts?: ComponentResourceOptions) {
    const resourceName = `${args.Product}-${args.Name}`;

    super("pkg:index:FmBucket", resourceName, {}, opts);

    const stack = getStack();
    const bucketName = `${resourceName}-${stack}`;

    const bucket = new s3.Bucket(args.Name, {
      acl: "private",
      bucket: bucketName,
      tags: {
        environment: "Dev",
        Name: bucketName,
      },
    });

    new s3.BucketPublicAccessBlock(args.Name, {
      bucket: bucket.id,
      blockPublicAcls: true,
      blockPublicPolicy: true,
      ignorePublicAcls: true,
      restrictPublicBuckets: true,
    });
  }
}
